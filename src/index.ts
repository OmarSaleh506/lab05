import { server } from './server';

server.listen({ port: 4500 }).catch((err) => {
	server.log.error(err);
	process.exit(1);
});
