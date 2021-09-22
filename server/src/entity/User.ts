import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, Length } from 'class-validator'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'

// Important to remember that if a value is inserted anywhere other than at the end all user permissions will change
enum UserRole {
    User = 'user',
    Seller = 'seller',
    Admin = 'admin',
}

registerEnumType(UserRole, {
    name: 'UserRole',
    description: ''
})

@ObjectType()
@Entity()
class User extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 254, unique: true })
    email: string;

    @Column({ length: 64 })
    password: string;

    @Field()
    @Column({
        length: 32,
        nullable: true,
    })
    firstName: string;

    @Field()
    @Column({
        length: 32,
        nullable: true,
    })
    lastName: string;

    // It is possible that the default value here will always be the same
    @Column({
        type: 'timestamptz',
        default: () => "CURRENT_TIMESTAMP"
    })
    registrationDate?: Date;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    lastConnection?: Date;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;
}

export { UserRole, User };
