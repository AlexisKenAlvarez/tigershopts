import { NextApiRequest, NextApiResponse } from 'next';
const cloudinary = require('../../../utils/cloudinary')

import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { image, org } = req.body


    try {
        const client = await clientPromise;
        const db = client.db("?retryWrites=true&w=majority");

        const post = db.collection("Products").updateOne(
            { org: org },
            { $pull: { products: { image: image } } }
        )

        const deleter = await cloudinary.uploader.destroy(req.body.public_id)

        console.log(post);
        console.log(deleter);


        res.status(200).json({ message: "success" });

    } catch (e) {
        console.error(e);
        res.status(400).json({ message: e });
    }


}