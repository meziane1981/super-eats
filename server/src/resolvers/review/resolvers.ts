import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import AppContext from '../../@types/AppContext';
import Product, { Review } from '../../entity/Product';
import { User } from '../../entity/User';
import { CreateReviewInput } from './inputs';

@Resolver(Review)
class ReviewResolver implements ResolverInterface<Review> {
    @Query(type => Review)
    async review(@Arg('id') id: number): Promise<Review> {
        return Review.findOne(id);
    }
    
    @Query(type => [Review])
    async reviews(): Promise<Review[]> {
        return Review.find();
    }

    @Mutation(type => Review)
    async createReview(
        @Arg('data') { rating, text, productID}: CreateReviewInput,
        @Ctx() context: AppContext
    ): Promise<Review> {
        return Review.create({
            rating,
            text,
            user: await User.findOne(context.req.session.userID),
            product: await Product.findOne(productID)
        }).save();
    }

    @FieldResolver(type => User) 
    async user(@Root() parent: Review): Promise<User> {
        const { user } = await Review.findOne(parent.id, { relations: ['user'] });
        return user;
    }
}

export default ReviewResolver;