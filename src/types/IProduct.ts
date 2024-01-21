export interface IProduct {
    id: string;
    name: string;
    costPrice: string; // Changed from price to costPrice
    sellingPrice: string; // Added sellingPrice
    description?: string;
    image?: string;
    category: string;
    quantity: number;
    isFeatured?: boolean;
}