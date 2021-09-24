import { Field, InputType, Int } from 'type-graphql';
import { Review } from '../../entity/Product';
import MinMax from '../validators/MinMax';

@InputType()
class CreateReviewInput implements Partial<Review> {
    @Field(type => Int)
    @MinMax(1)
    rating: number;
    // rhgjphjfdg okgfbd kjopkf ,oerjpoezkfp^dskf zeoktkf >erpogksogkdskg eokfosdkgf

    @Field()
    text: string;

    @Field(type => Int)
    productID: number;
}

export { CreateReviewInput }