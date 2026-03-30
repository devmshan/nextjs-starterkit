# CLAUDE.md

## 프로젝트 개요

Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui를 활용한 스타터킷.
개발자가 클론하여 복잡한 초기 설정 없이 바로 프로젝트를 시작할 수 있는 템플릿.

## 기술 스택

| 기술 | 버전 | 역할 |
|------|------|------|
| Next.js | 16 (latest) | App Router 기반 프레임워크, Turbopack 번들러 |
| TypeScript | 5.x | 정적 타입 검사 |
| Tailwind CSS | v4 | CSS 기반 유틸리티 스타일링 (tailwind.config 없음) |
| shadcn/ui | latest | 재사용 가능한 UI 컴포넌트 |
| lucide-react | latest | 아이콘 라이브러리 |
| next-themes | latest | 다크/라이트 모드 전환 |

## 개발 환경

```bash
npm install       # 의존성 설치
npm run dev       # 개발 서버: http://localhost:3000 (Turbopack 사용)
npm run build     # 프로덕션 빌드
npm run start     # 프로덕션 서버 실행
npm run lint      # ESLint 검사
```

## 아키텍처

```
app/                    # App Router 라우팅
├── layout.tsx          # 루트 레이아웃 (ThemeProvider, Header, Footer)
├── page.tsx            # 홈 페이지 (랜딩)
└── globals.css         # Tailwind v4 CSS 설정 및 shadcn 테마

components/
├── ui/                 # shadcn/ui 컴포넌트 (소스코드 직접 소유)
├── theme-provider.tsx  # next-themes ThemeProvider 래퍼
├── header.tsx          # 사이트 헤더 (반응형 네비 + 다크모드 토글)
└── footer.tsx          # 사이트 푸터

lib/
└── utils.ts            # cn() 유틸리티 함수 (clsx + tailwind-merge)
```

## Tailwind CSS v4 핵심 차이점

- `tailwind.config` 파일 없음 — 설정은 `globals.css`의 `@theme inline` 블록에서 관리
- CSS 임포트: `@import "tailwindcss"` (v3의 `@tailwind` 디렉티브 대체)
- PostCSS 플러그인: `@tailwindcss/postcss` (postcss.config.mjs)
- 컬러: OKLCh 색상 공간 사용

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [컴포넌트명]
# 예시
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add table
```

## 코딩 컨벤션

- **주석**: 한국어로 작성
- **변수명/함수명**: camelCase (영어)
- **들여쓰기**: 스페이스 2칸
- **따옴표**: 작은따옴표(`''`) 사용
- **커밋 메시지**: 한국어
