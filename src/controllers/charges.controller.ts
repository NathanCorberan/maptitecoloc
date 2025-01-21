import { Request, Response } from "express";
import { ChargesService } from "../services/charges.service";

const chargesService = new ChargesService();

export async function createCharge(req: Request, res: Response) {
    try {
        const chargeToCreate = req.body;
        const savedCharge = await chargesService.createCharge(chargeToCreate);
        res.status(201).json(savedCharge);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de la charge");
    }
    
}

