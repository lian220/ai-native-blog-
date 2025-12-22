import { test, expect } from '@playwright/test'

test.describe('블로그 네비게이션 E2E 테스트', () => {
  test.describe('1. 홈페이지 접속 및 기본 요소 확인', () => {
    test('홈페이지가 정상적으로 로드되어야 한다', async ({ page }) => {
      await page.goto('/')

      // 페이지 타이틀 확인
      await expect(page).toHaveTitle(/Next.js Portfolio Starter/)
    })

    test('메인 제목이 표시되어야 한다', async ({ page }) => {
      await page.goto('/')

      const heading = page.getByRole('heading', { name: 'My Portfolio', level: 1 })
      await expect(heading).toBeVisible()
    })

    test('네비게이션 링크가 모두 표시되어야 한다', async ({ page }) => {
      await page.goto('/')

      // 네비게이션 요소 확인
      const nav = page.getByRole('navigation')
      await expect(nav).toBeVisible()

      // 각 링크 확인
      await expect(page.getByRole('link', { name: 'home' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'blog' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'deploy' })).toBeVisible()
    })

    test('홈페이지에 블로그 포스트 목록이 표시되어야 한다', async ({ page }) => {
      await page.goto('/')

      // 블로그 포스트 링크가 존재하는지 확인
      const blogLinks = page.locator('a[href^="/blog/"]')
      await expect(blogLinks.first()).toBeVisible()

      // 최소 1개 이상의 포스트가 있어야 함
      const count = await blogLinks.count()
      expect(count).toBeGreaterThan(0)
    })

    test('푸터가 표시되어야 한다', async ({ page }) => {
      await page.goto('/')

      // 푸터 링크들 확인
      await expect(page.getByRole('link', { name: 'rss' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'github' })).toBeVisible()

      // 저작권 텍스트 확인
      await expect(page.getByText('MIT Licensed')).toBeVisible()
    })
  })

  test.describe('2. 블로그 목록 페이지에서 포스트 확인', () => {
    test('블로그 페이지로 네비게이션이 동작해야 한다', async ({ page }) => {
      await page.goto('/')

      // blog 링크 클릭
      await page.getByRole('link', { name: 'blog' }).click()

      // URL 확인
      await expect(page).toHaveURL('/blog')
    })

    test('블로그 페이지 제목이 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog')

      const heading = page.getByRole('heading', { name: 'My Blog', level: 1 })
      await expect(heading).toBeVisible()
    })

    test('블로그 페이지 타이틀이 올바르게 설정되어야 한다', async ({ page }) => {
      await page.goto('/blog')

      await expect(page).toHaveTitle(/Blog/)
    })

    test('블로그 포스트 목록이 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog')

      // 포스트 링크들 확인
      const postLinks = page.locator('a[href^="/blog/"]')
      const count = await postLinks.count()

      // 최소 1개 이상의 포스트가 있어야 함
      expect(count).toBeGreaterThan(0)
    })

    test('각 포스트에 날짜와 제목이 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog')

      // 첫 번째 포스트 링크 확인
      const firstPost = page.locator('a[href^="/blog/"]').first()
      await expect(firstPost).toBeVisible()

      // 날짜 형식 확인 (예: "April 9, 2024")
      const datePattern = /\w+ \d{1,2}, \d{4}/
      const postText = await firstPost.textContent()
      expect(postText).toMatch(datePattern)
    })

    test('특정 블로그 포스트가 목록에 있어야 한다', async ({ page }) => {
      await page.goto('/blog')

      // Vim 관련 포스트 확인
      await expect(page.getByText('Embracing Vim')).toBeVisible()

      // Spaces vs. Tabs 포스트 확인
      await expect(page.getByText('Spaces vs. Tabs')).toBeVisible()

      // Static Typing 포스트 확인
      await expect(page.getByText('Static Typing')).toBeVisible()
    })
  })

  test.describe('3. 개별 블로그 포스트 페이지 접근 및 콘텐츠 확인', () => {
    test('블로그 목록에서 포스트를 클릭하면 해당 포스트 페이지로 이동해야 한다', async ({ page }) => {
      await page.goto('/blog')

      // Vim 포스트 클릭
      await page.getByRole('link', { name: /Embracing Vim/ }).click()

      // URL 확인
      await expect(page).toHaveURL('/blog/vim')
    })

    test('포스트 페이지에 제목이 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      const heading = page.getByRole('heading', {
        name: /Embracing Vim.*Code Editors/,
        level: 1,
      })
      await expect(heading).toBeVisible()
    })

    test('포스트 페이지 타이틀이 올바르게 설정되어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      await expect(page).toHaveTitle(/Embracing Vim/)
    })

    test('포스트에 발행일이 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      // 날짜 확인
      await expect(page.getByText('April 9, 2024')).toBeVisible()
    })

    test('포스트 본문 콘텐츠가 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      // article 요소 확인
      const article = page.getByRole('article')
      await expect(article).toBeVisible()

      // 본문 내용 일부 확인
      await expect(page.getByText('software development')).toBeVisible()
      await expect(page.getByText('Vim stands out as a timeless classic')).toBeVisible()
    })

    test('포스트에 섹션 제목들이 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      // h2 섹션 제목들 확인
      await expect(page.getByRole('heading', { name: 'Efficiency and Speed', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Highly Customizable', level: 2 })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Conclusion', level: 2 })).toBeVisible()
    })

    test('좋아요 버튼이 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      const likeButton = page.getByRole('button', { name: /좋아요/ })
      await expect(likeButton).toBeVisible()
    })

    test('작성자 프로필이 표시되어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      // 작성자 이름 확인
      await expect(page.getByRole('heading', { name: /Author Name/, level: 3 })).toBeVisible()

      // 작성자 소개 확인
      await expect(page.getByText('개발과 기술에 관심이 많은 블로거입니다')).toBeVisible()
    })

    test('다른 포스트 페이지도 정상적으로 접근 가능해야 한다', async ({ page }) => {
      // Spaces vs. Tabs 포스트 확인
      await page.goto('/blog/spaces-vs-tabs')
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Spaces vs. Tabs')

      // Static Typing 포스트 확인
      await page.goto('/blog/static-typing')
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Static Typing')
    })

    test('포스트 페이지에서 홈으로 돌아갈 수 있어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      // home 링크 클릭
      await page.getByRole('link', { name: 'home' }).click()

      // 홈페이지 확인
      await expect(page).toHaveURL('/')
      await expect(page.getByRole('heading', { name: 'My Portfolio' })).toBeVisible()
    })

    test('포스트 페이지에서 블로그 목록으로 돌아갈 수 있어야 한다', async ({ page }) => {
      await page.goto('/blog/vim')

      // blog 링크 클릭
      await page.getByRole('link', { name: 'blog' }).click()

      // 블로그 목록 페이지 확인
      await expect(page).toHaveURL('/blog')
      await expect(page.getByRole('heading', { name: 'My Blog' })).toBeVisible()
    })
  })
})
