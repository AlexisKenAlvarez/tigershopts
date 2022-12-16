import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const valuesData = req.body.values
    const password = valuesData.password

    const hashed = await hash(password, 10,)

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
                res.status(200).json({ status: "Added user to database" })

            } catch (error) {
                res.json({ status: "Failed to add user" })
                console.log(error);
            }

        }
    } catch (error) {
        console.log(error);
        res.json({ status: "Failed to do query on check users" })
    }





}