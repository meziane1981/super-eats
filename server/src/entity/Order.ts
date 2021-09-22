import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Product } from "./Product";
import { User } from "./User";
import { Cart } from "./Cart";

@ObjectType()
@Entity()
class Order extends Cart{
    @Field()
    @Column({type: "timestamptz"})
    orderDate: Date
}