import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { PuppeteerController } from './puppeteer.controller';
import { PuppeteerService } from './puppeteer.service';

describe('PuppeteerController', () => {
  let controller: PuppeteerController;
  let service: PuppeteerService;

  // Mock de respuesta Express
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const mockPuppeteerService = {
      getContent: jest.fn().mockResolvedValue('<html><body>Contenido de prueba</body></html>'),
      getScreenshot: jest.fn().mockResolvedValue(Buffer.from('imagen-simulada')),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppeteerController],
      providers: [
        {
          provide: PuppeteerService,
          useValue: mockPuppeteerService,
        },
      ],
    }).compile();

    controller = module.get<PuppeteerController>(PuppeteerController);
    service = module.get<PuppeteerService>(PuppeteerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHtml', () => {
    it('debería devolver el contenido HTML cuando la URL es válida', async () => {
      const url = 'https://ejemplo.com';
      const res = mockResponse();

      await controller.getHtml(url, res);

      expect(service.getContent).toHaveBeenCalledWith(url);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/html');
      expect(res.setHeader).toHaveBeenCalledWith(
        'Cache-Control',
        'public, immutable, no-transform, s-maxage=86400, max-age=86400',
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith('<html><body>Contenido de prueba</body></html>');
    });

    it('debería lanzar una excepción cuando no se proporciona URL', async () => {
      const res = mockResponse();
      
      await expect(controller.getHtml(undefined, res)).rejects.toThrow();
      expect(service.getContent).not.toHaveBeenCalled();
    });

    it('debería lanzar una excepción cuando la URL es inválida', async () => {
      const url = 'url-invalida';
      const res = mockResponse();
      
      await expect(controller.getHtml(url, res)).rejects.toThrow();
      expect(service.getContent).not.toHaveBeenCalled();
    });

    it('debería manejar errores del servicio', async () => {
      const url = 'https://ejemplo.com';
      const res = mockResponse();
      
      jest.spyOn(service, 'getContent').mockRejectedValueOnce(new Error('Error de servicio'));
      
      await expect(controller.getHtml(url, res)).rejects.toThrow();
    });
  });

  describe('getScreenshot', () => {
    it('debería devolver una captura de pantalla cuando la URL es válida', async () => {
      const url = 'https://ejemplo.com';
      const width = '800';
      const height = '600';
      const res = mockResponse();

      await controller.getScreenshot(url, width, height, res);

      expect(service.getScreenshot).toHaveBeenCalledWith(url, 800, 600);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/png');
      expect(res.setHeader).toHaveBeenCalledWith(
        'Cache-Control',
        'public, immutable, no-transform, s-maxage=86400, max-age=86400',
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(Buffer.from('imagen-simulada'));
    });

    it('debería usar dimensiones predeterminadas cuando no se proporcionan', async () => {
      const url = 'https://ejemplo.com';
      const res = mockResponse();

      await controller.getScreenshot(url, undefined, undefined, res);

      expect(service.getScreenshot).toHaveBeenCalledWith(url, undefined, undefined);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('debería lanzar una excepción cuando no se proporciona URL', async () => {
      const res = mockResponse();
      
      await expect(controller.getScreenshot(undefined, '800', '600', res)).rejects.toThrow();
      expect(service.getScreenshot).not.toHaveBeenCalled();
    });

    it('debería lanzar una excepción cuando la URL es inválida', async () => {
      const url = 'url-invalida';
      const res = mockResponse();
      
      await expect(controller.getScreenshot(url, '800', '600', res)).rejects.toThrow();
      expect(service.getScreenshot).not.toHaveBeenCalled();
    });
  });
});