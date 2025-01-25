import { Router } from "express";
import * as membreController from "../../controllers/membre.colocation.controller";


const routes = Router();

routes.post("/addMembre", membreController.createMembreColocation);
routes.post("/deleteMembre", membreController.supprimerMembreColocation);

export default routes;
