import { Arg, Args, Ctx, Mutation, Query, Resolver, ResolverInterface } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from '../entity/User';
import { CreateUserInput, LoginInput } from './inputs/UserInput';
import AppContext from '../@types/AppContext';

@Resolver(User)
class UserResolver {
    @Query(() => User)
    async user() {
        return User.find()
    }

    @Mutation(() => User)
    async createUser(@Arg('data') { email, password, firstName, lastName }: CreateUserInput) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user1 = User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        
        console.log(user1);
        
        const user2 = user1.save();

        console.log(user2);

        return user2;
    }
    
    @Mutation(() => User)
    async login(
        @Arg('data') { email, password }: LoginInput,
        @Ctx() context: AppContext
    ): Promise<User | null> {
        const user = await User.findOne({where: {email}});

        if (user) {
            if (bcrypt.compare(password, user.password)) {
                context.req.session.userID = user.id;
                return user;
            }
        }
        return null
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() context: AppContext): Promise<boolean> {
        context.req.session.destroy((err) => {
            if(err) console.error(err);
        });

        return true;
    }
}

export default UserResolver;