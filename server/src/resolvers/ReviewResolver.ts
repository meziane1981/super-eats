import { Arg, FieldResolver, Mutation, Query, ResolverInterface, Root } from 'type-graphql';
import { Review } from '../entity/Product';
import { User } from '../entity/User';
import { CreateReviewInput } from './inputs/ProductInput';

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
    async createReview(@Arg('data') data: CreateReviewInput): Promise<Review> {
        return Review.create(data);
    }

    @FieldResolver(type => User) 
    async user(@Root() parent: Review): Promise<User> {
        const { user } = await Review.findOne(parent.id, { relations: ['user'] });
        console.log(user);
        
        return user;
    }
}

export default ReviewResolver;