import express from 'express'
import userRoute from './apis/user.routes';
import authRoute from './apis/auth.routes';
import roleRoute from './apis/role.routes';
import bookRoute from './apis/book.routes';
import categoryRoute from './apis/category.routes';
import permissionRoute from './apis/permission.routes';
const routes = express.Router();

routes.use("/users", userRoute );
routes.use("/auth", authRoute );
routes.use("/roles", roleRoute );
routes.use("/books", bookRoute );
routes.use("/categories", categoryRoute );
routes.use("/permissions", permissionRoute );

export default routes;