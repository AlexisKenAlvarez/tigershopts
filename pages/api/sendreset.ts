import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import Password from '../../utils/password';


const prisma = new PrismaClient()

const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL)

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const email = req.body.email

    const id = nanoid(48);
    console.log(id);

    try {
        const exists = await prisma.users.findMany({
            where: {
                email: email
            }
        })

        if (exists.length > 0) {
            const user = await prisma.pass.findMany({
                where: {
                    email: email
                }
            })

            if (user.length > 0) {
                const resetToken = await prisma.pass.deleteMany({
                    where: {
                        email: email
                    }
                })
            }

            const genToken: string = id
            const url = `${baseUrl}reset/${email}/${genToken}`
            await new Password(email, url).sendMagicLink()

            const newToken = await prisma.pass.create({
                data: {
                    email: email,
                    token: genToken
                }
            })

            res.status(200).json({ message: "Password reset link sent", success: true })

        } else {
            res.status(404).json({ message: "Email does not exist", success: false })
        }

    } catch (error) {

        console.log(error);
        res.json({ message: "There was an error", success: false })
    }

}