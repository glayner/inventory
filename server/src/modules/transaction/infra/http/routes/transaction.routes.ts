import { Router } from 'express';
import TransactionController from '../controller/TransactionController';
import CreateTransactionValidate from '../validations/CreateTransactionValidate';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post(
  '/',
  CreateTransactionValidate,
  transactionController.create,
);

export default transactionRouter;
