import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productId: string;
    @Column({type: "text"})
    productName: string;
    @Column({type: "float"})
    price: number;
    @Column({type: "int"})
    couneSeal: number;
    @Column({type: "uuid"})
    provider: string;
}
