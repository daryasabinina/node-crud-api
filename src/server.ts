import dotenv from 'dotenv';
import http from 'http';

import { user } from './types';
import routing from './routing'

const users: Array<user> = [];
const env = dotenv.config();
const port = (env.parsed && env.parsed.PORT) || 4000;

const server = http.createServer(async (req, res) => {
    await routing(req, res, users)
})

server.listen(port, () => console.log(`Server running on Port: ${port}`));

module.exports = server
