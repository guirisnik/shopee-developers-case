import { prompt, registerPrompt, QuestionCollection, Answers } from 'inquirer';
import { createSalePath, storeSale } from './createSale';

registerPrompt('date', require('inquirer-date-prompt'));

const mainMenuPath: QuestionCollection = [
  {
    name: 'start',
    message: 'What do you want to do?',
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

const successHandler = (answers: Answers) => {
  switch (answers.start) {
    case 'create': {
      prompt(createSalePath)
        .then(storeSale)
        .then(returnToMainMenu)
        .catch(console.error);
      break;
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
