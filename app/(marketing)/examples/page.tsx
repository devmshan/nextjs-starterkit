import Link from 'next/link'
import {
  LogIn,
  UserPlus,
  LayoutDashboard,
  Table,
  Settings,
  Blocks,
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

// 예제 카드 데이터 목록
const examples = [
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
  {
    href: '/components',
    icon: Blocks,
    title: '컴포넌트 쇼케이스',
    description: '전체 UI 컴포넌트 미리보기. 31개 shadcn 컴포넌트 예제.',
    badge: 'UI',
  },
]

// 예제 페이지 (Server Component)
export default function ExamplesPage() {
  return (
    <Container>
      <Section>
        <PageHeader
          title='예제'
          description='스타터킷에 포함된 실용적인 UI 패턴 모음입니다. 각 카드를 클릭하면 해당 예제 페이지로 이동합니다.'
        />
        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {examples.map((example) => {
            const Icon = example.icon
            return (
              <Link key={example.href} href={example.href}>
                <Card className='h-full transition-colors hover:bg-muted/50'>
                  <CardHeader>
                    <div className='mb-2 flex items-center justify-between'>
                      <Icon className='h-6 w-6 text-primary' />
                      <Badge variant='secondary'>{example.badge}</Badge>
                    </div>
                    <CardTitle className='text-base'>{example.title}</CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </Section>
    </Container>
  )
}
