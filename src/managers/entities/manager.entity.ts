import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managrId: string
    @Column('text')
    managerName: string
    @Column('float')
    managerSalary: number
    @Column('text')
    managerEmail: string
    @Column('text')
    managerPhoneNumber: string
    
    @OneToOne(() => Location)
    location: Location
}
