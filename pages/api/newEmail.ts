import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import Email from '../../utils/email'

const prisma = new PrismaClient()
const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL)


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email
    const id = nanoid(48);

    try {
        const genToken: string = id
        const url = `${baseUrl}verified/${email}/${genToken}`
        await new Email(email, url).sendMagicLink()

        await prisma.tokens.deleteMany({
            where: {
                email: email
            }
        })

        await prisma.tokens.create({
            data: {
                email: email,
                token: genToken
            }
        })

        res.status(200).json({ status: "Sent new email", success: true })

    } catch (error) {
        res.json({ status: "Failed to send new email", success: false })
        console.log(error);
    }
}
