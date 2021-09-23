import { Arg, Args, ArgsType, Field, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Like } from 'typeorm';
import Restaurant from '../entity/Restaurant';
import { User } from '../entity/User';
import { RestaurantCreateInput } from './inputs/RestaurantArgs';

@Resolver(Restaurant)
class RestaurantResolver implements ResolverInterface<Restaurant> {
    @Query(() => Restaurant)
    async restaurant(@Arg('id') id: number): Promise<Restaurant> {
        return await Restaurant.findOne(id);
    }

    @Query(() => [Restaurant])
    async restaurants(
        @Arg('nameContains', { nullable: true }) nameContains?: string
        ): Promise<Restaurant[] | null> {
        if (nameContains !== null) {
            return Restaurant.find({
                name: Like(`%${nameContains}%`)
            });
        } else {
            return Restaurant.find();
        }
    }

    @FieldResolver(() => Restaurant)
    async totalSales(@Root() parent: Restaurant): Promise<number> {
        // Restaurant.count()

        return 0;
    }

    @Mutation(() => Restaurant)
    async createRestaurant(
        @Arg('data') { name, userID }: RestaurantCreateInput
    ): Promise<Restaurant> {
        return Restaurant.create({
            name,
            user: await User.findOne(userID)
        }).save();
    }
}

export default RestaurantResolver;