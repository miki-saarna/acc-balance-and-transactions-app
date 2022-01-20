import { getBalance } from '../utils/api';

export default async function GetBalance() {
  // return <h1>hello world</h1>
    await getBalance()
      .then(console.log);
}