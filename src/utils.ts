import { Answers, ChoiceOptions } from 'inquirer';
import { Sale } from './dto/Sale.dto';

export const toSale = (answers: Answers): Sale => ({
  sellerName: answers.sellerName,
  customerName: answers.customerName,
  dateOfSale: answers.dateOfSale,
  itemName: answers.itemName,
  itemValue: answers.itemValue,
});

export const toChoice = (
  sale: Sale,
  id: number,
  arr: Array<Sale>
): ChoiceOptions => ({
  name: `${id + 1}${repeat(
    ' ',
    arr.length.toString().length - (id + 1).toString().length
  )} | ${sale.sellerName} sold ${sale.itemName} for ${sale.itemValue} to ${
    sale.customerName
  } on ${sale.dateOfSale.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}`,
  value: { id, sale },
});

const repeat = (word: string, iterations: number, separator: string = '') =>
  Array.from({ length: iterations }, () => word).join(separator);
