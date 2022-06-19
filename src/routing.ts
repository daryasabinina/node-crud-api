import { IncomingMessage, ServerResponse } from 'http';

import { BASIC_ROUTE, Operations, PARAM_ROUTE } from './constants';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './controllers';
import { handleInternalError, handleNotFound } from './helper/errorsHandlers';
import { user } from './types';

const privatUsers: Array<user> = [];

const routing = async (req: IncomingMessage, res: ServerResponse, users = privatUsers) => {
    if (req.url) {
        if (req.url.match(BASIC_ROUTE) && req.method === Operations.GET) {
            try {
                getUsers(res, users);
            } catch {
                handleInternalError(res);
            }
        } else if(req.url.match(PARAM_ROUTE) && req.method === Operations.GET) {
            try {
                const id = req.url.split('/')[3];
                getUser(id, res, users);
            } catch {
                handleInternalError(res);
            }
        } else if(req.url.match(BASIC_ROUTE)&& req.method === Operations.POST) {
            try {
                await createUser(req, res, users);
            } catch {
                handleInternalError(res);
            }
        } else if(req.url.match(PARAM_ROUTE) && req.method === Operations.PUT) {
            try {
                const id = req.url.split('/')[3];
                await updateUser(id, req, res, users);
            } catch {
                handleInternalError(res);
            }
        } else if(req.url.match(PARAM_ROUTE) && req.method === Operations.DELETE) {
            try {
                const id = req.url.split('/')[3];
                deleteUser(id, users, res);
            } catch {
                handleInternalError(res);
            }
        } else {
            handleNotFound(res);
        }
    } else {
        res.end();
    }
}

export default routing;
