export class StatFeedQuestion{

    id_question!:number;
    description!:string;
    nbr!:number;
}

export class StatFeedReponse{

    reponse!:string;
    id_rep!:number;
    nbr!:number;
}

export class StatFeed{

    id_part!:number;
    dateDebut!:any;
    dateFin!:any;
}

export class StatFeedRep{
    id_question!:number;
    id_part!:number;
    dateDebut!:any;
    dateFin!:any;
}