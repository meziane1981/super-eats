import session from 'express-session';
import { User, UserRole } from '../../entity/User';

declare module 'express-session' {
    export interface SessionData {
        userID: number
        userRole: UserRole
    }
}