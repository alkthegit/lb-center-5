import { Server } from 'http';
import app from './app/app';

const server = new Server(app);

server.listen(3000, "localhost", () => {
    const address = server.address();
    console.log(`Server has started at ${address.address}:${address.port}`);
});