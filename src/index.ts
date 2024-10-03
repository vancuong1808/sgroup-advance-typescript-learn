import express, { Request, Response, NextFunction } from "express"
import { Server, createServer } from 'http'
import { envServer } from "./env";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { notFoundError } from "./errors/customError";
import routes from "./routes/index";
// setup server http
const app = express();
const httpServer : Server = createServer( app );
// setup Middleware
app.use( express.json() );
app.use("/api", routes );
app.use("*", ( req : Request, res : Response, next : NextFunction ) =>{
    next( new notFoundError("Not Found 404") );
});
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

const PORT : string | number = envServer.PORT;
httpServer.listen( PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
})