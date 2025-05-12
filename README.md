<p align="center">
  <h1 align="center">HTML Export NestJS</h1>
</p>

<p align="center">
  API moderna desarrollada con NestJS para obtener el contenido HTML de sitios web utilizando Puppeteer.
  Este proyecto es una versión actualizada y mejorada del proyecto original "Getwebsource".
</p>

## Description

This application provides a RESTful API to get HTML content and screenshots from websites using Puppeteer and NestJS.

## Features

- Modular architecture based on NestJS
- HTML content capture from websites
- Website screenshots capture
- Ready configuration for deployment on Render.com
- CORS support

## Installation

```bash
# Install dependencies
npm install
```

## Execution

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The application will be available at `http://localhost:3000`

## Endpoints API

### Get HTML content

```
GET /api/html?url=https://example.com
```

Parameters:
- `url`: Website URL from which to get HTML content (required)

### Get screenshot

```
GET /api/screenshot?url=https://example.com&width=1280&height=720
```

Parameters:
- `url`: Website URL from which to get screenshot (required)
- `width`: Screenshot width in pixels (optional, default: 1280)
- `height`: Screenshot height in pixels (optional, default: 720)

## Deployment on Render.com

This project includes a `render.yaml` file that makes deployment to Render.com easier:

1. Create an account at [Render.com](https://render.com) if you don't have one
2. Connect your GitHub/GitLab/Bitbucket repository
3. Click on "New Web Service"
4. Select your repository
5. Render will automatically detect the configuration from the `render.yaml` file
6. Click on "Create Web Service"

## Testing

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
