/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import {
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deletedAt?: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version: number;

    constructor(partial: Partial<BaseEntity>) {
        Object.assign(this, partial);
    }
}
