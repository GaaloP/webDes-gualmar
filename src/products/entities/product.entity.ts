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
    @ManyToOne(() => Provider, (provider) => provider.products, {
        eager: true
    })
    provider: Provider
}
