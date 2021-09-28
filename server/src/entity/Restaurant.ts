import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import Product from "./Product";
import { User } from "./User";

@ObjectType()
@Entity()
class Restaurant extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 32 })
    name: string;

    @Field(() => Int)
    totalSales: number;

    @Field(() => [Product])
    @OneToMany(() => Product, (product) => product.seller)
    products: Product[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}

export default Restaurant;
