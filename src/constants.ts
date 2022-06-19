export enum Operations {
    'GET'='GET',
    'PUT'='PUT',
    'POST'='POST',
    'DELETE'='DELETE'
}

export const BASIC_ROUTE = new RegExp(/\/api\/users$/);
export const PARAM_ROUTE = new RegExp(/\/api\/users\/[\w]/); // TODO REMOVE LAST SLASH