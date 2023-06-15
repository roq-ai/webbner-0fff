import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { perfumeValidationSchema } from 'validationSchema/perfumes';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPerfumes();
    case 'POST':
      return createPerfume();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPerfumes() {
    const data = await prisma.perfume
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'perfume'));
    return res.status(200).json(data);
  }

  async function createPerfume() {
    await perfumeValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.branded_content?.length > 0) {
      const create_branded_content = body.branded_content;
      body.branded_content = {
        create: create_branded_content,
      };
    } else {
      delete body.branded_content;
    }
    if (body?.end_customer_preference?.length > 0) {
      const create_end_customer_preference = body.end_customer_preference;
      body.end_customer_preference = {
        create: create_end_customer_preference,
      };
    } else {
      delete body.end_customer_preference;
    }
    const data = await prisma.perfume.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
