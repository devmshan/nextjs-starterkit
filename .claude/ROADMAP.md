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

## Phase 4: 컴포넌트 확장 (Phase 1 완료)
- [x] shadcn 컴포넌트 추가 (input, label, textarea, checkbox, radio-group, select, dialog, dropdown-menu, avatar, tooltip, skeleton, sonner)
- [x] 유틸리티 라이브러리 설치 (react-hook-form, @hookform/resolvers, zod)
- [x] 레이아웃 컴포넌트 생성 (Container, Section, PageHeader)
- [x] Route Group 구조 리팩토링 ((marketing), (auth))
- [x] 인증 레이아웃 + 로그인/회원가입 페이지 (react-hook-form + zod 데모)
- [x] 기존 컴포넌트 Container 적용 (Header, Footer)

## Phase 5: 대시보드 (Phase 2 완료)
- [x] shadcn 컴포넌트 추가 (tabs, table, accordion, alert-dialog, popover, scroll-area, progress, alert)
- [x] 유틸리티 라이브러리 (nuqs, date-fns)
- [x] 대시보드 레이아웃 (Sidebar + DashboardHeader, 모바일 Sheet 지원)
- [x] 대시보드 홈 /dashboard (통계 카드 + 최근 주문 테이블 + 트래픽 Progress)
- [x] 설정 페이지 /dashboard/settings (Tabs + Switch + Alert + sonner 토스트)
- [x] 프로필 페이지 /dashboard/settings/profile (Avatar + 폼 + RHF + zod)
- [x] Empty State 컴포넌트
- [x] Loading State 컴포넌트 (CardGridSkeleton, TableSkeleton, PageHeaderSkeleton)

## Phase 6: 고급 컴포넌트 (Phase 3 완료)
- [x] shadcn 컴포넌트 추가 (collapsible, toggle, toggle-group, slider, drawer)
- [x] 데이터 관리 페이지 /dashboard/data (Table + Dialog CRUD + AlertDialog 삭제 + nuqs URL 필터 + EmptyState)
- [x] 컴포넌트 쇼케이스 페이지 /components (전체 컴포넌트 데모 갤러리)

## Phase 7: 유틸리티 훅 (usehooks-ts)
- [x] usehooks-ts 설치
- [x] Sidebar에 useMediaQuery + useLocalStorage 적용 (접힘 상태 저장, 반응형 인지)
- [x] 데이터 페이지에 useDebounce 적용 (검색 300ms 디바운스)
- [x] 컴포넌트 쇼케이스에 usehooks-ts 데모 섹션 추가 (useLocalStorage 카운터, useDebounce, useCopyToClipboard)
- [x] CLAUDE.md 현행화 (기술 스택, 아키텍처, Provider 계층, shadcn 목록, usehooks-ts 섹션)
- [x] ROADMAP.md 현행화
