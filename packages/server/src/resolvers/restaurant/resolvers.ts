import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Like } from 'typeorm';
import AppContext from '../../@types/AppContext';
import Product from '../../entity/Product';
import Restaurant from '../../entity/Restaurant';
import { User } from '../../entity/User';
import { RestaurantCreateInput } from './inputs';

@Resolver(Restaurant)
class RestaurantResolver implements ResolverInterface<Restaurant> {
    @Query(() => Restaurant)
    async restaurant(@Arg('id') id: number): Promise<Restaurant> {
        return await Restaurant.findOne(id);
    }

    @Query(() => [Restaurant])
    async restaurants(
        @Arg('nameContains', { nullable: true }) nameContains: string
        ): Promise<Restaurant[] | null> {
        if (nameContains) {
            return Restaurant.find({
                name: Like(`%${nameContains}%`)
            });
        } else {
            return Restaurant.find();
        }
    }

    // @FieldResolver(() => Restaurant)
    // async totalSales(@Root() parent: Restaurant): Promise<number> {
    //     return 0;
    // }

    @FieldResolver(() => [Product])
    async products(@Root() parent: Restaurant): Promise<Product[]> {
        return Product.find({where: {seller: parent}, relations: ['seller']});
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