import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import prisma from '../../lib/prisma';

import type {
  NextApiRequest,
  NextApiResponse
} from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'POST')
    res.status(405);

  else {
    const {budgetId, ...body} = req.body;
    body.amount = Number(body.amount);
    body.date = new Date(body.date);

    const session = await getServerSession(req, res, authOptions);
    const validBody = body.name && body.amount && body.date;

    if (session && session.user?.email && validBody) {
      await prisma.$transaction(async (tx) => {
        const expense = await tx.expense.create({
          data: {
            ...body,
            budget: { connect: { id: budgetId } },
          },
        });

        const budget = await tx.budget.update({
          where: {
            id: expense.budgetId,
          },
          data: {
            expend: {
              increment: expense.amount,
            },
          },
        });

        console.log(budget)
      });

      res.status(201)

    } else res.status(401);
  }

  return res.end();
};
