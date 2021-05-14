import { prompt, registerPrompt, QuestionCollection, Answers } from 'inquirer';
import { buildCreateSalePath, storeSale } from './createSale';
import { buildDeleteSalePath, removeSale } from './deletePath';
import { buildEditSalePath, promptEditSelectedSale } from './editSale';
import { loadSales } from './store';

registerPrompt('date', require('inquirer-date-prompt'));

const mainMenuPath: QuestionCollection = [
  {
    name: 'start',
    message: 'What do you want to do?',
    loop: false,
    type: 'list',
    choices: [
      { name: 'Register a sale', value: 'create' },
      { name: 'Edit a sale', value: 'update' },
      { name: 'Remove a sale', value: 'delete' },
      { name: 'Print main sales list', value: 'read' },
      { name: 'Quit', value: 'quit' },
    ],
  },
];

const errorHandler = (reason: any): void =>
  console.error(
    `An error occured (${reason}), please restart the application.`
  );

const successHandler = (answers: Answers) => {
  switch (answers.start) {
    case 'create': {
      prompt(buildCreateSalePath())
        .then(storeSale)
        .then(returnToMainMenu)
        .catch(errorHandler);
      break;
    }
    case 'update': {
      prompt(buildEditSalePath(loadSales()))
        .then(promptEditSelectedSale)
        .then(returnToMainMenu)
        .catch(errorHandler);
      break;
    }
    case 'delete': {
      prompt(buildDeleteSalePath(loadSales()))
        .then(removeSale)
        .then(returnToMainMenu)
        .catch(errorHandler);
    }
    default:
      break;
  }
};

function returnToMainMenu(): void {
  main(mainMenuPath);
}

const main = (questions: QuestionCollection) =>
  prompt(questions).then(successHandler).catch(console.error);

main(mainMenuPath);
