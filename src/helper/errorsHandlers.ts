import { ServerResponse } from 'http'

export const handleInternalError = (res: ServerResponse) => {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify('Internal Error'))
}

export const handleNotFound = (res: ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify('Route Not Found'))
}

export const handleInvalidInput = (res: ServerResponse) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Please, fill in all required fields'));
}

export const handleInvalidTypes = (res: ServerResponse) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Please, check your fields types'));
}

export const handleUserNotFound = (res: ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('User Not Found'));
}

export const handleInvalidID = (res: ServerResponse) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('User ID not valid'));
}
