import { Tag } from "./tag";

export interface Player {
    id: string;
    uid: string;
    teamId: string;
    seasonId: string;
    firstname: string;
    lastname: string;
    jerseyNumber?: number;
    position: string;
    strengths: Tag[];
    weaknesses: Tag[];
    improvements: Tag[];
}
