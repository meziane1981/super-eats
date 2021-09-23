import session from 'express-session';
import { User } from '../../entity/User';

declare module 'express-session' {
    export interface SessionData {
        userID: number
    }
}