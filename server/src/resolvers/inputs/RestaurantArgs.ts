import { Field, InputType } from 'type-graphql';
import Restaurant from '../../entity/Restaurant';

@InputType()
class RestaurantCreateInput implements Partial<Restaurant> {
    @Field()
    name: string;

    @Field()
    userID: number;
}

export { RestaurantCreateInput }