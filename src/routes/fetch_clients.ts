import express from "express";
import { createQueryBuilder } from "typeorm";

import { Client } from "../entities/Client";

const router = express.Router();

router.get('/api/clients', async (req, res)=>{

        // const client = await Client.find()

        // const client = await createQueryBuilder(
        //     'client' //table name
        // ).select('client.first_name') // 'client' to select all, client.column_name to select specific column 
        // .addSelect('client.balance') // add more column name
        // .from(Client,'client') 
        // // .where('client.id = :clientId',{ clientId : 6})
        // .where('client.balance >= :minBalance AND client.balance <= :maxBalance ',{ minBalance: 3000, maxBalance:90000})
        // .getOne()

        const client = await createQueryBuilder(
            'client' //table name
        ).select('client.first_name') // 'client' to select all, client.column_name to select specific column 
        .addSelect('client.balance') // add more column name
        .from(Client,'client')
        .leftJoinAndSelect(
            'client.transaction',
            'transaction'
        ) 
        .where('client.balance >= :minBalance AND client.balance <= :maxBalance ',{ minBalance: 3000, maxBalance:90000})
        .getOne()

        return res.json(client)
})

export { router as fetchClientRouter }