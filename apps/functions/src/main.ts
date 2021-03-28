import * as admin from 'firebase-admin';

import { onAccountCreate } from './triggers/on-account-create';
import { onAccountDelete } from './triggers/on-account-delete';
import { onMatchCreate } from './triggers/on-match-create';
import { onTeamCreate } from './triggers/on-team-create';
import { onTeamDelete } from './triggers/on-team-delete';
import { onPlayerCreate } from './triggers/on-player-create';
import { onPlayerDelete } from './triggers/on-player-delete';
import { onSeasonEdit } from './triggers/on-season-edit';
import { onMatchUpdate } from './triggers/on-match-update';
import { onMatchDelete } from './triggers/on-match-delete';

admin.initializeApp();

exports.onAccountCreate = onAccountCreate;
exports.onAccountDelete = onAccountDelete;
exports.onMatchCreate = onMatchCreate;
exports.onTeamCreate = onTeamCreate;
exports.onTeamDelete = onTeamDelete;
exports.onPlayerCreate = onPlayerCreate;
exports.onPlayerDelete = onPlayerDelete;
exports.onSeasonEdit = onSeasonEdit;
exports.onMatchUpdate = onMatchUpdate;
exports.onMatchDelete = onMatchDelete;