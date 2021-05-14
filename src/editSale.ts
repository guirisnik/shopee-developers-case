import { QuestionCollection, Answers, prompt } from 'inquirer';
import { buildCreateSalePath } from './createSale';
import { Sale } from './dto/Sale.dto';
import { loadSales, replace } from './store';
import { toSale, toChoice } from './utils';

export const buildEditSalePath = (
  salesList: Array<Sale>
): QuestionCollection => [
  {
    name: 'editSale',
    message: 'Which sale you wish to edit?',
    type: 'list',
    loop: false,
    choices: [
      { name: 'Return to main menu', value: null },
      ...salesList.map(toChoice),
    ],
  },
];

const replaceSale = (id: number, newSale: Sale): void => {
  const salesList = loadSales();
  salesList[id] = newSale;
  replace(salesList);
  console.log('Sale was updated successfully!');
  console.log('--------------------------------------');
};

export const promptEditSelectedSale = (answers: Answers) =>
  answers.editSale &&
  prompt(buildCreateSalePath(answers.editSale.sale))
    .then((editedAnswers) =>
      replaceSale(answers.editSale.id, toSale(editedAnswers))
    )
    .catch(console.error);
