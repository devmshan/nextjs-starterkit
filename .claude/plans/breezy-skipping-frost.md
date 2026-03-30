# Next.js Starter Kit 구현 계획

## Context
웹 개발을 빠르게 시작할 수 있는 Next.js 스타터킷 프로젝트. 현재 디렉토리는 `.claude/` 폴더만 존재하는 빈 상태.

## Phase 1: 프로젝트 스캐폴딩

### Step 1-1: Next.js 프로젝트 생성 (공식 가이드 준수)
```bash
cd /Users/ms/study/claude/workspace/claude-code-mastery/claude-nextjs-starterkit
npx create-next-app@latest . --yes
```
- `--yes`: 기본값 사용 (TypeScript, Tailwind CSS, ESLint, App Router, Turbopack, `@/*` alias)
- `.`: 현재 디렉토리에 생성 → 기존 `.claude/` 폴더 보존
- Next.js v16 (latest) 설치

### Step 1-2: shadcn/ui 초기화 (공식 가이드 준수)
```bash
npx shadcn@latest init
```

### Step 1-3: 추가 패키지 및 컴포넌트 설치
```bash
npm install next-themes
npx shadcn@latest add button card badge separator sheet switch
```
- lucide-react는 shadcn/ui 초기화 시 자동 설치됨

### 검증 사항
- `tailwind.config.ts` 파일이 없을 것 (Tailwind v4 CSS 기반)
- `postcss.config.mjs`에 `"@tailwindcss/postcss": {}` 플러그인 사용
- `globals.css`에 `@import "tailwindcss"` 사용 (v3의 `@tailwind` 디렉티브 아님)
- `components.json`의 `tailwind.config`가 빈 문자열
- `tsconfig.json`에 `@/*` path alias 설정 확인

## Phase 2: 레이아웃 구성

### 생성할 파일
| 파일 | 역할 |
|------|------|
| `src/components/theme-provider.tsx` | next-themes ThemeProvider 래퍼 (Client Component) |
| `src/components/header.tsx` | 사이트 헤더 (로고, 네비, 다크모드 토글) |
| `src/components/footer.tsx` | 사이트 푸터 |

### 수정할 파일
| 파일 | 변경 내용 |
|------|----------|
| `src/app/layout.tsx` | ThemeProvider + Header + Footer 래핑, `suppressHydrationWarning` |

## Phase 3: 랜딩 페이지 (`src/app/page.tsx`)

| 섹션 | 내용 | 사용 컴포넌트 |
|------|------|--------------|
| Hero | 제목, 부제, CTA 버튼 2개, 기술 스택 뱃지 | Button, Badge |
| Features | 6개 기능 카드 (3열 반응형 그리드) | Card, lucide-react 아이콘 |
| Getting Started | 빠른 시작 가이드 코드 블록 | — |

lucide-react 아이콘: Rocket, Code, Paintbrush, Layers, Moon, Smartphone

## Phase 4: 프로젝트 문서

- `.claude/CLAUDE.md` — 기술 스택, 아키텍처, 코딩 컨벤션
- `.claude/ROADMAP.md` — Phase별 개발 체크리스트

## Phase 5: 코딩 컨벤션 적용

- 주석: 한국어
- 변수명: camelCase
- 들여쓰기: 2칸, 작은따옴표

## 검증 방법

```bash
npm run dev     # localhost:3000 확인
npm run build   # 빌드 성공 확인
npm run lint    # 린트 통과 확인
```

확인 항목:
- 랜딩 페이지 정상 렌더링
- 다크모드 토글 동작
- 반응형 레이아웃 (모바일/데스크톱)
- shadcn/ui 컴포넌트 정상 표시
