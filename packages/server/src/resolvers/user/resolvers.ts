import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware
} from 'type-graphql';
import bcrypt from 'bcrypt';
import { User, UserRole } from '../../entity/User';
import { CreateUserInput, LoginInput } from './inputs';
import AppContext from '../../@types/AppContext';
import { authorization } from '../middleware';

@Resolver(User)
class UserResolver {

    @Query(() => User)
    @UseMiddleware(authorization((args, context) => {
        const { userID, userRole } = context.req.session;
        return userID === args.id || userRole === UserRole.Admin
    }))
    async user(@Arg('id', () => Int) id: number): Promise<User> {
        return User.findOne(id);
    }

    @Query(() => [User])
    @UseMiddleware(authorization((args, context) => {
        const { userRole } = context.req.session;
        return userRole === UserRole.Admin
    }))
    async users(): Promise<User[]> {
        return User.find()
    }

    @Mutation(() => User)
    async createUser(@Arg('data') { email, password, firstName, lastName }: CreateUserInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        return user.save();
    }

    @Mutation(() => User)
    async login(
        @Arg('data') { email, password }: LoginInput,
        @Ctx() context: AppContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } });

        if (user) {
            if (await bcrypt.compare(password, user.password)) {

                context.req.session.userID = user.id;
                return user;
            }
        }
        return null
    }

    @Mutation(() => Boolean)
    logout(@Ctx() context: AppContext): boolean {
        context.req.session.destroy((err) => {
            if (err) console.error(err);
        });

        return true;
    }

}

export default UserResolver;