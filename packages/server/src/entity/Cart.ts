import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID, Int, Float } from "type-graphql";
import { Product } from "./Product";
import { User } from "./User";

// Represents the current contents of a user's cart
@ObjectType()
@Entity()
class Cart {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => [CartItem])
    @OneToMany(type => CartItem, cartItem => cartItem.cart)
    items: CartItem[];

    @Field(() => User)
    @OneToOne(() => User)
    user: User;
}

// Represents a 'row' of the user's cart
@ObjectType()
@Entity()
class CartItem {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => Float)
    @Column("decimal", {precision: 5, scale: 2})
    price: number;

    @Field(type => Int)
    @Column("int")
    count: number;

    @Field(type => Product)
    @OneToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Field(type => Cart)
    @ManyToOne(type => Cart, cart => cart.items)
    cart: Cart;
}

export { Cart, CartItem };
