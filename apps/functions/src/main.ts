import * as admin from 'firebase-admin';
import { onAccountCreate } from './triggers/on-account-create';
import { onAccountDelete } from './triggers/on-account-delete';
import { onCommentCreate } from './triggers/on-comment-create';

admin.initializeApp();

exports.onAccountCreate = onAccountCreate;
exports.onAccountDelete = onAccountDelete;
exports.onCommentCreate = onCommentCreate;
