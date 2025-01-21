import { Request, Response } from "express";
import { ColocationService } from "../services/colocation.service";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocationPresenter } from "../types/colocation/presenters";
import { ColocationBigPresenter } from "../types/colocation/presenter.big";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const colocationService = new ColocationService();

export const createColocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const colocationToCreateDTO = plainToInstance(ColocationToCreateDTO, req.body, { excludeExtraneousValues: true });

        const dtoErrors = await validate(colocationToCreateDTO);
        if (dtoErrors.length > 0) {
            const errorMessages = dtoErrors.map((error) => error.constraints);
            res.status(400).json({ errors: errorMessages });
            return;
        }

        const colocation = await colocationService.createColocation(req.body);
        const createdColocation = plainToInstance(ColocationPresenter, colocation, { excludeExtraneousValues: true });
        res.status(201).json(createdColocation);
    }
    catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}


export const getAllColocationsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
      }
      const colocations = await colocationService.findAllColocations(userId);
      const colocationsResponse = plainToInstance(ColocationPresenter, colocations, { excludeExtraneousValues: true });
  
      res.status(200).json(colocationsResponse);
    } catch (error: unknown) {
      const err = error as Error;
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };

export const getInfoAllColocationsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const colocationId = parseInt(req.params.colocationId);
    if (isNaN(colocationId)) {
      res.status(400).json({ message: "Invalid colocation ID" });
      return;
    }
    const colocation = await colocationService.findInfoAllColocations(colocationId);
    const colocationResponse = plainToInstance(ColocationBigPresenter, colocation, { excludeExtraneousValues: true });

    res.status(200).json(colocationResponse);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const toggleColocationActiveState = async (req: Request, res: Response): Promise<void> => {
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

      // Extraire l'ID de l'utilisateur depuis le token
      const { id } = decoded as JwtPayload;
      if (!id) {
        res.status(400).json({ message: "Invalid token payload, ID is missing" });
        return;
      }


      const colocationId = parseInt(req.params.colocationId);
      if (isNaN(colocationId)) {
          res.status(400).json({ message: "Invalid colocation ID" });
          return;
      }

      const { active } = req.body;
      if (typeof active !== "boolean") {
          res.status(400).json({ message: "Invalid active state, must be a boolean" });
          return;
      }

      const updatedColocation = await colocationService.IsActive(id, colocationId, active);
      if (!updatedColocation) {
          res.status(404).json({ message: "Colocation not found" });
          return;
      }

      res.status(200).json({
          message: `Colocation ${active ? "activated" : "deactivated"} successfully`,
          colocation: updatedColocation,
      });
  } catch (error: unknown) {
      const err = error as Error;
      res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
