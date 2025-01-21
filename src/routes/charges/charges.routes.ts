import { Router } from "express";
import * as chargesController from "../../controllers/charges.controller";


const routes = Router();

routes.post("/createCharges", chargesController.createCharge);


export default routes;
