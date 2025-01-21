import { ChargeEntity } from "../databases/mysql/charge.entity";
import ColocationEntity from "../databases/mysql/colocation.entity";
import { ChargesRepository } from '../repositories/charges.repository';
import { ChargeToCreateDTO } from '../types/charge/dtos';
import { ChargeToCreateInput } from "../types/charge/Inputs";
import { ColocationRepository } from '../repositories/colocation.repository';
import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../databases/mysql/user.entity";

export class ChargesService {
    private chargesRepository = new ChargesRepository();
    private colocationsRepository = new ColocationRepository();
    private usersRepository = new UserRepository();

    async createCharge(chargeToCreate: ChargeToCreateDTO): Promise<ChargeEntity> {

        const existingColocation: ColocationEntity | null = await this.colocationsRepository.findOne(chargeToCreate.colocation);
        if (!existingColocation) {
            throw new Error("La colocation n'existe pas.");
        }

        const existingUser: UserEntity | null = await this.usersRepository.findById(chargeToCreate.payePar);
        if (!existingUser) {
            throw new Error("L'utilisateur n'existe pas.");
        }

        const chargeInput: ChargeToCreateInput = {
            description: chargeToCreate.description,
            montant: chargeToCreate.montant,
            colocation: existingColocation,
            payePar: existingUser
        }

        const newCharge = this.chargesRepository.create(chargeInput);
        const savedCharge = await this.chargesRepository.save(newCharge);
        return savedCharge;
    }
}