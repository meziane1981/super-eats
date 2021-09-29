import { ArgsDictionary, ResolverData } from "type-graphql";
import { Middleware, NextFn } from "type-graphql/dist/interfaces/Middleware";
import AppContext from "../@types/AppContext";
import { UserRole } from "../entity/User";

function authorization(condition: (args: ArgsDictionary, context: AppContext) => boolean): Middleware<AppContext> {
    return async ({root, args, context, info}: ResolverData<AppContext>, next: NextFn) => {
        if (condition(args, context)) {
            // Continue
            await next();
        } else {
            throw new Error('authorization required...');
        }
    }
}

function roleCheck(role: UserRole): Middleware<AppContext> {
    return async ({root, args, context, info}: ResolverData<AppContext>, next: NextFn) => {
        const { userRole } = context.req.session;

        if (userRole === role) {
            // Continue
            await next();
        } else {
            throw new Error('authorization required...');
        }
    }
}

// This should be given a function that will return the ID of the owner or owners
// the argument could be a query or the name of the property we need
function ownershipCheck(finder: () => {}) {
    return async ({root, args, context, info}: ResolverData<AppContext>, next: NextFn) => {
        
    }
}

export { authorization, roleCheck }