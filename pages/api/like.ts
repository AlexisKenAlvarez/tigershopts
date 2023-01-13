import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const client = await clientPromise;
    const db = client.db("?retryWrites=true&w=majority");

    const { email, id, org } = req.body

    

    try {
        const check = await db.collection("Products").updateOne({"products.id": id}, { $pull : {"products.$.likes": email }})
        if (check.modifiedCount === 0) {
            db.collection("Products").updateOne({"products.id": id}, { $push: {"products.$.likes": email }})
        }
        console.log(check.modifiedCount)

        res.status(200).json({message: "Success"})
    } catch (error) {

    }
}