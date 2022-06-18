import dotenv from 'dotenv';
import http from 'http';
import url, { UrlWithStringQuery } from 'url';
import { getUsers } from './controllers/index';
import { user } from './types';

const users: Array<user> = [];

const BASIC_ROUTE = '/api/users';

const server = http.createServer((req, res) => {
    if (req.url) {
        if(req.url === BASIC_ROUTE && req.method === 'GET') {
            try {
                getUsers(res, users);
            } catch {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Internal Error' }))
            }
        } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
        } else if(req.url === '/api/products' && req.method === 'POST') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
        } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
        } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Route Not Found' }))
        }
    } else {
        res.end();
    }
})

const env = dotenv.config();
server.listen(env.parsed && env.parsed.PORT, () => console.log(`Server running on Port: ${env.parsed && env.parsed.PORT}`))
