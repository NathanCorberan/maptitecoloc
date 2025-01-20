import { Router } from "express";
import * as userController from "../../controllers/user.controller";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);

// Vous pouvez ajouter d'autres routes comme login, profile, etc.

// Route pour la connexion d'un utilisateur
routes.post("/login", userController.loginUser);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", /* authenticate, userController.getUserProfile */);

export default routes;
