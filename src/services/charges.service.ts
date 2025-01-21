import { ChargeEntity } from "../databases/mysql/charge.entity";
import { ChargesRepository } from '../repositories/charges.repository';
import { ChargeToCreateDTO } from '../types/charge/dtos';

export class ChargesService {
    private chargesRepository = new ChargesRepository();

    /*async createCharge(chargeToCreate: ChargeToCreateDTO): Promise<ChargeEntity> {
        const newCharge = this.chargesRepository.create(chargeToCreate);
        const savedCharge = await this.chargesRepository.save(newCharge);
        return savedCharge;
    }*/
}