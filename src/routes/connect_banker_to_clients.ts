import express from "express";
import { Transaction, TransactionTypes } from "../entities/Transaction";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker"
const router = express.Router();

router.post("/api/banker/:bankerId/client/:clientId", async(req,res)=>{
    
    const { bankerId, clientId } = req.params;

    const client = await Client.findOne(
        parseInt(clientId)
    )

    const banker = await Banker.findOne(
        parseInt(bankerId)
    )

    if(!banker || !client){
        return res.json({
            msg: "Banker or client not found"
        })
    }

    banker.clients = [
        client
    ]

    await banker.save();
    
    return res.json({
        msg: "Banker and client is connected"
    })

})

export { router as connectBankertoClientRouter }