import { Arg, Args, ArgsType, FieldResolver, Float, InputType, Mutation, Query, registerEnumType, Resolver, ResolverInterface, Root } from "type-graphql";
import Product, { Review } from "../../entity/Product";
import { CreateProductInput, ProductsArgs } from "./inputs";
import { PaginationArgs } from '../inputs';


enum ProductOrder {
    Popularity,
    Rating,
    Price
}

registerEnumType(ProductOrder, {
    name: 'ProductOrder',
    description: ''
})

@Resolver(Product)
class ProductResolver implements ResolverInterface<Product>{
    @Query(type => Product)
    async product(@Arg('id') id: number): Promise<Product | null> {
        return await Product.findOne(id);
    }

    // Required functionality: pagination, filtering, sorting
    @Query(type => [Product])
    async products(
        @Args() { skip, take }: PaginationArgs,
        @Arg('orderBy', { nullable: true }) orderBy: ProductOrder
    ): Promise<Product[]> {
        let query = Product.createQueryBuilder();

        if (skip) {
            query.skip(skip)
        }
        if (take) {
            query.take(take)
        }

        return query.getMany();
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
    
    @FieldResolver(type => Float)
    async averageRating(@Root() parent: Product): Promise<number> {
        let { avg } = await Review
            .createQueryBuilder("review")
            .select("AVG(review.rating)", "avg")
            .where({
                product: parent
            })
            .getRawOne();
        
        return avg;
    }

    @FieldResolver(type => [Review])
    async reviews(
        @Root() parent: Product
    ): Promise<Review[]> {
        return Review.find({
            where: { 
                product: parent
            }
        });
    }
}

export default ProductResolver;