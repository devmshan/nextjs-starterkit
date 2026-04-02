'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  LogIn,
  UserPlus,
  LayoutDashboard,
  Table,
  Settings,
  Blocks,
  Puzzle,
  CloudDownload,
  Zap,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { PageHeader } from '@/components/layout/page-header'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// 인라인 예제 데모 컴포넌트를 지연 로드
const HooksContent = dynamic(() => import('./_components/hooks-demo'), {
  loading: () => <div className='py-10 text-center text-muted-foreground text-sm'>로딩 중...</div>,
})
const DataFetchingContent = dynamic(() => import('./_components/data-fetching-demo'), {
  loading: () => <div className='py-10 text-center text-muted-foreground text-sm'>로딩 중...</div>,
})
const OptimizationContent = dynamic(() => import('./_components/optimization-demo'), {
  loading: () => <div className='py-10 text-center text-muted-foreground text-sm'>로딩 중...</div>,
})

// 인라인으로 표시할 예제 타입
type InlineExampleKey = 'hooks' | 'data-fetching' | 'optimization'

// 인라인 예제 카드 데이터
const inlineExamples = [
  {
    key: 'hooks' as InlineExampleKey,
    icon: Puzzle,
    title: 'usehooks-ts 훅',
    description: 'useLocalStorage, useDebounceValue, useCopyToClipboard, useMediaQuery, useToggle 실전 데모.',
    badge: '훅',
  },
  {
    key: 'data-fetching' as InlineExampleKey,
    icon: CloudDownload,
    title: '데이터 페칭',
    description: '로딩·에러·성공 상태 관리. JSONPlaceholder API로 posts/users 가져오기 패턴.',
    badge: '데이터',
  },
  {
    key: 'optimization' as InlineExampleKey,
    icon: Zap,
    title: '최적화 패턴',
    description: 'Suspense 경계, next/dynamic 동적 임포트, 디바운스 검색 최적화 패턴.',
    badge: '최적화',
  },
]

// 외부 링크(다른 레이아웃)로 이동하는 예제 카드 데이터
const externalExamples = [
  {
    href: '/login',
    icon: LogIn,
    title: '로그인 폼',
    description: '이메일/비밀번호 인증 폼 패턴. react-hook-form + zod 유효성 검사.',
    badge: '인증',
  },
  {
    href: '/signup',
    icon: UserPlus,
    title: '회원가입 폼',
    description: '가입 양식 + 유효성 검사 패턴. 중첩 필드 및 에러 처리 포함.',
    badge: '인증',
  },
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    title: '대시보드',
    description: '통계 카드 + 최근 주문 테이블. 사이드바 레이아웃 포함.',
    badge: '레이아웃',
  },
  {
    href: '/dashboard/data',
    icon: Table,
    title: '데이터 테이블',
    description: 'CRUD + URL 기반 필터/검색. nuqs로 쿼리 파라미터 상태 관리.',
    badge: '데이터',
  },
  {
    href: '/dashboard/settings',
    icon: Settings,
    title: '설정 페이지',
    description: '탭 + 토글 스위치 설정. 다중 탭 레이아웃 패턴.',
    badge: '레이아웃',
  },
]

// 인라인 예제의 제목/설명 맵
const inlineExampleMeta: Record<InlineExampleKey, { title: string; description: string }> = {
  'hooks': {
    title: 'usehooks-ts 훅 데모',
    description: 'usehooks-ts 라이브러리의 대표 훅을 실제로 동작하는 예제로 확인하세요.',
  },
  'data-fetching': {
    title: '데이터 페칭 패턴',
    description: '로딩·에러·성공 상태를 명확하게 분리하는 Client Component 데이터 페칭 패턴입니다.',
  },
  'optimization': {
    title: '최적화 패턴',
    description: 'Next.js 앱의 성능을 높이는 Suspense, dynamic import, Image 최적화, 디바운스 패턴을 실습합니다.',
  },
}

// 예제 페이지
export default function ExamplesPage() {
  const [activeExample, setActiveExample] = useState<InlineExampleKey | null>(null)

  // 활성 인라인 예제 표시
  if (activeExample) {
    const meta = inlineExampleMeta[activeExample]
    return (
      <Container>
        <Section>
          <div className='mb-6'>
            <Button
              variant='ghost'
              size='sm'
              className='text-muted-foreground hover:text-foreground -ml-2'
              onClick={() => setActiveExample(null)}
            >
              <ArrowLeft className='mr-1 h-4 w-4' />
              예제 목록
            </Button>
          </div>
          <PageHeader title={meta.title} description={meta.description} />
          <div className='mt-10'>
            {activeExample === 'hooks' && <HooksContent />}
            {activeExample === 'data-fetching' && <DataFetchingContent />}
            {activeExample === 'optimization' && <OptimizationContent />}
          </div>
        </Section>
      </Container>
    )
  }

  // 카드 그리드 표시
  return (
    <Container>
      <Section>
        <PageHeader
          title='예제'
          description='스타터킷에 포함된 실용적인 UI 패턴 모음입니다. 인라인 예제는 이 페이지 안에서 바로 확인하고, 레이아웃 예제는 해당 페이지로 이동합니다.'
        />
        <div className='mt-10 space-y-8'>
          {/* 인라인 예제 섹션 */}
          <div>
            <p className='text-sm font-medium text-muted-foreground mb-3'>페이지 내 인라인 예제</p>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {inlineExamples.map((example) => {
                const Icon = example.icon
                return (
                  <Card
                    key={example.key}
                    className='h-full cursor-pointer transition-colors hover:bg-muted/50'
                    onClick={() => setActiveExample(example.key)}
                  >
                    <CardHeader>
                      <div className='mb-2 flex items-center justify-between'>
                        <Icon className='h-6 w-6 text-primary' />
                        <Badge variant='secondary'>{example.badge}</Badge>
                      </div>
                      <CardTitle className='text-base'>{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* 컴포넌트 쇼케이스 (같은 마케팅 레이아웃) */}
          <div>
            <p className='text-sm font-medium text-muted-foreground mb-3'>컴포넌트 쇼케이스</p>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              <Link href='/components'>
                <Card className='h-full transition-colors hover:bg-muted/50'>
                  <CardHeader>
                    <div className='mb-2 flex items-center justify-between'>
                      <Blocks className='h-6 w-6 text-primary' />
                      <Badge variant='secondary'>UI</Badge>
                    </div>
                    <CardTitle className='text-base'>컴포넌트 쇼케이스</CardTitle>
                    <CardDescription>전체 UI 컴포넌트 미리보기. 31개 shadcn 컴포넌트 예제.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* 외부 링크 예제 섹션 */}
          <div>
            <p className='text-sm font-medium text-muted-foreground mb-3'>다른 레이아웃 예제 (페이지 이동)</p>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {externalExamples.map((example) => {
                const Icon = example.icon
                return (
                  <Link key={example.href} href={example.href}>
                    <Card className='h-full transition-colors hover:bg-muted/50'>
                      <CardHeader>
                        <div className='mb-2 flex items-center justify-between'>
                          <Icon className='h-6 w-6 text-primary' />
                          <div className='flex items-center gap-1.5'>
                            <Badge variant='secondary'>{example.badge}</Badge>
                            <ExternalLink className='h-3.5 w-3.5 text-muted-foreground' />
                          </div>
                        </div>
                        <CardTitle className='text-base'>{example.title}</CardTitle>
                        <CardDescription>{example.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </Section>
    </Container>
  )
}
