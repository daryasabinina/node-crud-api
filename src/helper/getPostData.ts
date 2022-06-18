import { IncomingMessage } from 'http';

function getPostData(req: IncomingMessage) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (err) {
            reject(err)
        }
    })
}

export default getPostData;
