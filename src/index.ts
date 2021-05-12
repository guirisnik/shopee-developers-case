import { prompt, QuestionCollection } from 'inquirer';

const questions: QuestionCollection = [
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

const main = (questions: QuestionCollection) =>
  prompt(questions).then(console.log).catch(console.error);

main(questions);
