import { NextApiRequest, NextApiResponse } from 'next';

import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const image = req.body.image

    try {
        const client = await clientPromise;
        const db = client.db("?retryWrites=true&w=majority");

        const post = db.collection("Products").updateOne(
            {org: "csso"},
            {$pull: {products: {image: image } } }
        )

        res.json({ post });

    } catch (e) {
        console.error(e);
    }


}