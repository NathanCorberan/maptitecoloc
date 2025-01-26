import { Router } from "express";
import * as chargesController from "../../controllers/charges.controller";


const routes = Router();

routes.post("/createCharges", chargesController.createCharge);
routes.post("/createChargesPartiel", chargesController.createChargePartiel);
routes.put("/:id/desactivate", chargesController.deactivateCharge);
routes.put("/:id/activate", chargesController.activateCharge);

export default routes;
