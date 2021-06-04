export default interface ITransaction{
  id: string;

  date: string;

  purchased_qnt?: number;

  purchased_unt?: number;

  purchased_amt?: number;

  sold_qnt?: number;

  sold_unt?: number;

  sold_amt?: number;

  balance_qnt: number;

  balance_unt: number;

  balance_amt: number;

  created_at: Date;

  updated_at: Date;
}