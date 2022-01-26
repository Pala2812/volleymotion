import { Tag } from '@volleymotion/models';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Article {
    id: string;
    uid: string;
    author: {
        firstname: string,
        lastname: string,
    };
    sportType: string;
    tagIds: string[];
    tags: Tag[];
    createdAt: Timestamp;
    title: string;
    description: string;
    summary: string;
}
