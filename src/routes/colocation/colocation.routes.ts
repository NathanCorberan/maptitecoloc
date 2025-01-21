import { Router } from "express";
import * as colocationController from "../../controllers/colocation.controller";


const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/createColocation", colocationController.createColocation);


export default routes;
