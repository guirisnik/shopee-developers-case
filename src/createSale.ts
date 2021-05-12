import { QuestionCollection, Answers } from 'inquirer';
import { Sale } from './dto/Sale.dto';
import { save } from './store';

export const createSalePath: QuestionCollection = [
  {
    name: 'sellerName',
    message: "Ok, let's register! What's the sellers name?",
    type: 'list',
    choices: [
      { name: 'A', value: 'A' },
      { name: 'B', value: 'B' },
      { name: 'C', value: 'C' },
      { name: 'D', value: 'D' },
    ],
  },
  {
    name: 'customerName',
    message: "Great! What's the customer's name?",
    type: 'input',
    validate: (input) =>
      input.trim().match(/^[a-zA-Z]+((\s[a-zA-Z ])?[a-zA-Z]*)*$/g)
        ? true
        : 'Names must not be blank and can only contain letters and spaces.',
  },
  {
    name: 'dateOfSale',
    message: 'Awesome! What was the date of this sale?',
    type: 'date',
    format: { month: 'short', hour: undefined, minute: undefined },
  },
  {
    name: 'itemName',
    message: 'I see. What was the name of the sold item?',
    type: 'input',
    validate: (input) =>
      input.length ? true : 'This field cannot be left blank.',
  },
  {
    name: 'itemValue',
    message: 'Excellent! And how much was it?',
    type: 'input',
    validate: (input) =>
      isNaN(input) || input <= 0
        ? 'The value cannon be left blank and must be positive number!'
        : true,
  },
];

const salesList: Array<Sale> = [];

const toSale = (answers: Answers): Sale => ({
  sellerName: answers.sellerName,
  customerName: answers.customerName,
  dateOfSale: answers.dateOfSale,
  itemName: answers.itemName,
  itemValue: answers.itemValue,
});

export function storeSale(answers: Answers): void {
  save(toSale(answers));
  console.log('Your sale was registered successfully!');
  console.log('--------------------------------------');
}
