import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import Restaurant from './Restaurant';
import { Field, Float, ID, Int, ObjectType, registerEnumType } from 'type-graphql';

enum Diets {
    None,
    Vegetarian,
    Vegan,
    Halal,
}

registerEnumType(Diets, {
    name: 'Diets',
    description: ''
})

enum Categories {
    None,
    American,
    Chinese,
    English,
    French,
    Indian,
    Korean,
    Mexican,
    Japanese,
    Vietnamese,
}

registerEnumType(Categories, {
    name: 'Categories',
    description: ''
})

@ObjectType()
@Entity()
class Product extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 32 })
    name: string;

    @Field({ nullable: true })
    @Column({ length: 64, nullable: true})
    description?: string;

    @Field(type => Float)
    @Column('float')
    price: number;

    @Field(type => Categories)
    @Column({
        type: 'enum',
        enum: Categories,
        default: Categories.None 
    })
    category: Categories;

    @Field(type => Diets)
    @Column({
        type: 'enum',
        enum: Diets,
        default: Diets.None
    })
    diet: Diets;

    @Field(type => Restaurant)
    @ManyToOne(type => Restaurant, restaurant => restaurant.products)
    seller: Restaurant;

    @Field(type => [Review])
    reviews: Review[]

    @Field(type => Float)
    averageRating: number;
}

@ObjectType()
@Entity()
class Review extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => Int)
    @Column()
    rating: number;

    @Field()
    @Column({ length: 1024, nullable: true })
    text: string;

    @Field(type => User)
    @ManyToOne(type => User)
    user: User;

    @Field(type => Product)
    @ManyToOne(type => Product)
    product: Product;
}

export default Product;
export { Categories, Diets, Product, Review };
