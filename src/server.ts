import { ajvTypeBoxPlugin, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyAutoload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import fastify from 'fastify';
import { join } from 'path';

export const server = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			ownProperties: true,
		},
        plugins: [ajvTypeBoxPlugin],
	},
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySwagger, {
	routePrefix: '/docs',
	exposeRoute: true,
	mode: 'dynamic',
	openapi: {
		info: {
			title: 'book',
			version: '0.0.1',
		},
	},
});

server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
});
