import { getBalance } from '../utils/api';

export default async function GetBalance() {
    await getBalance()
      .then(console.log);
}