import { appendFileSync, readFileSync, existsSync } from 'fs';
import { Sale } from './dto/Sale.dto';
import path from 'path';

const MAIN_SALES_FILENAME = 'main-sales.csv';
const filepath = (): string => path.join(__dirname, MAIN_SALES_FILENAME);

const toCsvString = (sale: Sale): string =>
  `${sale.sellerName},${sale.customerName},${sale.dateOfSale},${sale.itemName},${sale.itemValue}\n`;

const toSale = (csvRow: string): Sale => {
  const [sellerName, customerName, dateOfSale, itemName, itemValue] =
    csvRow.split(',');

  return {
    sellerName,
    customerName,
    dateOfSale: new Date(dateOfSale),
    itemName,
    itemValue: Number(itemValue),
  };
};

export const save = (sale: Sale) =>
  appendFileSync(filepath(), toCsvString(sale));

export const load = (): Array<Sale> =>
  existsSync(filepath())
    ? readFileSync(filepath(), { encoding: 'utf-8' }).split('/n').map(toSale)
    : [];
