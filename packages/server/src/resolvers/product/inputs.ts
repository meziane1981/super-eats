import { Length, MaxLength } from "class-validator";
import { ArgsType, Field, Float, InputType, Int } from "type-graphql";
import Product, { Categories, Diets } from "../../entity/Product";

@InputType()
class CreateProductInput implements Partial<Product> {

    @Field()
    @Length(2, 32)
    name: string;

    @Field({ nullable: true })
    @MaxLength(64)
    description?: string;

    @Field(() => Float)
    price: number;

    @Field(() => Categories)
    category: Categories;

    @Field(() => Diets, { nullable: true })
    diet?: Diets;

    @Field(() => Int)
    sellerID: number;

}

@ArgsType()
class ProductsArgs {

    @Field(() => Float, { nullable: true })
    minPrice?: number;

    @Field(() => Float, { nullable: true })
    maxPrice?: number;

    @Field(() => Float, { nullable: true })
    minRating?: number;

    @Field(() => Float, { nullable: true })
    maxRating?: number;

}

export { CreateProductInput, ProductsArgs };