import dotenv from 'dotenv';
import http from 'http';
import { getUsers, createUser, getUser, updateUser, deleteUser } from './controllers/index';
import { user } from './types';
import { handleInternalError, handleNotFound } from './helper/errorsHandlers';
import { Operations, BASIC_ROUTE, PARAM_ROUTE } from './constants'

const users: Array<user> = [];
const env = dotenv.config();
const port = (env.parsed && env.parsed.PORT) || 4000;

const server = http.createServer(async (req, res) => {
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
})

server.listen(port, () => console.log(`Server running on Port: ${port}`));

module.exports = server

