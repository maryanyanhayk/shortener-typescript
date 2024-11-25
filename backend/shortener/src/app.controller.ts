import { Body, Controller, Get, Param, Post, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { map, Observable, of } from 'rxjs';
import { Response } from 'express';
import * as path from 'path';
import axios from 'axios';


interface ShortenResponse {
  shortUrl: string;
}

interface ErrorResponse {
  error: string;
  code: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shorten')
  shorten(
    @Body('url') url: string,
  ): Observable<ShortenResponse | ErrorResponse> {
    if (!url) {
      return of({
        error: `No URL provided. Please provide in the body. E.g. {'url':'https://google.com'}`,
        code: 400,
      });
    }
    return this.appService
      .shorten(url)
      .pipe(map((shortUrl) => ({ shortUrl })));
  }

  @Get(':hash')
  async retrieveAndProxy(
    @Param('hash') hash: string,
    @Res() res: Response,
  ): Promise<void> {
    try {      
      const originalUrl = await this.appService.retrieve(hash).toPromise();

      if (originalUrl) {        
        const response = await axios.get(originalUrl, {
          responseType: 'stream', 
        });
        
        res.set({
          'Content-Type': response.headers['content-type'],
          'Cache-Control': response.headers['cache-control'] || 'no-cache',
        });
        
        response.data.pipe(res);
      } else {        
        res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'));
      }
    } catch (error) {
      console.error(`Error proxying hash: ${hash}`, error);
      // Handle server errors
      res.status(500).send('Internal Server Error');
    }
  }
}
