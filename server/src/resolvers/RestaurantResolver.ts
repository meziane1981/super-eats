import { Arg, Args, ArgsType, Ctx, Field, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Like } from 'typeorm';
import AppContext from '../@types/AppContext';
import Restaurant from '../entity/Restaurant';
import { User } from '../entity/User';
import { RestaurantCreateInput } from './inputs/RestaurantInput';

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

        return 0;
    }

    @Mutation(() => Restaurant)
    async createRestaurant(
        @Arg('data') { name }: RestaurantCreateInput,
        @Ctx() context: AppContext
    ): Promise<Restaurant> {
        return Restaurant.create({
            name,
            user: await User.findOne(context.req.session.userID)
        }).save();
    }
}

export default RestaurantResolver;