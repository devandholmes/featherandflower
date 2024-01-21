import { IProduct } from "./IProduct";

interface IOrder {
    orderNumber: number;
    user: { 
      userName: string,
      userSurname: string,
      userEmailAddress: string,
      userMobileNumber: string,
     };
    items: IProduct[]; // Replace with the actual type of the items
    total: number;
    date: string; // Or Date, depending on how you handle dates
    deliveryType: string;
  }
  
export default IOrder