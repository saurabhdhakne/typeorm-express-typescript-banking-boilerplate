import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

export enum TransactionTypes{
    DEPOSITE = "deposit",
    WITHDRAW = "withdraw" 
}

@Entity("transaction")
export class Transaction extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: TransactionTypes
    })
    type!: string;

    @Column({
        type: "numeric"
    })
    amount!: number

    @ManyToOne(
        () => Client,
        client => client.transaction,
        {
            onDelete:'CASCADE'
        }
    )
    @JoinColumn({
        name: "client_id"
    })
    client!: Client

}
