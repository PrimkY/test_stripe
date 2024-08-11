import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {User} from "../../user/entities/user.entity";


@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    type: string

    @Column()
    pereodicity: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
}
