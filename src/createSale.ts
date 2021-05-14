import { QuestionCollection, Answers } from 'inquirer';
import { Sale } from './dto/Sale.dto';
import { save } from './store';
import { toSale } from './utils';

export const buildCreateSalePath = (
  defaultValues?: Sale | null
): QuestionCollection => [
  {
    name: 'sellerName',
    default: defaultValues?.sellerName,
    message: "What's the sellers name?",
    type: 'list',
    choices: [
      { name: 'A', value: 'A' },
      { name: 'B', value: 'B' },
      { name: 'C', value: 'C' },
      { name: 'D', value: 'D' },
      { name: 'E', value: 'E' },
    ],
  },
  {
    name: 'customerName',
    default: defaultValues?.customerName,
    message: "What's the customer's name?",
    type: 'input',
    validate: (input) =>
      input.trim().match(/^[a-zA-Z]+((\s[a-zA-Z ])?[a-zA-Z]*)*$/g)
        ? true
        : 'Names must not be blank and can only contain letters and spaces.',
  },
  {
    name: 'dateOfSale',
    default: defaultValues?.dateOfSale,
    message: 'What was the date of this sale?',
    type: 'date',
    format: { month: 'short', hour: undefined, minute: undefined },
  },
  {
    name: 'itemName',
    default: defaultValues?.itemName,
    message: 'What was the name of the sold item?',
    type: 'input',
    validate: (input) =>
      input.length ? true : 'This field cannot be left blank.',
  },
  {
    name: 'itemValue',
    default: defaultValues?.itemValue,
    message: 'How much did the item cost?',
    type: 'input',
    validate: (input) =>
      isNaN(input) || input <= 0
        ? 'The value cannon be left blank and must be positive number!'
        : true,
  },
];

export function storeSale(answers: Answers): void {
  save(toSale(answers));
  console.log('Your sale was registered successfully!');
  console.log('--------------------------------------');
}
