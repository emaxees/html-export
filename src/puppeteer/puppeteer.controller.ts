import { Controller, Get, Query, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PuppeteerService } from './puppeteer.service';

@Controller()
export class PuppeteerController {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  @Get('html')
  async getHtml(
    @Query('url') url: string,
    @Res() res: Response,
  ) {
    if (!url) {
      throw new HttpException('No url query specified.', HttpStatus.BAD_REQUEST);
    }

    if (!this.checkUrl(url)) {
      throw new HttpException('Invalid url query specified.', HttpStatus.BAD_REQUEST);
    }

    try {
      const content = await this.puppeteerService.getContent(url);
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=86400, max-age=86400');
      res.status(HttpStatus.OK).send(content);
    } catch (error) {
      throw new HttpException(
        'The server encountered an error. You may have inputted an invalid query.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('screenshot')
  async getScreenshot(
    @Query('url') url: string,
    @Query('width') width: string,
    @Query('height') height: string,
    @Res() res: Response,
  ) {
    if (!url) {
      throw new HttpException('No url query specified.', HttpStatus.BAD_REQUEST);
    }

    if (!this.checkUrl(url)) {
      throw new HttpException('Invalid url query specified.', HttpStatus.BAD_REQUEST);
    }

    try {
      const screenshot = await this.puppeteerService.getScreenshot(
        url,
        width ? parseInt(width) : undefined,
        height ? parseInt(height) : undefined,
      );
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=86400, max-age=86400');
      res.status(HttpStatus.OK).send(screenshot);
    } catch (error) {
      throw new HttpException(
        'The server encountered an error. You may have inputted an invalid query.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private checkUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
}