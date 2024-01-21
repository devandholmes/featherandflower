import { db } from "../firebase";
import { IProductCategory } from "../types/IProductCategory";

export const fetchAllProductCategories = async (): Promise<IProductCategory[]> => {
    const snapshot = await db.collection('productCategories').get();
    console.log(snapshot.docs.map(doc => ({...doc.data() } as IProductCategory)));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IProductCategory));
};

export const addProductCategory = async (productCategory: Omit<IProductCategory, 'id'>): Promise<string> => {
    const docRef = await db.collection('productCategories').add(productCategory);
    updateProductCategory(docRef.id, {
        id: docRef.id,
        name: productCategory.name,
        image: productCategory.image,
    } as IProductCategory);
    return docRef.id;
};

export const updateProductCategory = async (id: string, productCategory: Omit<IProductCategory, 'id'>): Promise<void> => {
    await db.collection('productCategories').doc(id).set(productCategory);
};

export const deleteProductCategory = async (id: string): Promise<void> => {
    await db.collection('productCategories').doc(id).delete();
};
