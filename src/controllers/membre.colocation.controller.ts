import { Request, Response } from "express";
import { validate } from "class-validator";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { MembreColocationService } from "../services/membre.service";
import { plainToInstance } from "class-transformer";
import { MembreColocationToCreateDTO } from "../types/membre/dtos";
import { CustomError } from "../utils/customError";
import { HistoriquesService } from "../services/historiques.service";

const membreColocationService = new MembreColocationService();
const historiquesService = new HistoriquesService();

export const createMembreColocation = async (req: Request, res: Response): Promise<void> => {
    try {
      // Vérification de l'en-tête d'autorisation
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(400).json({
          message: "Authorization header is required and must be a Bearer token",
        });
        return;
      }
      const accessToken = authHeader.split(" ")[1];
  
      // Vérification et décodage du token
      const decoded = verifyAccessToken(accessToken);
      if (!decoded || typeof decoded !== "object") {
        res.status(401).json({
          message: "Invalid or expired access token",
        });
        return;
      }
  
      // Extraction de l'ID utilisateur à partir du token
      const { id } = decoded as JwtPayload;
      if (!id) {
        res.status(400).json({
          message: "Invalid token payload, ID is missing",
        });
        return;
      }
  
      // Transformation et validation des données reçues
      const membreColocationToCreateDTO = plainToInstance(
        MembreColocationToCreateDTO,
        req.body,
        { excludeExtraneousValues: true }
      );
  
      const dtoErrors = await validate(membreColocationToCreateDTO);
      if (dtoErrors.length > 0) {
        const errorMessages = dtoErrors.map((error) => error.constraints);
        res.status(400).json({
          message: "Validation errors",
          errors: errorMessages,
        });
        return;
      }
  
      // Création du membre de la colocation
      const membreColocation = await membreColocationService.createMembreColocation(
        id,
        membreColocationToCreateDTO
      );
      await historiquesService.createHistorique(id, "Ajout d'un membre à la colocation, l'utilisateur " + membreColocationToCreateDTO.utilisateur);

  
      // Vérification si la création a échoué
      if (!membreColocation) {
        res.status(404).json({
          message: "Colocation not found",
        });
        return;
      }
  
      res.status(200).json({
        message: "Membre ajouté à la colocation avec succès",
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        // Utilisation du code personnalisé dans la réponse
        const statusCode = parseInt(error.statusCode, 10) || 500; // Assure que le statusCode est un entier
        res.status(statusCode).json({
          message: error.message,
          errorCode: error.errorCode,
        });
      } else {
        const err = error as Error;
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    }
  };

export const supprimerMembreColocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(400).json({ message: "Authorization header is required and must be Bearer token" });
            return;
        }
        const accessToken = authHeader.split(" ")[1];

        // Vérifier et décoder le token
        const decoded = verifyAccessToken(accessToken);
        if (!decoded || typeof decoded !== "object") {
            res.status(401).json({ message: "Invalid or expired access token" });
            return;
        }

        const { id } = decoded as JwtPayload;
        if (!id) {
            res.status(400).json({ message: "Invalid token payload, ID is missing" });
            return;
        }

        const { idMembre, idColocation } = req.body;
        if (!idMembre || !idColocation) {
            res.status(400).json({ message: "ID du membre et de la colocation sont requis" });
            return;
        }

        const membreColocation = await membreColocationService.supprimerMembreColocation(id, idMembre, idColocation);
        res.status(200).json({
            message: `Membre désactivé dans la colocation avec succès`,
            membre: membreColocation,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const voirProfilMembre = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(400).json({ message: "Authorization header is required and must be Bearer token" });
            return;
        }
        const accessToken = authHeader.split(" ")[1];

        // Vérifiez et décodez le token
        const decoded = verifyAccessToken(accessToken);
        if (!decoded || typeof decoded !== "object") {
            res.status(401).json({ message: "Invalid or expired access token" });
            return;
        }

        const { id } = decoded as JwtPayload;
        if (!id) {
            res.status(400).json({ message: "Invalid token payload, ID is missing" });
            return;
        }

        const { idMembre, idColocation } = req.body;
        if (!idMembre || !idColocation) {
            res.status(400).json({ message: "ID du membre et de la colocation sont requis" });
            return;
        }

        const membreColocation = await membreColocationService.voirProfilMembre(
            id,
            parseInt(idMembre, 10),
            parseInt(idColocation, 10)
        );

        res.status(200).json({
            message: "Profil du membre récupéré avec succès",
            membre: membreColocation,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

