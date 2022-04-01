import { createConnection} from "typeorm";
import {Client} from "./entities/Client";
import {Banker} from "./entities/Banker";
import { Transaction } from "./entities/Transaction";
import express from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankertoClientRouter } from "./routes/connect_banker_to_clients";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_clients";

const app = express();

const main = async () =>{

    try{
        const connection = await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username : "postgres",
            password: "toor",
            database: "example",
            entities:[Client, Banker, Transaction ],
            synchronize:true
        })
        console.log("connected...");

        app.use(express.json())
        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTransactionRouter);
        app.use(connectBankertoClientRouter);
        app.use(deleteClientRouter); 
        app.use(fetchClientRouter);
        app.listen(3000,()=>{   
            console.log("Listening at port 3000");
        })
    }
    catch(err){
        console.error(err);
        throw new Error("Unable to connect to db...");
    }
} 

main()