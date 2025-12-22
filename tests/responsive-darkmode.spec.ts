import { test, expect } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
]

const colorSchemes = ['light', 'dark'] as const

test.describe('반응형 및 다크모드 테스트', () => {
  for (const viewport of viewports) {
    for (const colorScheme of colorSchemes) {
      test(`${viewport.name} (${viewport.width}x${viewport.height}) - ${colorScheme}모드`, async ({
        page,
      }) => {
        // 뷰포트 설정
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        })

        // 컬러 스킴 설정
        await page.emulateMedia({ colorScheme })

        // /blog 페이지로 이동
        await page.goto('/blog')

        // 페이지 로딩 대기
        await page.waitForLoadState('networkidle')

        // 스크린샷 촬영
        await page.screenshot({
          path: `tests/screenshots/blog-${viewport.name}-${colorScheme}.png`,
          fullPage: true,
        })

        // 기본 레이아웃 검증
        const main = page.locator('main')
        await expect(main).toBeVisible()

        // 네비게이션 검증
        const nav = page.locator('nav')
        await expect(nav).toBeVisible()
      })
    }
  }
})
