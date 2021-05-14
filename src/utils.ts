import { Answers, ChoiceOptions } from 'inquirer';
import { Sale } from './dto/Sale.dto';

export const toSale = (answers: Answers): Sale => ({
  sellerName: answers.sellerName,
  customerName: answers.customerName,
  dateOfSale: answers.dateOfSale,
  itemName: answers.itemName,
  itemValue: answers.itemValue,
});

export const toChoice = (sale: Sale, id: number): ChoiceOptions => ({
  name: `${id + 1} | ${sale.sellerName} sold ${sale.itemName} for ${
    sale.itemValue
  } to ${sale.customerName} on ${sale.dateOfSale.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}`,
  value: { id, sale },
});
