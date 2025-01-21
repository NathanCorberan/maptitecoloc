import { Router } from "express";
import * as colocationController from "../../controllers/colocation.controller";


const routes = Router();

routes.post("/createColocation", colocationController.createColocation);


export default routes;
