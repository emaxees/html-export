<p align="center">
  <h1 align="center">HTML Export NestJS</h1>
</p>

<p align="center">
  API moderna desarrollada con NestJS para obtener el contenido HTML de sitios web utilizando Puppeteer.
  Este proyecto es una versión actualizada y mejorada del proyecto original "Getwebsource".
</p>

## Descripción

Esta aplicación proporciona una API RESTful para obtener el contenido HTML y capturas de pantalla de sitios web utilizando Puppeteer y NestJS.

## Características

- Arquitectura modular basada en NestJS
- Captura de contenido HTML de sitios web
- Captura de screenshots de sitios web
- Configuración lista para despliegue en Render.com
- Soporte para CORS

## Instalación

```bash
# Instalar dependencias
npm install
```

## Ejecución

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
```

La aplicación estará disponible en `http://localhost:3000`

## Endpoints API

### Obtener contenido HTML

```
GET /api/html?url=https://ejemplo.com
```

Parámetros:
- `url`: URL del sitio web del que se desea obtener el contenido HTML (obligatorio)

### Obtener screenshot

```
GET /api/screenshot?url=https://ejemplo.com&width=1280&height=720
```

Parámetros:
- `url`: URL del sitio web del que se desea obtener el screenshot (obligatorio)
- `width`: Ancho del screenshot en píxeles (opcional, predeterminado: 1280)
- `height`: Alto del screenshot en píxeles (opcional, predeterminado: 720)

## Despliegue en Render.com

Este proyecto incluye un archivo `render.yaml` que facilita el despliegue en Render.com:

1. Crea una cuenta en [Render.com](https://render.com) si aún no tienes una
2. Conecta tu repositorio de GitHub/GitLab/Bitbucket
3. Haz clic en "New Web Service"
4. Selecciona tu repositorio
5. Render detectará automáticamente la configuración del archivo `render.yaml`
6. Haz clic en "Create Web Service"

## Pruebas

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
