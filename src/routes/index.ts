import express from 'express'
import userRoute from './apis/user.routes';
import authRoute from './apis/auth.routes';
import roleRoute from './apis/role.routes';
const routes = express.Router();

routes.use("/users", userRoute );
routes.use("/auth", authRoute );
routes.use("/roles", roleRoute );

export default routes;