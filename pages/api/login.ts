import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from "jsonwebtoken"
import { serialize } from "cookie"
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'

const secret = String(process.env.NEXT_PUBLIC_SECRET)
const prisma = new PrismaClient()


export default async function(req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await prisma.users.findMany({
            where: {
                email: email
            }
        })

        if (user.length >= 1) {
            compare(password, user[0].password, function(err, result) {
                if (!err && result) {
                    const token = sign(
                        {
                            exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
                            username: user[0].username
                        },
                        secret
                    )
                
                    const serialized = serialize("authToken", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: "strict",
                        maxAge: 60 * 60 * 1,
                        path: '/'
                    })

                    res.setHeader('Set-Cookie', serialized)
                    res.status(200).json({status: 'Login success!', loggedIn: true})

                } else {
                    console.log(err);
                    res.status(403).json({status: "Incorrect password!", loggedIn: false, name: "password"})

                }
            })
        } else {
            res.status(404).json({status: "This email doesn't exist!", loggedIn: false, name: "email"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({status: error, loggedIn: false})

    }


}

export const config = {
    api: {
      externalResolver: true,
    },
  }