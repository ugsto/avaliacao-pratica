/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import { Column } from 'typeorm';
import { BaseEntity } from '../base/entity';

export class Student extends BaseEntity {
    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    birthDate: Date;

    @Column()
    registrationNumber: number;
}
