import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
