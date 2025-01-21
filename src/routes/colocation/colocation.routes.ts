import { Router } from "express";
import * as colocationController from "../../controllers/colocation.controller";


const routes = Router();

routes.post("/createColocation", colocationController.createColocation);
routes.get('/getUser/:userId', colocationController.getAllColocationsByUser);
routes.get('/getInfoColoc/:colocationId', colocationController.getInfoAllColocationsByUser);

export default routes;
