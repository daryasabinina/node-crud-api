import { user } from '../types';
import { ServerResponse } from 'http'

const getUsers = (res: ServerResponse, users: Array<user>) => {
    try {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(users));
        res.end();
    } catch {
        throw new Error();
    }
}

export default getUsers;
