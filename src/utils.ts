import { Answers } from 'inquirer';
import { Sale } from './dto/Sale.dto';

export const toSale = (answers: Answers): Sale => ({
  sellerName: answers.sellerName,
  customerName: answers.customerName,
  dateOfSale: answers.dateOfSale,
  itemName: answers.itemName,
  itemValue: answers.itemValue,
});
