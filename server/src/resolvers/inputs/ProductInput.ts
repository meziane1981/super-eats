import { Length, Max, MaxLength, Min } from "class-validator";
import { ArgsType, Field, Float, InputType, Int } from "type-graphql";
import Product, { Categories, Diets, Review } from "../../entity/Product";
import Restaurant from "../../entity/Restaurant";
import { User } from '../../entity/User';
import MinMax from './validators/MinMax';

@InputType()
class CreateProductInput implements Partial<Product> {
    @Field()
    @Length(2, 32)
    name: string;

    @Field({ nullable: true })
    @MaxLength(64)
    description?: string;

    @Field(type => Float)
    price: number;

    @Field(type => Categories)
    category: Categories;

    @Field(type => Diets, { nullable: true })
    diet?: Diets;

    @Field(type => Int)
    sellerID: number;
}

@ArgsType()
class ProductsArgs {
    @Field(type => Float, { nullable: true })
    minPrice?: number;

    @Field(type => Float, { nullable: true })
    maxPrice?: number;

    @Field(type => Float, { nullable: true })
    minRating?: number;

    @Field(type => Float, { nullable: true })
    maxRating?: number;
}

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


export { CreateProductInput, ProductsArgs, CreateReviewInput };