import { Request, Response } from "express";
import { ChargesService } from "../services/charges.service";

const ChargeService = new ChargesService();

export const addCharge = async (req: Request, res: Response): Promise<void> => {
    try {
        
    }