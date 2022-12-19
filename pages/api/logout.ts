import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default (req: NextApiRequest, res: NextApiResponse) => {

  const { cookies } = req

  const jwt = cookies.authToken

  if (!jwt) {
    return res.json({ message: "Not logged in" })
  } else {
    const seralized = serialize("authToken", '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: '/'

    })

    res.setHeader("Set-Cookie", seralized)
    res.status(200).json({ message: "Logout success", loggedOut: true })
  }


}