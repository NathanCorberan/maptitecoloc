import { Router } from "express";
import * as tacheMenagerController from "../../controllers/tache.menager.controller";


const routes = Router();

routes.post("/addTacheMenager", tacheMenagerController.createTacheMenagere);
routes.put("/:id/statut", tacheMenagerController.updateStatut);



export default routes;
