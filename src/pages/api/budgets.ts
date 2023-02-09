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
    res.status(405)

  else {
    const body = req.body;
    body.budget = Number(body.budget);

    const session = await getServerSession(req, res, authOptions);
    const validBody = body.name && body.budget;

    if (session && session.user?.email && validBody) {
      const result = await prisma.budget.create({
        data: {
          ...body,
          expend: 0,
          user: { connect: { email: session.user.email } },
        },
      });

      res.status(201).json(result)

    } else res.status(401);
  }

  res.end();
};
