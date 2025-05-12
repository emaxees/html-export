import { Injectable, OnModuleInit } from "@nestjs/common";
import { launch, Page } from "puppeteer-core";
import * as os from "os";

@Injectable()
export class PuppeteerService implements OnModuleInit {
  private page: Page | null = null;

  async onModuleInit() {
    await this.getPage();
  }

  async getPage(): Promise<Page> {
    if (this.page) return this.page;

    const browser = await launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    this.page = await browser.newPage();
    return this.page;
  }

  private getChromePath(): string {
    // Detectar la ruta de Chrome según el sistema operativo
    const platform = os.platform();

    if (platform === "darwin") {
      return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    } else if (platform === "win32") {
      return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    } else {
      return "/usr/bin/google-chrome";
    }
  }

  async getContent(url: string): Promise<string> {
    const page = await this.getPage();
    await page.goto(url);
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
    const content = await page.content();
    return content;
  }

  async getScreenshot(
    url: string,
    width?: number,
    height?: number,
  ): Promise<Buffer> {
    const page = await this.getPage();
    await page.goto(url);
    await page.setViewport({
      width: Number(width) || 1280,
      height: Number(height) || 720,
      deviceScaleFactor: 2,
    });
    const file = await page.screenshot();
    return file as Buffer;
  }
}
