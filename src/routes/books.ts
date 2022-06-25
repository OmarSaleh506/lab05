import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { createbookController } from '../controller/book';
const book = Type.Object({
    id: Type.String({ format: 'uuid' }),
    name: Type.String(),
})
const getbook = Type.Object({
    name: Type.Optional(Type.String()),
});
type book = Static<typeof book>;
type getbook = Static<typeof getbook>;

export let books: book[] = [
    {id: "1" , name: 'desco'},
    {id: "2" , name: 'trople'},
    {id: "3" , name: 'donble'},
    {id: "4" , name: 'fultinta'},
    {id: "5" , name: 'srer'},
];

export default async function name(server:FastifyInstance) {
    server.route({
        method: 'GET',
        url: '/book',
        schema: {
            summary: 'getting books (with Search)',
            tags: ['books'],
           querystring: getbook,
           response: {
            '2xx' : Type.Array(book)
           }
        },
        handler: async (request, reply) => {
            const query = request.query as getbook;
        if (query.name) {
            return books.filter((c) => c.id.includes(query.name ?? ''));
        } else {
            return book;
        }
        }
    }),
       server.route({
        method: "PATCH",
        url: '/book/:id',
        schema: {
            summary: 'updating books (partially and fully)',
            tags:['books'],
            body: Type.Partial(book),
            params: Type.Object({
                id: Type.String({ format: 'uuid' })
            })
            
        },
        handler: async (request, reply) => {
            const newbook: any = request.body;
			return createbookController(books, newbook);
        }
       }) ,
    server.route({
        method: 'DELETE',
        url: '/book',
        schema: {
            summary: 'deleting books (partially or fully)',
            tags: ['books'],
          params: {
            id: Type.String({ format: 'uuid' })
          }
        },
        handler: async (request, reply) => {
            const id = (request.params as any).id as string;

            books = books.filter((b) => b.id !== id);
    
            return books;
        }
    }),
    server.route({
		method: 'GET',
		url: '/favoritebooks/:id',
		schema: {
			summary: 'Gets favorite book for one user',
			tags: ['books'],
			querystring: getbook,
			response: {
				'2xx': Type.Array(book),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as getbook;

			if (query.name) {
				return books.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return books;
			}
		},
	}),
    server.route({
		method: 'GET',
		url: '/allfavoritebooks',
		schema: {
			summary: 'Gets the favorite book',
			tags: ['books'],
            params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			querystring: getbook,
			response: {
				'2xx': Type.Array(getbook),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as getbook;

			if (query.name) {
				return books.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return books;
			}
		},
	});
}