import { Tag } from "./tag";

export interface Player {
    id: string;
    uid: string;
    teamId: string;
    firstname: string;
    lastname: string;
    position: string;
    strongIn: Tag[];
    weakIn: Tag[];
    improveIn: Tag[];
}