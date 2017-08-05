import {
    GET,
    POST,
    PUT,
    DELETE,
    Consumes,
    Body,
    Path,
    Response,
    PathParam,
    QueryParam,
} from '@t2ee/vader';
import {
    Component,
} from '@t2ee/core';
import  {
    Valid,
    Min,
    Max,
    NotNull,
} from '@t2ee/validation';

export class TodoItem {
    id: number;

    @NotNull
    @Min(1)
    @Max(10)
    name: string;
}

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

    @Consumes('application/json')
    @POST
    @Path('/:id?')
    async postItem(@Valid @Body body: TodoItem, @PathParam('id') id) {
        if (!id) {
            id = LIST.length;
        } else {
            id = parseInt(id);
        }
        const item = {
            id,
            name: body.name,
        };
        LIST.push(item);
        const response = new Response();
        response.body = item;
        return response;
    }

    @Consumes('application/json')
    @PUT
    @Path('/:id?')
    async putItem(@Valid @Body body: TodoItem, @PathParam('id') id) {
        if (!id) {
            id = body.id;
        } else {
            id = parseInt(id);
        }
        const item = LIST.find(todo => todo.id === id);
        if (item) {
            item.name = body.name;
            const response = new Response();
            response.body = item;
            return response;
        }
    } 
   
    @DELETE
    @Path('/:id')
    async deleteItem(@PathParam('id') id) {
        id = parseInt(id);
        const index = LIST.findIndex(todo => todo.id === id);
        if (index >= 0) {
            LIST.splice(index, 1);
            const response = new Response();
            response.body = 'OK';
            return response;
        }
    } 
}
