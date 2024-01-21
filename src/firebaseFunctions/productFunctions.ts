import { db } from "../firebase";
import { IProduct } from "../types/IProduct";

export const fetchAllProducts = async (): Promise<IProduct[]> => {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IProduct));
};

export const addProduct = async (product: Omit<IProduct, 'id'>): Promise<string> => {
    const docRef = await db.collection('products').add(product);
    updateProduct(docRef.id, {
        id: docRef.id,
        category: product.category,
        name: product.name,
        costPrice: product.costPrice,
        sellingPrice: product.sellingPrice,
        quantity: product.quantity,
        description: product.description,
        image: product.image !== undefined ? product.image : '',
        isFeatured: product.isFeatured !== undefined ? product.isFeatured : false
    } as IProduct);
    return docRef.id;
};

export const updateProduct = async (id: string, product: Omit<IProduct, 'id'>): Promise<void> => {
    await db.collection('products').doc(id).set(product);
};

export const deleteProduct = async (id: string): Promise<void> => {
    await db.collection('products').doc(id).delete();
};

export const featureProduct = async (id: string): Promise<void> => {
    console.log("featureProduct");
    await db.collection('products').doc(id).update({ isFeatured: true });
}
