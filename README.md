# Simple CRUD APU

## Installation
1. Run `npm install` to add dependencies
2. Create `.env` file, example you can find inside `demo.env`
3. Build application using `npm run build`. In case of error try to add `sudo` before command

## Running server
- Run `npm run start:prod` for prod version
- Run `npm run start:dev` for development version
- Run `npm run start:scalable` to try server with load balancer. To make sure, that balancer works correctly you can check for header `Process-ID` in response headers

## Testing
- To run tests use `npm run test`. **Please, note that build before tests is obligatory.**

## Some additional, but important notes
- /api/users/ - 404 NOT EXIST
- /api/users/:id/ - same as /api/users/:id
- /api/users/:id/whatever - same as /api/users/:id
- Request body: All fields except `username`, `age` and `hobbies` in request body gonna be ignored
- PUT request works as PATCH request, so you don't need to pass all fields, just specific one you want to update. (This approach was discussed in discord as possible and correct one)
