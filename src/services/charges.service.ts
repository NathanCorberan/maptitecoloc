import { ChargeEntity } from "../databases/mysql/charge.entity";
import ColocationEntity from "../databases/mysql/colocation.entity";
import { ChargesRepository } from '../repositories/charges.repository';
import { ChargeToCreateDTO } from '../types/charge/dtos';
import { ChargeToCreateInput } from "../types/charge/Inputs";
import { ColocationRepository } from '../repositories/colocation.repository';
import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../databases/mysql/user.entity";
import { PartageChargeEntity } from "../databases/mysql/partage.charge.entity";
import { PaiementEntity } from "../databases/mysql/paiements.entity";
import { PartageChargeRepository } from "../repositories/partage.charge.repository";
import { PaiementRepository } from "../repositories/paiements.repository";


export class ChargesService {
    private chargesRepository = new ChargesRepository();
    private colocationsRepository = new ColocationRepository();
    private usersRepository = new UserRepository();
    private partagesRepository = new PartageChargeRepository();
    private paiementsRepository = new PaiementRepository();

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
            payePar: existingUser,
            IsActif: chargeToCreate.IsActif
        }

        const newCharge = this.chargesRepository.create(chargeInput);
        const savedCharge = await this.chargesRepository.save(newCharge);

        // Calcul de la répartition des charges entre les colocataires
        await this.repartirChargeEntreColocs(savedCharge);

        return savedCharge;
    }

    async repartirChargeEntreColocs(charge: ChargeEntity): Promise<void> {
        const colocataires = await this.usersRepository.findByColocation(charge.colocation.id); // Suppose que tu as une méthode pour trouver les colocataires d'une colocation

        let montantTotalPartage = charge.montant;
        // Cas où la charge est partagée entre tous les colocataires
        for (const colocataire of colocataires) {
            const partage = new PartageChargeEntity();
            partage.charge = charge;
            partage.utilisateur = colocataire;
            partage.montantDu = montantTotalPartage / colocataires.length; // Répartition égale, peut être personnalisé selon la logique de partage
            await this.partagesRepository.save(partage); // Sauvegarder le partage dans la base de données

            // Si la charge a été payée par un seul colocataire, nous allons gérer un remboursement automatique.
            if (charge.payePar !== colocataire) {
                const paiement = new PaiementEntity();
                paiement.montant = partage.montantDu;
                paiement.payePar = charge.payePar;
                paiement.rembourseA = colocataire;
                paiement.charge = charge;
                await this.paiementsRepository.save(paiement); 
            }
        }
    }

    async createChargePartiel(chargeToCreate: ChargeToCreateDTO, payeMembre: { idMembre: number, montant: string }[]): Promise<ChargeEntity> {
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
            payePar: existingUser,
            IsActif: chargeToCreate.IsActif
        }
    
        const newCharge = this.chargesRepository.create(chargeInput);
        const savedCharge = await this.chargesRepository.save(newCharge);
    
        // Répartition personnalisée des charges
        await this.repartirChargePartielle(savedCharge, payeMembre);
    
        return savedCharge;
    }
    
    async repartirChargePartielle(charge: ChargeEntity, payeMembre: { idMembre: number, montant: string }[]): Promise<void> {
        // Conversion explicite en nombres flottants
        const montantTotalCharge = parseFloat(charge.montant.toString()); // Assure-toi que charge.montant est un nombre ou chaîne
        const totalMontantReparti = payeMembre.reduce((acc, membre) => acc + parseFloat(membre.montant), 0);
    
        // Vérification de l'égalité des sommes après conversion
        if (totalMontantReparti !== montantTotalCharge) {
            throw new Error("La somme des montants partagés ne correspond pas au montant total de la charge.");
        }
    
        // Répartition des charges entre les membres spécifiés
        for (const membre of payeMembre) {
            const colocataire = await this.usersRepository.findById(membre.idMembre);
            if (!colocataire) {
                throw new Error(`L'utilisateur avec l'id ${membre.idMembre} n'existe pas.`);
            }
    
            // Création du partage de charge pour chaque membre
            const partage = new PartageChargeEntity();
            partage.charge = charge;
            partage.utilisateur = colocataire;
            partage.montantDu = parseFloat(membre.montant); // Assure-toi que le montant est un nombre
            await this.partagesRepository.save(partage);
    
            // Si le payeur n'est pas ce membre, créer un paiement pour chaque remboursement
            if (charge.payePar !== colocataire) {
                const paiement = new PaiementEntity();
                paiement.montant = parseFloat(membre.montant);
                paiement.payePar = charge.payePar;
                paiement.rembourseA = colocataire;
                paiement.charge = charge;
                await this.paiementsRepository.save(paiement);
            }
        }
    }
}
