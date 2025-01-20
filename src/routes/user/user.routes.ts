import { Router } from "express";
import * as userController from "../../controllers/user.controller";
import { authenticateToken } from "../../middleware/user/authMiddleware";  // Importer ton middleware


const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);

// Vous pouvez ajouter d'autres routes comme login, profile, etc.

// Route pour la connexion d'un utilisateur
routes.post("/login", userController.loginUser);

routes.post("/refresh", userController.refreshUserToken);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", authenticateToken, userController.getMe);  // Route protégée pour récupérer le profil

export default routes;
