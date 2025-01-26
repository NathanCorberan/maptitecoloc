import MembreColocationEntity from "../databases/mysql/membre.colocation.entity";
import UserEntity from "../databases/mysql/user.entity";
import { ColocationRepository } from "../repositories/colocation.repository";
import { MembreColocationRepository } from "../repositories/membre.colocation.repository";
import { UserRepository } from "../repositories/user.repository";
import { MembreColocationToCreateDTO } from "../types/membre/dtos";
import { MembreColocationToCreateInput } from "../types/membre/Inputs";
import { CustomError } from "../utils/customError";

export class MembreColocationService {
    private membreColocationRepository = new MembreColocationRepository();
    private userRepository = new UserRepository();
    private colocationRepository = new ColocationRepository();

    async createMembreColocation(idUserColoc: number, membreColocationToCreate: MembreColocationToCreateDTO): Promise<MembreColocationEntity> {
        const adminUserColoc = await this.colocationRepository.findAllColocations(idUserColoc);
        if (!adminUserColoc) {
          throw new CustomError("No colocation found for this user", "A0001", "COLOCATION_NOT_FOUND");
        }
    
        const existingUser = await this.userRepository.findById(membreColocationToCreate.utilisateur);
        if (!existingUser) {
          throw new CustomError("The user to be added does not exist", "404", "USER_NOT_FOUND");
        }
    
        const existingColocation = await this.colocationRepository.findOne(membreColocationToCreate.colocation);
        if (!existingColocation) {
          throw new CustomError("The specified colocation does not exist", "404", "COLOCATION_NOT_FOUND");
        }
    
        const membreColocationInput: MembreColocationToCreateInput = {
          utilisateur: existingUser,
          colocation: existingColocation,
          estActif: membreColocationToCreate.estActif,
        };
    
        const newMembreColocation = this.membreColocationRepository.ajouterMembre(membreColocationInput);
        return this.membreColocationRepository.save(newMembreColocation);
    }

    async supprimerMembreColocation(idUserColoc: number, idMembre: number, idColocation: number): Promise<MembreColocationEntity> {
        // Vérifier si l'utilisateur est l'admin de la colocation
        const adminUserColoc = await this.colocationRepository.findAllColocations(idUserColoc);
        if (!adminUserColoc || !adminUserColoc.some(coloc => coloc.id === idColocation)) {
            throw new Error("Vous n'êtes pas autorisé à supprimer des membres de cette colocation.");
        }
    
        // Trouver la colocation et vérifier si elle existe
        const colocation = await this.colocationRepository.findOne(idColocation);
        if (!colocation) {
            throw new Error("La colocation spécifiée n'existe pas.");
        }
    
        // Vérifier si le membre existe et fait partie de cette colocation
        const membreColocation = await this.membreColocationRepository.findOne(idColocation, idMembre);
    
        if (!membreColocation) {
            throw new Error("Le membre n'existe pas ou n'est pas actif dans cette colocation.");
        }
    
        // Désactiver le membre
        return this.membreColocationRepository.desactiverMembre(membreColocation);
    }
    
    async voirProfilMembre(idUserColoc: number, idMembre: number, idColocation: number): Promise<MembreColocationEntity> {
        // Vérifiez si l'utilisateur est admin ou membre de cette colocation
        const adminOrMemberColoc = await this.colocationRepository.findAllColocations(idUserColoc);
        if (!adminOrMemberColoc || !adminOrMemberColoc.some(coloc => coloc.id === idColocation)) {
            throw new Error("Vous n'avez pas accès au profil de ce membre.");
        }
    
        // Vérifiez si le membre appartient à la colocation
        const membreColocation = await this.membreColocationRepository.voirProfilMembre(idColocation, idMembre);
        if (!membreColocation) {
            throw new Error("Le membre spécifié n'existe pas dans cette colocation.");
        }
    
        return membreColocation;
    }
    
}