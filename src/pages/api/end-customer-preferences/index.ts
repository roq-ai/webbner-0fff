import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { endCustomerPreferenceValidationSchema } from 'validationSchema/end-customer-preferences';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEndCustomerPreferences();
    case 'POST':
      return createEndCustomerPreference();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEndCustomerPreferences() {
    const data = await prisma.end_customer_preference
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'end_customer_preference'));
    return res.status(200).json(data);
  }

  async function createEndCustomerPreference() {
    await endCustomerPreferenceValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.end_customer_preference.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
