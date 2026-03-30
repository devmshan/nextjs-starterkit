# Next.js Starter Kit — ROADMAP

## Phase 1: 프로젝트 초기 설정
- [x] `create-next-app@latest`로 프로젝트 생성 (Next.js 16, TS, Tailwind v4)
- [x] `npx shadcn@latest init`으로 shadcn/ui 초기화
- [x] next-themes 설치 (다크모드)
- [x] shadcn/ui 컴포넌트 설치 (button, card, badge, separator, sheet, switch)
- [x] `.claude/CLAUDE.md` 작성
- [x] `.claude/ROADMAP.md` 작성

## Phase 2: 레이아웃 구성
- [x] `ThemeProvider` 컴포넌트 생성 (next-themes 래퍼)
- [x] `Header` 컴포넌트 생성 (반응형 네비 + 다크모드 토글)
- [x] `Footer` 컴포넌트 생성
- [x] `layout.tsx` 수정 (ThemeProvider + Header + main + Footer)

## Phase 3: 랜딩 페이지
- [x] Hero 섹션 (제목, 부제, CTA 버튼, 기술 스택 뱃지)
- [x] Features 섹션 (6개 기능 카드 그리드)
- [x] Getting Started 섹션 (빠른 시작 가이드)

## Phase 4: 확장 가이드 (사용자 커스텀)
- [ ] 인증 페이지 추가 (로그인/회원가입)
- [ ] API 라우트 예제 추가 (`app/api/`)
- [ ] 데이터베이스 연동 (Prisma + PostgreSQL)
- [ ] 환경변수 설정 (`.env.local` 템플릿)
- [ ] 배포 설정 (Vercel, Docker)
