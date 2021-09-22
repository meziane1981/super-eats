import { Express } from 'express';

interface AppContext {
    req: Express.Request
}

export default AppContext;