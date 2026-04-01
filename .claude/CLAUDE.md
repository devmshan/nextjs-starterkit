# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui를 활용한 스타터킷.
개발자가 클론하여 복잡한 초기 설정 없이 바로 프로젝트를 시작할 수 있는 템플릿.

## 기술 스택

| 기술 | 버전 | 역할 |
|------|------|------|
| Next.js | 16.2.1 | App Router 기반 프레임워크 |
| React | 19.x | UI 렌더링 |
| TypeScript | 5.x | 정적 타입 검사 |
| Tailwind CSS | v4 | CSS 기반 유틸리티 스타일링 (tailwind.config 없음) |
| shadcn | ^4.1.1 | UI 컴포넌트 소스 생성 도구 (패키지명 `shadcn`, 구 `shadcn-ui` 아님) |
| @base-ui/react | ^1.3.0 | UI 컴포넌트 헤드리스 프리미티브 (Radix UI 대신 사용) |
| next-themes | ^0.4.6 | 다크/라이트 모드 전환 |
| tw-animate-css | ^1.4.0 | Tailwind v4 애니메이션 유틸리티 |
| lucide-react | ^1.7.0 | 아이콘 라이브러리 |

## 개발 환경

```bash
npm install       # 의존성 설치
npm run dev       # 개발 서버: http://localhost:3000
npm run build     # 프로덕션 빌드
npm run lint      # ESLint 검사
```

## 아키텍처

```
app/                    # App Router 라우팅
├── layout.tsx          # 루트 레이아웃 (ThemeProvider, Header, Footer)
├── page.tsx            # 홈 페이지 (랜딩)
└── globals.css         # Tailwind v4 CSS 설정 및 shadcn 테마 토큰

components/
├── ui/                 # shadcn 생성 컴포넌트 (소스코드 직접 소유, Base UI 기반)
├── theme-provider.tsx  # next-themes ThemeProvider 래퍼
├── header.tsx          # 사이트 헤더 (반응형 네비 + 다크모드 토글)
└── footer.tsx          # 사이트 푸터

lib/
└── utils.ts            # cn() 유틸리티 함수 (clsx + tailwind-merge)
```

경로 별칭: `@/*` → 프로젝트 루트 (`./`)

## @base-ui/react 핵심 차이점

`components/ui/` 내 컴포넌트들은 Radix UI가 아닌 `@base-ui/react`를 프리미티브로 사용한다.
**가장 중요한 API 차이**: `asChild` 패턴 없음 — 커스텀 트리거는 `render` prop으로 지정한다.

```tsx
// Radix UI 방식 (이 프로젝트에서 사용 불가)
<SheetTrigger asChild><Button /></SheetTrigger>

// Base UI 방식 (올바른 사용법)
<SheetTrigger render={<Button />}>내용</SheetTrigger>
```

## Tailwind CSS v4 핵심 차이점

- `tailwind.config` 파일 없음 — 커스텀 테마 토큰은 `globals.css`의 `@theme inline` 블록에서 관리
- CSS 임포트: `@import "tailwindcss"` (v3의 `@tailwind` 디렉티브 대체)
- PostCSS 플러그인: `@tailwindcss/postcss` (`postcss.config.mjs`)
- 테마 컬러: OKLCh 색상 공간 사용 (`oklch(...)`)
- 애니메이션: `@import "tw-animate-css"` via `globals.css`

## shadcn 컴포넌트 추가

```bash
npx shadcn@latest add [컴포넌트명]
```

추가된 컴포넌트는 `components/ui/`에 소스코드로 생성되며, Base UI 기반으로 재작성되어 있으므로 공식 shadcn 문서의 Radix UI 예제와 API가 다를 수 있다.

## next-themes 설정 주의

`<html>` 태그에 `suppressHydrationWarning`이 필수다 (`app/layout.tsx` 참고).
ThemeProvider는 `attribute='class'`로 설정되어 `.dark` 클래스로 테마를 전환한다.

## 코딩 컨벤션

- **주석**: 한국어로 작성
- **변수명/함수명**: camelCase (영어)
- **들여쓰기**: 스페이스 2칸
- **따옴표**: 작은따옴표(`''`) 사용
- **커밋 메시지**: 한국어
