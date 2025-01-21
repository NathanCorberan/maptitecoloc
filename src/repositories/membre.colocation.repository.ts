import { Repository } from "typeorm";
import { MembreColocationEntity } from "../databases/mysql/membre.colocation.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { UserEntity } from "../databases/mysql/user.entity";
import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { MembreColocationToCreateInput } from "../types/membre/Inputs";

export class MembreColocationRepository {
  private membreColocationDB: Repository<MembreColocationEntity>;

  constructor() {
    this.membreColocationDB = connectMySQLDB.getRepository(MembreColocationEntity);
  }

    ajouterMembre(membreColocation: MembreColocationToCreateInput): MembreColocationEntity {
        const newMembreColocation = new MembreColocationEntity();
        newMembreColocation.colocation = membreColocation.colocation;
        newMembreColocation.utilisateur = membreColocation.utilisateur;
        newMembreColocation.estActif = membreColocation.estActif;

        return newMembreColocation;
    }
/*
  // Ajouter un membre à une colocation
  async ajouterMembre(colocationId: number, userId: number): Promise<MembreColocationEntity> {
    const colocation = await connectMySQLDB.getRepository(ColocationEntity).findOne({ where: { id: colocationId } });
    const utilisateur = await connectMySQLDB.getRepository(UserEntity).findOne({ where: { id: userId } });

    if (!colocation) {
      throw new Error("Colocation introuvable");
    }
    if (!utilisateur) {
      throw new Error("Utilisateur introuvable");
    }

    const membre = new MembreColocationEntity();
    membre.colocation = colocation;
    membre.utilisateur = utilisateur;

    return this.membreColocationDB.save(membre);
  }
*/
  // Supprimer un membre d'une colocation (uniquement le propriétaire peut effectuer cette action)
  async supprimerMembre(colocationId: number, userId: number, proprietaireId: number): Promise<void> {
    const colocation = await connectMySQLDB.getRepository(ColocationEntity).findOne({
      where: { id: colocationId },
      relations: ["proprietaire"],
    });

    if (!colocation) {
      throw new Error("Colocation introuvable");
    }
    if (colocation.proprietaire.id !== proprietaireId) {
      throw new Error("Seul le propriétaire peut supprimer des membres de cette colocation");
    }

    const membre = await this.membreColocationDB.findOne({
      where: { colocation: { id: colocationId }, utilisateur: { id: userId } },
    });

    if (!membre) {
      throw new Error("Membre introuvable dans cette colocation");
    }

    await this.membreColocationDB.remove(membre);
  }

  // Voir le profil d'un membre dans une colocation
  async voirProfilMembre(colocationId: number, userId: number): Promise<MembreColocationEntity | null> {
    return this.membreColocationDB.findOne({
      where: { colocation: { id: colocationId }, utilisateur: { id: userId } },
      relations: ["utilisateur", "colocation"],
    });
  }

  // Lister tous les membres d'une colocation
  async listerMembres(colocationId: number): Promise<MembreColocationEntity[]> {
    return this.membreColocationDB.find({
      where: { colocation: { id: colocationId } },
      relations: ["utilisateur"],
    });
  }
}
