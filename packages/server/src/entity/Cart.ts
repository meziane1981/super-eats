import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { Product } from './Product';
import { User } from './User';

// Represents the current contents of a user's cart
@ObjectType()
@Entity()
class Cart {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => [CartItem])
    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    items: CartItem[];

    @Field(() => User)
    @OneToOne(() => User)
    user: User;

}

// Represents a 'row' of the user's cart
@ObjectType()
@Entity()
class CartItem {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Float)
    @Column('decimal', { precision: 5, scale: 2 })
    price: number;

    @Field(() => Int)
    @Column('int')
    count: number;

    @Field(() => Product)
    @OneToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Field(() => Cart)
    @ManyToOne(() => Cart, cart => cart.items)
    cart: Cart;

}

export { Cart, CartItem };
