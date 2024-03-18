import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.slow()
  await page.goto('https://miq-nrw.vercel.app/de');
  await page.locator('div').filter({ hasText: /^Vorfall melden$/ }).getByRole('link').click();
  await page.getByRole('button', { name: 'Los geht’s' }).click();
  await page.getByLabel('Ich melde in Vertretung für die betroffene Person').check();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByPlaceholder('Bitte beschreibe den Vorfall so genau wie möglich.').click();
  await page.getByPlaceholder('Bitte beschreibe den Vorfall so genau wie möglich.').fill('kdjmds jkfkfkf kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByRole('gridcell', { name: '10' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.locator('#place').check();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('germany');
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByLabel('Sexuelle Orientierung').check();
  await page.getByLabel('Anderes, und zwar').check();
  await page.getByRole('textbox').fill('hello');
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByLabel('Lesbenfeindlichkeit').check();
  await page.getByLabel('Bi+feindlichkeit').check();
  await page.getByLabel('Queerfeindlichkeit allgemein').check();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByLabel('inter*').check();
  await page.locator('#gender8').check();
  await page.getByRole('textbox').fill('hello john');
  await page.locator('#sexualOrientation5').check();
  await page.locator('#sexualOrientation12').check();
  await page.locator('input[name="sexualOrientationFreeField"]').fill('john');
  await page.getByLabel('41 - 65 Jahre').check();
  await page.getByLabel('Ich willige ein, dass meine Eingaben im Falle von Mehrfachdiskriminierung anonymisiert mit den zuständigen Meldestellen (Hyperlink zu Auflistung) geteilt werden.').check();
  await page.getByLabel('Hiermit bestätige ich die Richtigkeit meiner Angaben, die Kenntnisnahme der Datenschutzbestimmungen (Hyperlink Datenschutzkonzept) und dass ich den darin beschriebenen Verarbeitungen meiner personenbezogenen Daten zustimme.*').check();
  await page.getByRole('button', { name: 'Meldung abschicken' }).click();
  await page.getByRole('button', { name: 'Verweisberatung' }).click();
});