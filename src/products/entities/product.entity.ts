import { Provider } from "src/provider/entities/provider.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
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
    countSeal: number;
    //@Column({type: "uuid"})
    //provider: string;
    @ManyToOne(() => Provider, (provider) => provider.products)
    provider: Provider
}
