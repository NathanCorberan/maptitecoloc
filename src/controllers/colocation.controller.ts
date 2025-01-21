import { Request, Response } from "express";
import { ColocationService } from "../services/colocation.service";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocationPresenter } from "../types/colocation/presenters";

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