import { user } from '../types';
import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { handleUserNotFound, handleInvalidID } from '../helper/errorsHandlers'

const getUser = (id: string, res: ServerResponse, users: Array<user>) => {
    try {
        if (validate(id)) {
            const specificUser = users.find((user) => user.id && user.id === id);
            if (specificUser) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(specificUser));
                res.end();
            } else {
                handleUserNotFound(res);
            }
        } else {
            handleInvalidID(res);
        }
    } catch {
        throw new Error();
    }
}

export default getUser;
