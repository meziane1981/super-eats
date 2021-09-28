import { ArgsType, Field, Int, registerEnumType } from 'type-graphql';

enum Order {
    Asc = 'ASC',
    Desc = 'DESC'
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

export { PaginationArgs, Order };