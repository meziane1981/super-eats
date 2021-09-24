import { Arg, Args, ArgsType, FieldResolver, Float, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { Between, FindOperator, LessThan, Not } from 'typeorm';
import Product, { Review } from "../../entity/Product";
import { CreateProductInput, ProductsArgs } from "./inputs";
import { PaginationArgs } from '../inputs';

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
        // @Args() { minPrice, maxPrice, minRating, maxRating }: ProductsArgs
    ): Promise<Product[]> {
        // let conditions: Array<{[column: string]: FindOperator<number>}>;
        let conditions: Map<string, FindOperator<number>>;

        // If one of these arguments was provided we want to filter by price
        // if (minPrice && maxPrice) {
        //     operations.push(Between(minPrice, maxPrice));
        // } else if (minPrice || maxPrice) {
        //     if (minPrice) {
        //         operations.push(Not(LessThan(minPrice)));
        //     } else {
        //         operations.push(LessThan(maxPrice));
        //     }
        // }
        
        // let a: any;
        // if (minPrice || maxPrice) {
        //     let min = minPrice ?? 0;
        //     let max = maxPrice ?? 10000;

        //    let a;
        //    a.push({ price: Between(min, max) });
        // }
        
        // return Product
        //     .createQueryBuilder('product')
        //     .where(operations.reduce)
        //     .getQuery();

        return Product.find({ skip, take });
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