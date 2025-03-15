import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config from './configs/config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const proxyFilter = (pathname: string, req: any) => {

	    if (pathname.includes('dishImages')) {
			return false;
		}
	
		return !pathname?.match(/^\/(backend)/gi) && req.method === 'GET';
	};


	app.use(
		'/',
		createProxyMiddleware(proxyFilter, {
			target: config().appUIUrl,
			changeOrigin: true,
			ws: true
		})
	);

		// Middleware для статических файлов, который исключает изображения из прокси
	app.use('/dishImages', (req, res, next) => {
		if (req.method === 'GET' && !req.url.includes('.webp')) {
		  return next(); // Пропустить запросы к изображениям
		}
		express.static('src/dishImages')(req, res, next); // Иначе обрабатываем статические файлы
	  });
	

  app.setGlobalPrefix('/backend');
  app.use('/dishImages', express.static('src/dishImages'));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
