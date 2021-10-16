import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    ResolverInterface,
    Root
} from 'type-graphql';
import { Like } from 'typeorm';
import AppContext from '../../@types/AppContext';
import Product from '../../entity/Product';
import Restaurant from '../../entity/Restaurant';
import { User } from '../../entity/User';
import { RestaurantCreateInput } from './inputs';

@Resolver(Restaurant)
class RestaurantResolver implements ResolverInterface<Restaurant> {

    @Query(() => Restaurant)
    async restaurant(@Arg('id', () => Int) id: number): Promise<Restaurant> {
        return await Restaurant.findOne(id);
    }

    @Query(() => [Restaurant])
    async restaurants(
        @Arg('nameContains', { nullable: true }) nameContains: string
    ): Promise<Restaurant[]> {
        if (nameContains) {
            return Restaurant.find({
                name: Like(`%${nameContains}%`)
            });
        } else {
            return Restaurant.find();
        }
    }

    @FieldResolver(() => [Product])
    async products(@Root() parent: Restaurant): Promise<Product[]> {
        return Product.find({ where: { seller: parent }, relations: ['seller'] });
    }

    @Mutation(() => Restaurant)
    async createRestaurant(
        @Arg('data') { name }: RestaurantCreateInput,
        @Ctx() context: AppContext
    ): Promise<Restaurant> {
        const user = await User.findOne(context.req.session.userID);
        const restaurant = Restaurant.create({
            name,
            user
        })

        return restaurant.save();
    }

}

export default RestaurantResolver;