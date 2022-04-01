import {Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany} from "typeorm";
import { Banker } from "./Banker";
import { Transaction } from "./Transaction";
import {Person} from "./utils/Person"

@Entity('client')
export class Client extends Person {

    @Column({
        type: "integer",
        default:0
    })
    balance!: number;
    
    @Column({
        default: true,
        name: "active"
    })
    is_active!: boolean;

    @Column({
        type: "simple-json",
        nullable: true
    })
    addition_info!: {
        age: number;
        hair_color: string;
    };
    
    @Column({
        type: "simple-array",
        default: []
    })
    family_member!: string[];

    @OneToMany(
        () => Transaction,
        transaction => transaction.client
    )
    transaction!: Transaction[]
     
    @ManyToMany(
        () => Banker
    )
    bankers!: Banker[]

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

}