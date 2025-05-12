import { Injectable, OnModuleInit } from "@nestjs/common";
import { launch, Page } from "puppeteer";
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
