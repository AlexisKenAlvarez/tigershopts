import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const email = req.body.email
    const password = req.body.password
    const hashed = await hash(password, 10,)

    try {
        const change = await prisma.users.updateMany({
            where: {
                email: email
            },
            data: {
                password: hashed
            }
        })

        const remove = await prisma.pass.deleteMany({
            where: {
                email: email
            }
        })

        res.status(200).json({status: "Change password success", success: true})
        console.log(change)
    } catch (error) {
        console.log(error)
        res.json({ status: "There was an error", success: false })
    }

}