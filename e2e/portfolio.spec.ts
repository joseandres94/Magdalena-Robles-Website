import { expect, test } from '@playwright/test';

test('recorre la colección y abre una ficha compartible', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Magdalena Robles' })).toBeVisible();
  await page.getByRole('link', { name: 'Ver Colección' }).click();
  await expect(page).toHaveURL(/\/collection$/);

  await page.getByRole('button', { name: /Vista rápida: Look 1/ }).click();
  await expect(page.getByRole('dialog', { name: 'Look 1 — Pedrolino' })).toBeVisible();
  await page.getByRole('link', { name: /Ver ficha completa/ }).click();

  await expect(page).toHaveURL(/\/collection\/pedrolino$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Pedrolino' })).toBeVisible();
});

test('cambia el idioma y conserva la preferencia', async ({ page }) => {
  await page.goto('/');
  const desktopLanguageToggle = page.getByRole('button', { name: 'Switch language to English' });
  if (await desktopLanguageToggle.isVisible()) {
    await desktopLanguageToggle.click();
  } else {
    const menuButton = page.getByRole('button', { name: 'Abrir menú' });
    await menuButton.focus();
    await menuButton.press('Enter');
    const mobileLanguageToggle = page.getByRole('button', { name: 'EN', exact: true });
    await mobileLanguageToggle.focus();
    await mobileLanguageToggle.press('Enter');
  }

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('link', { name: /Explore the full collection/ })).toBeVisible();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('valida el formulario de contacto y enlaza privacidad', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /^Enviar/ }).click();

  await expect(page.getByText('Nombre requerido')).toBeVisible();
  await page.getByRole('link', { name: 'política de privacidad' }).click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Política de privacidad' }),
  ).toBeVisible();
});
