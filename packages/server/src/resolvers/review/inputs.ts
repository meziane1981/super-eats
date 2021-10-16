import { Field, InputType, Int } from 'type-graphql';
import { Review } from '../../entity/Product';

@InputType()
class CreateReviewInput implements Partial<Review> {

    @Field(() => Int)
    rating: number;

    @Field()
    text: string;

    @Field(() => Int)
    productID: number;

}

export { CreateReviewInput }