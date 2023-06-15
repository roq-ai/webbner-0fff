import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { endCustomerPreferenceValidationSchema } from 'validationSchema/end-customer-preferences';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.end_customer_preference
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEndCustomerPreferenceById();
    case 'PUT':
      return updateEndCustomerPreferenceById();
    case 'DELETE':
      return deleteEndCustomerPreferenceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEndCustomerPreferenceById() {
    const data = await prisma.end_customer_preference.findFirst(
      convertQueryToPrismaUtil(req.query, 'end_customer_preference'),
    );
    return res.status(200).json(data);
  }

  async function updateEndCustomerPreferenceById() {
    await endCustomerPreferenceValidationSchema.validate(req.body);
    const data = await prisma.end_customer_preference.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEndCustomerPreferenceById() {
    const data = await prisma.end_customer_preference.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
