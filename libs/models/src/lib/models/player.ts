import { Tag } from "./tag";

export interface Player {
    uid: string;
    teamId: string;
    id: string;
    firstname: string;
    lastname: string;
    position: string;
    strongIn: Tag[];
    weakIn: Tag[];
    improveIn: Tag[];
}