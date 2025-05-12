import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("Puppeteer Endpoints (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/html (GET)", () => {
    it("debería devolver un error 400 cuando no se proporciona URL", () => {
      return request(app.getHttpServer())
        .get("/html")
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("debería devolver un error 400 cuando la URL es inválida", () => {
      return request(app.getHttpServer())
        .get("/html?url=url-invalida")
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("debería devolver HTML cuando la URL es válida", () => {
      // Nota: Este test requiere conexión a internet y un sitio web real
      // Se puede desactivar en entornos CI añadiendo .skip
      return request(app.getHttpServer())
        .get("/html?url=https://example.com")
        .expect(HttpStatus.OK)
        .expect("Content-Type", /text\/html/)
        .expect((res) => {
          expect(res.text).toContain("<html");
        });
    }, 30000); // Aumentamos el timeout para dar tiempo a la carga
  });

  describe("/screenshot (GET)", () => {
    it("debería devolver un error 400 cuando no se proporciona URL", () => {
      return request(app.getHttpServer())
        .get("/screenshot")
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("debería devolver un error 400 cuando la URL es inválida", () => {
      return request(app.getHttpServer())
        .get("/screenshot?url=url-invalida")
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("debería devolver una imagen cuando la URL es válida", () => {
      // Nota: Este test requiere conexión a internet y un sitio web real
      // Se puede desactivar en entornos CI añadiendo .skip
      return request(app.getHttpServer())
        .get("/screenshot?url=https://example.com")
        .expect(HttpStatus.OK)
        .expect("Content-Type", /image\/png/)
        .expect((res) => {
          // Verificar que la respuesta es un buffer de imagen
          expect(res.body).toBeInstanceOf(Buffer);
          expect(Buffer.byteLength(res.body)).toBeGreaterThan(0);
        });
    }, 30000); // Aumentamos el timeout para dar tiempo a la carga

    it("debería aceptar parámetros de ancho y alto", () => {
      return request(app.getHttpServer())
        .get("/screenshot?url=https://example.com&width=800&height=600")
        .expect(HttpStatus.OK)
        .expect("Content-Type", /image\/png/);
    }, 30000);
  });
});
