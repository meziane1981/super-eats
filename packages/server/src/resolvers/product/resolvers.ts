import { Arg, Args, FieldResolver, Float, Mutation, Query, registerEnumType, Resolver, ResolverInterface, Root } from "type-graphql";
import Product, { Review } from "../../entity/Product";
import { CreateProductInput } from "./inputs";
import { PaginationArgs, Order } from '../inputs';

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
    @Query(() => Product)
    async product(@Arg('id') id: number): Promise<Product | null> {
        return await Product.findOne(id);
    }

    // Required functionality: pagination, filtering, sorting
    @Query(() => [Product])
    async products(
        @Args()
        { skip, take }: PaginationArgs,
        @Arg('orderBy', () => ProductOrder, { nullable: true, defaultValue: ProductOrder.Rating })
        orderBy: ProductOrder,
        @Arg('direction', () => Order, { defaultValue: Order.Asc })
        direction: Order

    ): Promise<Product[]> {
        const queryBuilder = Product
            .createQueryBuilder('product')
            .select('product.*')

        switch (orderBy) {
            case ProductOrder.Popularity:
                // Order by number of sales
                return queryBuilder.getRawMany();
                break;

            case ProductOrder.Price:
                queryBuilder
                    .orderBy('price', direction)    
                break;
        
            case ProductOrder.Rating:
                queryBuilder
                    .addSelect('AVG(review.rating)', 'avg')
                    .leftJoin('product.reviews', 'review')
                    .orderBy('avg', direction)
                break;
        }
        
        if (take) {
            queryBuilder.take(take);
        }
        
        if (skip) {
            queryBuilder.skip(skip);
        }
        
        return queryBuilder
            .groupBy('product.id')
            .getRawMany();
    }

    @Mutation(() => Product)
    async createProduct(@Arg('data') data: CreateProductInput): Promise<Product> {
        return Product.create(data).save();
    }

    @Mutation(() => [Product])
    async createProducts(
        @Arg('data', () => [CreateProductInput])
            data: CreateProductInput[]
    ): Promise<Product[]> {
        const promises = Product
            .create(data)
            .map(async product => product.save());

        return Promise.all(promises);
    }
    
    @FieldResolver(() => Float)
    async averageRating(@Root() parent: Product): Promise<number> {
        const avg: number = await Review
            .createQueryBuilder("review")
            .select("AVG(review.rating)", "avg")
            .where({
                product: parent
            })
            .getRawOne();
        
        return avg ?? 0;
    }

    @FieldResolver(() => [Review])
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