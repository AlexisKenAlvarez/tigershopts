import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';
import { nanoid } from 'nanoid'
import Email from '../../utils/email'

const prisma = new PrismaClient()
const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL)


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const valuesData = req.body.values
    const password = valuesData.password

    const hashed = await hash(password, 10,)

    const id = nanoid(48);
    console.log(id);

    try {
        const user = await prisma.users.findMany({
            where: {
                email: valuesData.email
            }
        })

        if (user.length >= 1) {
            res.status(409).json({ status: "This email is already registered" })
        } else {
            try {
                const genToken: string = id
                const url = `${baseUrl}verified/${valuesData.email}/${genToken}`
                await new Email(valuesData.email, url).sendMagicLink()


                await prisma.users.create({
                    data: {
                        email: valuesData.email,
                        username: valuesData.username,
                        fullname: valuesData.fullname,
                        facebook: valuesData.facebook,
                        phone: valuesData.phone,
                        studentno: valuesData.studentno,
                        course: valuesData.course,
                        yearsection: valuesData.yearsection,
                        password: hashed,
                        verified: false
                    }
                })

                await prisma.tokens.create({
                    data: {
                        email: valuesData.email,
                        token: genToken
                    }
                })


                res.status(200).json({ status: "Added user to database", success: true })

            } catch (error) {
                res.json({ status: "Failed to add user", success: false  })
                console.log(error);
            }

        }
    } catch (error) {
        console.log(error);
        res.json({ status: "Failed to do query on check users", success: false  })
    }

}