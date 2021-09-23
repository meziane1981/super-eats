import { Arg, Args, ArgsType, FieldResolver, Float, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import Product, { Review } from "../entity/Product";
import { CreateProductInput, ProductsArgs } from "./inputs/ProductInput";

@Resolver(Product)
class ProductResolver implements ResolverInterface<Product>{
    @Query(type => Product)
    async product(@Arg('id') id: string): Promise<Product | null> {
        return await Product.findOne(id);
    }

    // Required functionality: filtering, sorting
    @Query(type => [Product])
    async products(@Args() args: ProductsArgs): Promise<Product[]> {
        return Product.find();
    }

    @FieldResolver(type => Float)
    async averageRating(@Root() parent: Product): Promise<number> {
        let { avg } = await Review
            .createQueryBuilder("review")
            .select("AVG(review.rating)", "avg")
            .where({product: parent})
            .getRawOne();
        
        return avg;
    }

    @Mutation(type => Product)
    async createProduct(@Arg('data') data: CreateProductInput): Promise<Product> {
        return Product.create(data).save();
    }

    @Mutation(type => [Product])
    async createProducts(
        @Arg('data', type => [CreateProductInput])
            data: CreateProductInput[]
    ): Promise<Product[]> {
        const promises = Product
            .create(data)
            .map(async product => product.save());

        return Promise.all(promises);
    }
}

export default ProductResolver;