import { Request, Response } from "express";
import { ChargesService } from "../services/charges.service";
import { ChargeToCreateDTO } from "../types/charge/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ChargePresenter } from "../types/charge/presenters";

const chargesService = new ChargesService();

export async function createCharge(req: Request, res: Response) {
    try{
        const chargeToCreateDTO = plainToInstance(ChargeToCreateDTO, req.body, { excludeExtraneousValues: true });

        const dtoErrors = await validate(chargeToCreateDTO);
        if (dtoErrors.length > 0) {
            const errorMessages = dtoErrors.map((error) => error.constraints);
            res.status(400).json({ errors: errorMessages });
            return;
        }
        const charge = await chargesService.createCharge(req.body);
        //await historiquesService.createHistorique(colocation.proprietaire.id, "Création de la colocation");

        const createdCharge = plainToInstance(ChargePresenter, charge, { excludeExtraneousValues: true });
        res.status(201).json(createdCharge);
    }
    catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

export async function createChargePartiel(req: Request, res: Response) {
    try {
        const chargeToCreateDTO = plainToInstance(ChargeToCreateDTO, req.body, { excludeExtraneousValues: true });

        const dtoErrors = await validate(chargeToCreateDTO);
        if (dtoErrors.length > 0) {
            const errorMessages = dtoErrors.map((error) => error.constraints);
            res.status(400).json({ errors: errorMessages });
            return;
        }

        // Passer payeMembre directement depuis req.body (sans besoin de le mettre dans le DTO)
        const charge = await chargesService.createChargePartiel(req.body, req.body.PayeMembre);

        const createdCharge = plainToInstance(ChargePresenter, charge, { excludeExtraneousValues: true });
        res.status(201).json(createdCharge);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}



