import {
    GET,
    Path,
    Response,
    PathParam,
    QueryParam,
} from '@t2ee/vader';
import {
    Component,
} from '@t2ee/core';

let LIST = [{
    id: 0,
    name: 'a',
}, {
    id: 1,
    name: 'b',
}];

@Path('/todo')
@Component
export default class Controller {
    @GET
    @Path('/')
    async getList(@QueryParam('id') id): Promise<Response> {
        if (id) {
            id = parseInt(id);
            const item = LIST.find(todo => todo.id === id);
            if (item) {
                const response = new Response();
                response.body = item;
                return response;    
            }
        } else {
            const response = new Response();
            response.body = LIST;
            return response;
        }
    }

    @GET
    @Path('/:id')
    async getItem(@PathParam('id') id) {
        id = parseInt(id);
        const item = LIST.find(todo => todo.id === id);
        if (item) {
            const response = new Response();
            response.body = item;
            return response;    
        }
    }
}
