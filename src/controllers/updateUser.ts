import { user } from '../types';
import {
    handleEmptyBody,
    handleInvalidID,
    handleInvalidInput,
    handleInvalidTypes,
    handleUserNotFound
} from '../helper/errorsHandlers';
import { validate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import getPostData from '../helper/getPostData';

const updateUser = async (id: string, req: IncomingMessage, res: ServerResponse, users: Array<user>) => {
    try {
        if (validate(id)) {
            const specificUser = users.find((user) => user.id === id);

            if (specificUser) {

                const body: user = await getPostData(req) as user;
                if (!body) {
                    handleEmptyBody(res)
                } else {
                    const { username, age, hobbies } = JSON.parse(body as unknown as string);

                    if (!(username || age || hobbies)) {
                        handleInvalidInput(res);
                    } else {
                        const index = users.findIndex((u) => u.id === id)

                        users[index].age = age || users[index].age;
                        users[index].username = username || users[index].username;
                        users[index].hobbies = hobbies || users[index].hobbies.map(el => el.toString());
                        if (typeof users[index].username !== 'string' || typeof users[index].age !== 'number' || !Array.isArray(users[index].hobbies)) {
                            handleInvalidTypes(res);
                        } else {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.write(JSON.stringify(users[index]));
                            res.end();
                        }
                    }
                }
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

export default  updateUser;

