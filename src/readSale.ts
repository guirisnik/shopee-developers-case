import { QuestionCollection, Answers } from 'inquirer';
import { Sale } from './dto/Sale.dto';
import { toChoice } from './utils';

export const buildReadSalePath = (
  salesList: Array<Sale>
): QuestionCollection => [
  {
    name: 'readSale',
    message: 'Main Sales List',
    type: 'list',
    loop: false,
    pageSize: 10,
    choices: [
      { name: 'Return to main menu', value: null },
      ...salesList.map(toChoice),
    ],
  },
];
