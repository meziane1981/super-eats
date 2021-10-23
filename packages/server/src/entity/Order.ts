import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Cart } from './Cart';

@ObjectType()
@Entity()
class Order extends Cart {

    @Field()
    @Column({ type: 'timestamptz' })
    orderDate: Date

}

export default Order;