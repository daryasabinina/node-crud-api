import {ServerResponse} from "http";
import {user} from "../types"
import {validate} from "uuid";
import {handleInvalidID, handleUserNotFound} from "../helper/errorsHandlers";
const deleteUser = (id: string, users: Array<user>, res: ServerResponse) => {
    try {
        if (validate(id)) {
            const index = users.findIndex(u => u.id === id);
            if (index) {
                users.splice(index, 1);
                res.writeHead(204, { 'Content-Type': 'application/json' });
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

export default deleteUser;
