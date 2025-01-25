import { Router } from "express";
import * as membreController from "../../controllers/membre.colocation.controller";


const routes = Router();

routes.post("/addMembre", membreController.createMembreColocation);
routes.post("/deleteMembre", membreController.supprimerMembreColocation);
routes.post("/viewMembre", membreController.voirProfilMembre);

export default routes;
