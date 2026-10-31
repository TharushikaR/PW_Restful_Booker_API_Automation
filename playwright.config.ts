import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const timeNow = new Date();
const timePad = (n: number) => String(n).padStart(2, "0");
const timeStamp = `${timeNow.getFullYear()}_${timePad(timeNow.getMonth() + 1)}_${timePad(timeNow.getDate())}_${timePad(timeNow.getHours())}_${timePad(timeNow.getMinutes())}_${timePad(timeNow.getSeconds())}`;


export default defineConfig({
  testDir: './tests',
  outputDir: '/test-results',
  maxFailures:0,
  timeout:60*1000,
  expect:{timeout:70000},
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter:  [
    ["list"],
    [
      "html",
      { outputFolder: `Reports/html_report_${timeStamp}`, open: "never" },
    ],
  ],
  use: {
    baseURL:
      process.env.BASE_URL || "https://restful-booker.herokuapp.com",
      extraHTTPHeaders:{'Content-Type': 'application/json', 'Accept': 'application/json'},
    trace: 'retain-on-failure-and-retries',
    screenshot: 'only-on-failure',
    locale: "en-US",
    timezoneId: "America/New_York",
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});
