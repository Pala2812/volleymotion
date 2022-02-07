import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

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
import { onTrainingDayCreate } from './triggers/on-training-day-create';
import { onTrainingDayDelete } from './triggers/on-training-day-delete';

import { AppModule } from './app/app.module';

admin.initializeApp();

const server = express();

export const createNestServer = async (expressInstance: any) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  app.useLogger(false);
  app.enableCors({
    origin: true,
  });
  return app.init();
};

createNestServer(server).catch((err) => console.error('Nest broken', err));

export const api = functions.region('europe-west3').https.onRequest(server);

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
exports.onTrainingDayCreate = onTrainingDayCreate;
exports.onTrainingDayDelete = onTrainingDayDelete;
