import { QuestionCollection, ChoiceOptions, Answers, prompt } from 'inquirer';
import { buildCreateSalePath } from './createSale';
import { Sale } from './dto/Sale.dto';
import { loadSales, replace } from './store';
import { toSale } from './utils';

const toChoice = (sale: Sale, id: number): ChoiceOptions => ({
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
