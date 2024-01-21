
interface IOrder {
    orderNumber: number;
    user: { userName: string };
    items: any[]; // Replace with the actual type of the items
    total: number;
    date: string; // Or Date, depending on how you handle dates
  }
  
export default IOrder