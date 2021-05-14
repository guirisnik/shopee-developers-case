import { QuestionCollection, Answers } from 'inquirer';
import { Sale } from './dto/Sale.dto';
import { loadSales, replace } from './store';
import { toChoice } from './utils';

export const buildDeleteSalePath = (
  salesList: Array<Sale>
): QuestionCollection => [
  {
    name: 'removeSale',
    message: 'Which sale you wish to remove?',
    type: 'list',
    loop: false,
    choices: [
      { name: 'Return to main menu', value: null },
      ...salesList.map(toChoice),
    ],
  },
  {
    name: 'confirmRemoveSale',
    message: 'Remove selected sale?',
    type: 'confirm',
    when: (answers: Answers) => answers.removeSale != null,
  },
];

export const removeSale = (answers: Answers): void => {
  if (!answers?.confirmRemoveSale) return;
  const salesList = loadSales();
  salesList.splice(answers.removeSale?.id, 1);
  replace(salesList);
  console.log('Sale was removed successfully!');
  console.log('--------------------------------------');
};
