export enum Seller {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}

export interface Sale {
  sellerName: Seller;
  customerName: string;
  dateOfSale: Date;
  itemName: string;
  itemValue: number;
}
