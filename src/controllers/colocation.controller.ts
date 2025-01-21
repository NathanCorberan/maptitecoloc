import { Request, Response } from "express";
import { ColocationService } from "../services/colocation.service";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocationPresenter } from "../types/colocation/presenters";
import { ColocationBigPresenter } from "../types/colocation/presenter.big";

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
