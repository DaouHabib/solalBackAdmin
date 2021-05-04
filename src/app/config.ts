import { environment } from '../environments/environment';

export const APIS: { [ prop: string ]: string } = {
    AUTH: `${environment.BaseURL}/auth`,
    USERS: `${environment.BaseURL}/users`,
    CHAMPS: `${environment.BaseURL}/champ`,
    ENTREPRISE:`${environment.BaseURL}/entreprise`,
    CRON: `${environment.BaseURL}/cron`,
    SUBSCRIBE: `${environment.BaseURL}/subscribe`,
    PRODUIT: `${environment.BaseURL}/product`,
    PROJET: `${environment.BaseURL}/projet`,
    MARKER: `${environment.BaseURL}/marker`,
    ACTION: `${environment.BaseURL}/action`,

    
};

