import {
  Rocket,
  Code,
  Paintbrush,
  Layers,
  Moon,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// 기술 스택 뱃지 목록
const techBadges = [
  'Next.js 16',
  'TypeScript',
  'Tailwind CSS v4',
  'shadcn/ui',
  'lucide-react',
]

// 기능 소개 카드 데이터
const features = [
  {
    icon: Rocket,
    title: 'App Router',
    description:
      'Next.js 16의 App Router를 기반으로 파일 시스템 라우팅, 서버 컴포넌트, 스트리밍을 지원합니다.',
  },
  {
    icon: Code,
    title: 'TypeScript',
    description:
      '정적 타입 검사로 개발 생산성을 높이고 런타임 오류를 방지합니다.',
  },
  {
    icon: Paintbrush,
    title: 'Tailwind CSS v4',
    description:
      'CSS 기반 설정으로 tailwind.config 파일 없이 @theme inline 블록으로 테마를 커스텀합니다.',
  },
  {
    icon: Layers,
    title: 'shadcn/ui',
    description:
      '접근성을 갖춘 재사용 가능한 컴포넌트를 소스코드로 직접 소유하여 자유롭게 커스텀합니다.',
  },
  {
    icon: Moon,
    title: '다크 모드',
    description:
      'next-themes를 활용한 라이트/다크 모드 전환을 기본으로 지원합니다.',
  },
  {
    icon: Smartphone,
    title: '반응형 디자인',
    description:
      '모바일 우선 설계로 모든 디바이스에서 최적화된 레이아웃을 제공합니다.',
  },
]

// 빠른 시작 명령어 목록
const startCommands = [
  { label: '저장소 클론', command: 'git clone <your-repo-url>' },
  { label: '의존성 설치', command: 'npm install' },
  { label: '개발 서버 실행', command: 'npm run dev' },
]

export default function HomePage() {
  return (
    <div className='container mx-auto max-w-5xl px-4 py-16'>
      {/* 히어로 섹션 */}
      <section className='flex flex-col items-center text-center gap-6 pb-16'>
        <div className='flex flex-wrap justify-center gap-2'>
          {techBadges.map((badge) => (
            <Badge key={badge} variant='secondary'>
              {badge}
            </Badge>
          ))}
        </div>

        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
          Next.js{' '}
          <span className='text-primary'>Starter Kit</span>
        </h1>

        <p className='max-w-2xl text-lg text-muted-foreground'>
          Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui로 구성된 스타터킷.
          복잡한 초기 설정 없이 바로 개발을 시작하세요.
        </p>

        <div className='flex flex-wrap justify-center gap-4'>
          {/* base-ui Button은 render prop으로 커스텀 엘리먼트를 렌더링 */}
          <Button size='lg' render={<a href='#getting-started' />}>
            시작하기
          </Button>
          <Button
            size='lg'
            variant='outline'
            render={
              <a
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
              />
            }
          >
            GitHub 보기
          </Button>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section id='features' className='py-16'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-bold tracking-tight'>주요 기능</h2>
          <p className='mt-2 text-muted-foreground'>
            개발 생산성을 높이는 최신 기술 스택
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className='h-full'>
                <CardHeader>
                  <div className='mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                    <Icon className='h-5 w-5 text-primary' />
                  </div>
                  <CardTitle className='text-lg'>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 시작하기 섹션 */}
      <section id='getting-started' className='py-16'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-bold tracking-tight'>빠른 시작</h2>
          <p className='mt-2 text-muted-foreground'>
            3단계로 개발 환경을 구축하세요
          </p>
        </div>

        <Card className='mx-auto max-w-2xl'>
          <CardHeader>
            <CardTitle>설치 방법</CardTitle>
            <CardDescription>Node.js 20.9+ 가 필요합니다</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            {startCommands.map((item, index) => (
              <div key={item.command} className='flex flex-col gap-1'>
                <span className='text-xs text-muted-foreground font-medium'>
                  {index + 1}. {item.label}
                </span>
                <code className='block rounded-md bg-muted px-4 py-3 font-mono text-sm'>
                  {item.command}
                </code>
              </div>
            ))}
            <p className='pt-2 text-sm text-muted-foreground'>
              개발 서버 실행 후{' '}
              <code className='rounded bg-muted px-1 py-0.5 text-xs font-mono'>
                http://localhost:3000
              </code>
              에서 확인하세요.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
