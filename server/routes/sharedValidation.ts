import { insertExpensesSchema } from '../db/schema';
/**
 * This fucntion will recive a parameter and it will check if the values of em apply the validations or no
 * @example
 * Input : {title: string, amount: number}
 * Output : {title: string, amount: number} // it will return valid data
 */
export const createPostSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
});
