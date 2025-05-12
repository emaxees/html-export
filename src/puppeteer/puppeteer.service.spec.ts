import { Test, TestingModule } from "@nestjs/testing";
import { PuppeteerService } from "./puppeteer.service";
import * as puppeteer from "puppeteer-core";

// Mock de puppeteer-core
jest.mock("puppeteer-core", () => ({
  launch: jest.fn(),
}));

// Mock de chrome-aws-lambda
jest.mock("chrome-aws-lambda", () => ({
  args: ["--arg1", "--arg2"],
  executablePath: "ruta/simulada/chrome",
  headless: true,
}));

describe("PuppeteerService", () => {
  let service: PuppeteerService;
  let mockBrowser: any;
  let mockPage: any;

  beforeEach(async () => {
    // Configurar mocks para browser y page
    mockPage = {
      goto: jest.fn().mockResolvedValue(null),
      setViewport: jest.fn().mockResolvedValue(null),
      content: jest
        .fn()
        .mockResolvedValue("<html><body>Contenido de prueba</body></html>"),
      screenshot: jest.fn().mockResolvedValue(Buffer.from("imagen-simulada")),
    };

    mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
    };

    // Configurar el mock de launch para devolver el browser simulado
    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppeteerService],
    }).compile();

    service = module.get<PuppeteerService>(PuppeteerService);
    
    // Sobrescribir el método getPage para evitar la inicialización real
    jest.spyOn(service as any, "getPage").mockResolvedValue(mockPage);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getContent", () => {
    it("debería obtener el contenido HTML de una URL", async () => {
      const url = "https://ejemplo.com";
      const result = await service.getContent(url);
      
      expect(mockPage.goto).toHaveBeenCalledWith(url);
      expect(mockPage.setViewport).toHaveBeenCalled();
      expect(mockPage.content).toHaveBeenCalled();
      expect(result).toBe("<html><body>Contenido de prueba</body></html>");
    });
  });

  describe("getScreenshot", () => {
    it("debería obtener una captura de pantalla con dimensiones predeterminadas", async () => {
      const url = "https://ejemplo.com";
      const result = await service.getScreenshot(url);
      
      expect(mockPage.goto).toHaveBeenCalledWith(url);
      expect(mockPage.setViewport).toHaveBeenCalledWith({
        width: 1280,
        height: 720,
        deviceScaleFactor: 2,
      });
      expect(mockPage.screenshot).toHaveBeenCalled();
      expect(result).toEqual(Buffer.from("imagen-simulada"));
    });

    it("debería obtener una captura de pantalla con dimensiones personalizadas", async () => {
      const url = "https://ejemplo.com";
      const width = 800;
      const height = 600;
      const result = await service.getScreenshot(url, width, height);
      
      expect(mockPage.goto).toHaveBeenCalledWith(url);
      expect(mockPage.setViewport).toHaveBeenCalledWith({
        width: 800,
        height: 600,
        deviceScaleFactor: 2,
      });
      expect(mockPage.screenshot).toHaveBeenCalled();
      expect(result).toEqual(Buffer.from("imagen-simulada"));
    });
  });
});