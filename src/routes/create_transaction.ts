import express from "express";
import { Transaction, TransactionTypes } from "../entities/Transaction";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async(req,res)=>{
    const { clientId } = req.params;

    const { type, amount } = req.body;

    const client = await Client.findOne(parseInt(clientId));

    if(!client){
        return res.json({
            msg:"Client not found"
        })
    }

    const transaction = Transaction.create({
        amount,
        type,
        client
    });

    await transaction.save();
    console.log(typeof(client.balance));
    console.log(typeof(amount));

    let tmp:Number = client.balance;

    if(type === TransactionTypes.DEPOSITE){
        client.balance = tmp + amount;
    }else if(type === TransactionTypes.WITHDRAW){
        client.balance = client.balance - amount;
    }

    await client.save()

    return res.json({
        msg:"transaction added"
    })

})

export { router as createTransactionRouter }