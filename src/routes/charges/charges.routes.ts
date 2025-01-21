import { Router } from "express";
import * as chargesController from "../../controllers/charges.controller";


const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/createCharges", chargesController.addCharge);


export default routes;
