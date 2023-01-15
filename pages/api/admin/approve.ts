import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb"

export default async (req:NextApiRequest, res:NextApiResponse) => {

    try {
        const client = await clientPromise;
        const db = client.db("?retryWrites=true&w=majority");

        const { id,type } = req.body
        const newId = new ObjectId(id)

        if (type === "approve") {
            const complete = await db.collection("Orders").findOne({_id: newId})
            db.collection("Completed").insertOne({org: complete!.org, 
                email: complete!.email, 
                productName: complete!.productName, 
                fullName: complete!.fullname,
                contact: complete!.contact,
                studentno: complete!.studentno,
                quantity: complete!.quantity,
                amount: complete!.amount,
                facebook: complete!.facebook,
                completedAt: new Date()
            })
            db.collection("Orders").deleteOne({_id: newId})
            console.log("Approve success")
            res.status(200).json({message: "Approve success", data: complete})
        } else if (type === "remove") {
            db.collection("Orders").deleteOne({_id: newId})
            console.log("Remove success")
            res.status(200).json({message: "Remove success"})
        }

        


    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Error"})
        
    }


}