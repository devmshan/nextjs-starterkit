import { Terminal, Layers, FolderOpen, Puzzle } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { PageHeader } from '@/components/layout/page-header'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// 기술 스택 목록
const techStack = [
  { name: 'Next.js 16', description: 'App Router 기반 풀스택 프레임워크', badge: '프레임워크' },
  { name: 'React 19', description: '최신 React — Server Component 지원', badge: '렌더링' },
  { name: 'TypeScript 5', description: '정적 타입 검사로 안전한 코드 작성', badge: '언어' },
  { name: 'Tailwind CSS v4', description: 'CSS 기반 유틸리티 스타일링, 설정 파일 불필요', badge: '스타일' },
  { name: '@base-ui/react', description: 'Radix UI 대체 헤드리스 UI 프리미티브', badge: 'UI' },
  { name: 'shadcn', description: 'Base UI 기반 UI 컴포넌트 소스 생성 도구', badge: 'UI' },
  { name: 'next-themes', description: '다크/라이트 모드 전환', badge: '테마' },
  { name: 'react-hook-form + zod', description: '폼 상태 관리 + 스키마 유효성 검사', badge: '폼' },
  { name: 'nuqs', description: 'URL 쿼리 파라미터 상태 관리', badge: '상태' },
  { name: 'sonner', description: '토스트 알림 라이브러리', badge: 'UX' },
  { name: 'usehooks-ts', description: '범용 React 커스텀 훅 모음', badge: '유틸' },
  { name: 'date-fns', description: '날짜 포맷 및 계산 유틸리티', badge: '유틸' },
]

// 설치된 shadcn 컴포넌트 목록 (31개)
const components = [
  'accordion', 'alert', 'alert-dialog', 'avatar', 'badge',
  'button', 'card', 'checkbox', 'collapsible', 'dialog',
  'drawer', 'dropdown-menu', 'input', 'label', 'popover',
  'progress', 'radio-group', 'scroll-area', 'select', 'separator',
  'sheet', 'skeleton', 'slider', 'sonner', 'switch',
  'table', 'tabs', 'textarea', 'toggle', 'toggle-group', 'tooltip',
]

// 프로젝트 디렉토리 구조
const directoryTree = `app/
├── layout.tsx              # 루트 레이아웃
├── globals.css             # Tailwind v4 CSS 설정 + 테마 토큰
├── (marketing)/            # 마케팅 페이지 (Header + Footer)
│   ├── page.tsx            # 홈 랜딩 페이지
│   ├── examples/page.tsx   # 예제 목록
│   └── docs/page.tsx       # 문서 페이지
├── (auth)/                 # 인증 페이지 (중앙 카드 레이아웃)
│   ├── login/page.tsx
│   └── signup/page.tsx
└── (dashboard)/            # 대시보드 (Sidebar + DashboardHeader)
    └── dashboard/
        ├── page.tsx        # 통계 카드 + 최근 주문 테이블
        ├── data/page.tsx   # CRUD 테이블 + nuqs URL 필터
        └── settings/       # 설정 (Tabs + Switch)

components/
├── ui/                     # shadcn 컴포넌트 31개
├── layout/                 # Container, Section, PageHeader 등
├── header.tsx              # 마케팅 헤더
├── footer.tsx              # 마케팅 푸터
└── theme-provider.tsx      # next-themes 래퍼

lib/
└── utils.ts                # cn() 유틸리티 (clsx + tailwind-merge)`

// 빠른 시작 명령어
const quickStartSteps = [
  { step: '01', label: '저장소 클론', command: 'git clone <repo-url> my-app' },
  { step: '02', label: '의존성 설치', command: 'cd my-app && npm install' },
  { step: '03', label: '개발 서버 실행', command: 'npm run dev' },
]

// 문서 페이지 (Server Component)
export default function DocsPage() {
  return (
    <Container>
      <Section>
        <PageHeader
          title='문서'
          description='Next.js 스타터킷의 기술 스택, 프로젝트 구조, 빠른 시작 방법을 안내합니다.'
        />

        {/* 기술 스택 */}
        <div className='mt-12'>
          <div className='mb-6 flex items-center gap-3'>
            <Layers className='h-5 w-5 text-primary' />
            <h2 className='text-xl font-semibold'>기술 스택</h2>
          </div>
          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {techStack.map((tech) => (
              <Card key={tech.name} className='border bg-card'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between gap-2'>
                    <CardTitle className='text-sm font-medium'>{tech.name}</CardTitle>
                    <Badge variant='secondary' className='shrink-0 text-xs'>
                      {tech.badge}
                    </Badge>
                  </div>
                  <CardDescription className='text-xs'>{tech.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Separator className='my-10' />

        {/* 프로젝트 구조 */}
        <div>
          <div className='mb-6 flex items-center gap-3'>
            <FolderOpen className='h-5 w-5 text-primary' />
            <h2 className='text-xl font-semibold'>프로젝트 구조</h2>
          </div>
          <Card>
            <CardContent className='pt-6'>
              <pre className='overflow-x-auto rounded-md bg-muted p-4 text-sm leading-relaxed'>
                <code>{directoryTree}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        <Separator className='my-10' />

        {/* 빠른 시작 */}
        <div>
          <div className='mb-6 flex items-center gap-3'>
            <Terminal className='h-5 w-5 text-primary' />
            <h2 className='text-xl font-semibold'>빠른 시작</h2>
          </div>
          <div className='flex flex-col gap-3'>
            {quickStartSteps.map((item) => (
              <Card key={item.step}>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-4'>
                    <span className='text-2xl font-bold text-muted-foreground/40'>
                      {item.step}
                    </span>
                    <div>
                      <CardTitle className='mb-1 text-sm'>{item.label}</CardTitle>
                      <pre className='rounded bg-muted px-3 py-1.5 text-sm'>
                        <code>{item.command}</code>
                      </pre>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Separator className='my-10' />

        {/* 설치된 컴포넌트 */}
        <div>
          <div className='mb-6 flex items-center gap-3'>
            <Puzzle className='h-5 w-5 text-primary' />
            <h2 className='text-xl font-semibold'>
              UI 컴포넌트
              <span className='ml-2 text-base font-normal text-muted-foreground'>
                ({components.length}개)
              </span>
            </h2>
          </div>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-wrap gap-2'>
                {components.map((name) => (
                  <Badge key={name} variant='outline'>
                    {name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </Container>
  )
}
