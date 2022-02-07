import { Tag } from '@volleymotion/models';
import { Timestamp } from 'firebase/firestore';

export interface Article {
  id: string;
  uid: string;
  author: {
    firstname: string;
    lastname: string;
  };
  sportType: string;
  tagIds: string[];
  tags: Tag[];
  createdAt: Timestamp;
  title: string;
  description: string;
  summary: string;
}
