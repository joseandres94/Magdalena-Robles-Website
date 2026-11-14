import { expect, test } from '@playwright/test';

test('recorre la colección y abre una ficha compartible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { level: 1, name: 'Magdalena Robles' })).toBeVisible();
  await expect(page.locator('.looks-section .look-name')).toHaveText([
    'Colombina',
    'Pantalone',
    'Arlequín',
    'Pierrot',
  ]);
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
  const banner = page.locator('.collection-banner img');
  await banner.scrollIntoViewIfNeeded();
  await expect(banner).toHaveAttribute('src', 'assets/collection-banner/collection-banner.jpg');
  await expect
    .poll(() => banner.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await page.getByRole('link', { name: 'Ver Colección' }).click();
  await expect(page).toHaveURL(/\/collection$/);

  await page.getByRole('button', { name: /Vista rápida: Look 1/ }).click();
  await expect(page.getByRole('dialog', { name: 'Look 1 — Colombina' })).toBeVisible();
  await page.getByRole('link', { name: /Ver ficha completa/ }).click();

  await expect(page).toHaveURL(/\/collection\/colombina$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Colombina' })).toBeVisible();
});

test('muestra el modal completo en una ventana baja', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Comprobación de ventana de escritorio');
  for (const viewport of [
    { width: 800, height: 600 },
    { width: 1024, height: 500 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/collection', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Vista rápida: Look 1/ }).click();

    const body = await page.locator('.modal-content-body').boundingBox();
    const footer = await page.locator('.modal-content-footer').boundingBox();
    expect(body).not.toBeNull();
    expect(footer).not.toBeNull();
    expect(body!.y + body!.height).toBeLessThanOrEqual(footer!.y + 1);

    await page.getByRole('link', { name: /Ver ficha completa/ }).click();
    await expect(page).toHaveURL(/\/collection\/colombina$/);
  }
});

test('muestra la foto entera y todo el contenido sin scroll en escritorio', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Comprobación de ventana de escritorio');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/collection', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Vista rápida: Look 1/ }).click();

  for (const [index, name] of ['Colombina', 'Pantalone', 'Arlequín', 'Pierrot'].entries()) {
    await expect(page.locator('.modal-name')).toHaveText(name);
    const layout = await page.locator('.modal-inner').evaluate((modal) => {
      const photo = modal.querySelector<HTMLImageElement>('.modal-photo')!;
      const content = modal.querySelector<HTMLElement>('.modal-content')!;
      const backdrop = modal.parentElement!;
      const rect = modal.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        viewportHeight: window.innerHeight,
        photoLoaded: photo.complete && photo.naturalWidth > 0,
        photoFit: getComputedStyle(photo).objectFit,
        contentOverflow: content.scrollHeight - content.clientHeight,
        backdropOverflow: backdrop.scrollHeight - backdrop.clientHeight,
      };
    });

    expect(layout.top).toBeGreaterThanOrEqual(0);
    expect(layout.bottom).toBeLessThanOrEqual(layout.viewportHeight);
    expect(layout.photoLoaded).toBe(true);
    expect(layout.photoFit).toBe('contain');
    expect(layout.contentOverflow).toBeLessThanOrEqual(1);
    expect(layout.backdropOverflow).toBeLessThanOrEqual(1);

    if (index < 3) await page.getByRole('button', { name: 'Look siguiente' }).click();
  }
});

test('cambia el idioma y conserva la preferencia', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
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

  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('valida el formulario de contacto y enlaza privacidad', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'networkidle' });
  await expect(page.getByText('Formulario de muestra. Puedes probarlo')).toBeVisible();
  await page.getByRole('button', { name: /^Probar formulario/ }).click();

  await expect(page.getByText('Nombre requerido')).toBeVisible();
  await page.getByRole('link', { name: 'política de privacidad' }).click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Política de privacidad' }),
  ).toBeVisible();
});
