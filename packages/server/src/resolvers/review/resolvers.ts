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
import AppContext from '../../@types/AppContext';
import Product, { Review } from '../../entity/Product';
import { User } from '../../entity/User';
import { CreateReviewInput } from './inputs';

@Resolver(Review)
class ReviewResolver implements ResolverInterface<Review> {

    @Query(() => Review)
    async review(@Arg('id', () => Int) id: number): Promise<Review> {
        return Review.findOne(id);
    }

    @Query(() => [Review])
    async reviews(): Promise<Review[]> {
        return Review.find();
    }

    @Mutation(() => Review)
    async createReview(
        @Arg('data') { rating, text, productID }: CreateReviewInput,
        @Ctx() context: AppContext
    ): Promise<Review> {
        return Review.create({
            rating,
            text,
            user: await User.findOne(context.req.session.userID),
            product: await Product.findOne(productID)
        }).save();
    }

    @FieldResolver(() => User)
    async user(@Root() parent: Review): Promise<User> {
        const { user } = await Review.findOne(parent.id, { relations: ['user'] });
        return user;
    }

}

export default ReviewResolver;