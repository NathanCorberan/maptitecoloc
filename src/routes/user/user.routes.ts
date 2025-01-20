import { Router } from "express";
import * as userController from "../../controllers/user.controller";
import { authenticateToken } from "../../middleware/user/authMiddleware";  // Importer ton middleware
import { deleteUser } from "../../controllers/user.controller";


const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);

// Route pour la connexion d'un utilisateur
routes.post("/login", userController.loginUser);

routes.post("/refresh", userController.refreshUserToken);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", authenticateToken, userController.getMe);  // Route protégée pour récupérer le profil


routes.delete("/delete", authenticateToken, deleteUser);

export default routes;
