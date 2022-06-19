import { user } from '../types';
import { IncomingMessage, ServerResponse } from 'http'
import { handleInvalidInput, handleInvalidTypes, handleEmptyBody } from '../helper/errorsHandlers'
import { v4 as uuid } from 'uuid';
import getPostData from '../helper/getPostData'

const createUser = async (req: IncomingMessage, res: ServerResponse, users: Array<user>) => {
    try {
        const body: user = await getPostData(req) as user;
        if (!body) {
            handleEmptyBody(res)
        } else {
            const { username, age, hobbies } = JSON.parse(body as unknown as string);

            if (!username || !age || !hobbies) {
                handleInvalidInput(res);
            } else if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
                handleInvalidTypes(res);
            } else {
                const normalizedUser: user = {
                    id: uuid(),
                    username,
                    age,
                    hobbies: hobbies.map(el => el.toString())
                }

                users.push(normalizedUser);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(normalizedUser));
                res.end();
            }
        }
    } catch {
        throw new Error();
    }
}

export default createUser;
