import { Server } from 'http';
import application from './app/app';

const server = new Server(application);

server.listen(3000, "localhost", () => {
    const address = server.address();
    console.log(`Server has started at ${address.address}:${address.port}`);
});