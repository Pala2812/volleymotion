import { Controller, Get, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get('reset-password')
  async sendPasswordResetMail(
    @Req() request: Request,
    @Res() response: Response
  ) {
    try {
      const { email } = request.body;
      await this.auth.getPasswordResetMail(email);
      response.status(200).send();
    } catch (e) {
      response.status(500).send(e);
    }
  }
}
