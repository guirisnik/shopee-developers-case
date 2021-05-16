import { QuestionCollection, Answers } from 'inquirer';
import { Sale, Seller } from './dto/Sale.dto';
import { toChoice } from './utils';

const rankHighestAmountSoldSellers = (sales: Array<Sale>): Array<Sale> => {
  const getAmountSold = (seller: string) =>
    sales.reduce((acc: number, sale: Sale): number => {
      acc += sale.sellerName == seller ? sale.itemValue : 0;
      return acc;
    }, 0);

  let amountMap = [];

  for (let seller in Seller) {
    amountMap.push({ [seller]: getAmountSold(seller) });
  }

  return amountMap
    .sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
    .map((amount) =>
      sales.filter((sale) => sale.sellerName == Object.keys(amount)[0])
    )
    .flat();
};

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
      ...rankHighestAmountSoldSellers(salesList).map(toChoice),
    ],
  },
];
