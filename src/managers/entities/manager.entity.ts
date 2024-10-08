import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managrId: string
    @Column('text')
    managerName: string
    @Column('float')
    managerSalary: number
    @Column({
        type: "text",
        unique: true
    })
    managerEmail: string
    @Column('text')
    managerPhoneNumber: string
    
    @OneToOne(() => Location)
    location: Location

    @OneToOne(() => User)
    @JoinColumn({name: "userId"})
    user: User;
}
