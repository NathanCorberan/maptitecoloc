import { HistoriqueEntity } from '../databases/mysql/historique.entity';
import { HistoriquesRepository } from '../repositories/historiques.repository';
import { HistoriqueToCreateInput } from '../types/historique/Inputs';
import { UserEntity } from '../databases/mysql/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { HistoriqueToCreateDTO } from '../types/historique/dtos';


export class HistoriquesService {
  private historiqueRepository = new HistoriquesRepository();
  private usersRepository = new UserRepository();


  async createHistorique(idUser:number , action:string): Promise<HistoriqueEntity> {

    const existingUser: UserEntity | null = await this.usersRepository.findById(idUser);
    if (!existingUser) {
        throw new Error("L'utilisateur n'existe pas.");
    }

    const historiqueToCreateInput: HistoriqueToCreateInput = {
        utilisateur: existingUser,
        action: action
    }

    const historique = this.historiqueRepository.create(historiqueToCreateInput);
    const savedHistorique = await this.historiqueRepository.save(historique);

    return savedHistorique;
  }
}

