import { ArgsType, Field, InputType, Int, registerEnumType } from 'type-graphql';

enum Order {
    Asc,
    Desc
}

registerEnumType(Order, {
    name: 'Order',
    description: ''
});

@ArgsType()
class PaginationArgs {
    @Field(type => Int, { nullable: true })
    skip?: number;

    @Field(type => Int, { nullable: true })
    take?: number;
}

@ArgsType()
class OrderArgs {
    field: string;
    order: Order;
}

export { PaginationArgs, OrderArgs };