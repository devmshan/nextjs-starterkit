'use client'

import { useState, Suspense, lazy } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

// 최적화 섹션 래퍼
function OptSection({ title, description, badge, children }: {
  title: string
  description: string
  badge: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <CardTitle className='text-base'>{title}</CardTitle>
          <Badge variant='secondary' className='text-xs'>{badge}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

// --- Suspense 데모 ---

// lazy()로 지연 로드할 컴포넌트 (실제로는 별도 파일이어야 하지만 인라인으로 시뮬레이션)
const LazyHeavyComponent = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) => {
      setTimeout(() => {
        resolve({
          default: function HeavyComponent() {
            return (
              <div className='rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/20'>
                <p className='text-green-700 dark:text-green-400 text-sm font-medium'>
                  Heavy Component 로드 완료!
                </p>
                <p className='text-green-600 dark:text-green-500 text-xs mt-1'>
                  1.5초 지연 후 lazy()로 동적 로드된 컴포넌트입니다.
                </p>
              </div>
            )
          },
        })
      }, 1500)
    })
)

function SuspenseDemo() {
  const [show, setShow] = useState(false)

  return (
    <div className='space-y-4'>
      <Button variant='outline' size='sm' onClick={() => setShow((v) => !v)}>
        {show ? 'Heavy Component 숨기기' : 'Heavy Component 렌더링'}
      </Button>
      {show && (
        <Suspense fallback={
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>컴포넌트 로드 중... (Suspense fallback)</span>
          </div>
        }>
          <LazyHeavyComponent />
        </Suspense>
      )}
      <p className='text-muted-foreground text-xs'>
        버튼을 처음 클릭하면 1.5초 지연 후 컴포넌트가 로드됩니다. 두 번째 클릭부터는 캐시되어 즉시 렌더링됩니다.
      </p>
    </div>
  )
}

// --- next/dynamic 데모 ---

// SSR 비활성화 동적 임포트 (클라이언트 전용 컴포넌트 패턴)
const DynamicClientOnly = dynamic(
  () =>
    Promise.resolve(function ClientOnlyWidget() {
      return (
        <div className='rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/20'>
          <p className='text-blue-700 dark:text-blue-400 text-sm font-medium'>
            Client-Only Component
          </p>
          <p className='text-blue-600 dark:text-blue-500 text-xs mt-1'>
            SSR이 비활성화된 동적 임포트 컴포넌트입니다. window, localStorage 등 브라우저 API를 안전하게 사용할 수 있습니다.
          </p>
          <code className='text-xs text-blue-500 mt-2 block'>window.location: {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</code>
        </div>
      )
    }),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <Loader2 className='h-4 w-4 animate-spin' />
        <span>동적 임포트 로딩 중...</span>
      </div>
    ),
  }
)

function DynamicImportDemo() {
  const [show, setShow] = useState(false)

  return (
    <div className='space-y-4'>
      <div className='space-y-2 text-sm'>
        <p className='text-muted-foreground text-xs'>
          <code className='bg-muted rounded px-1'>{'{ ssr: false }'}</code> 옵션으로 SSR을 비활성화합니다.
          브라우저 전용 API(window, document)가 필요한 컴포넌트에 활용합니다.
        </p>
      </div>
      <Button variant='outline' size='sm' onClick={() => setShow((v) => !v)}>
        {show ? '동적 컴포넌트 숨기기' : '동적 컴포넌트 표시'}
      </Button>
      {show && <DynamicClientOnly />}
    </div>
  )
}

// --- next/image 최적화 데모 ---
function ImageOptimizationDemo() {
  const [useOptimized, setUseOptimized] = useState(true)
  const placeholderUrl = 'https://picsum.photos/seed/nextjs/400/200'

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <Button
          variant={useOptimized ? 'default' : 'outline'}
          size='sm'
          onClick={() => setUseOptimized(true)}
        >
          next/image (최적화)
        </Button>
        <Button
          variant={!useOptimized ? 'default' : 'outline'}
          size='sm'
          onClick={() => setUseOptimized(false)}
        >
          {'<img>'} (비최적화)
        </Button>
      </div>

      <div className='rounded-lg border overflow-hidden max-w-md'>
        {useOptimized ? (
          <div className='relative h-48 w-full'>
            <Image
              src={placeholderUrl}
              alt='next/image 최적화 예시'
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 400px'
              unoptimized
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={placeholderUrl}
            alt='img 태그 비최적화 예시'
            className='h-48 w-full object-cover'
          />
        )}
      </div>

      <div className='grid gap-2 text-xs sm:grid-cols-2'>
        <div className={`rounded border p-3 ${useOptimized ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-muted'}`}>
          <p className='font-medium text-green-700 dark:text-green-400'>next/image 장점</p>
          <ul className='text-muted-foreground mt-1 space-y-0.5 list-disc list-inside'>
            <li>자동 WebP/AVIF 변환</li>
            <li>lazy loading 기본 적용</li>
            <li>CLS 방지 (크기 예약)</li>
            <li>CDN 캐싱 최적화</li>
          </ul>
        </div>
        <div className={`rounded border p-3 ${!useOptimized ? 'border-destructive bg-destructive/5' : 'border-muted'}`}>
          <p className='font-medium text-destructive'>{'<img>'} 단점</p>
          <ul className='text-muted-foreground mt-1 space-y-0.5 list-disc list-inside'>
            <li>원본 포맷 그대로 전송</li>
            <li>layout shift 발생 가능</li>
            <li>lazy loading 수동 설정</li>
            <li>크기 최적화 없음</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// --- 디바운스 검색 최적화 데모 ---

// 샘플 아이템 목록
const SAMPLE_ITEMS = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui',
  'usehooks-ts', 'Zod', 'React Hook Form', 'Sonner', 'nuqs',
  'date-fns', 'Lucide React', 'Base UI', 'Vaul', 'tw-animate-css',
]

function DebounceSearchDemo() {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounceValue(query, 300)
  const [renderCount, setRenderCount] = useState(0)

  // 디바운스된 값으로만 필터링 (실제 API 호출 시뮬레이션)
  const filtered = SAMPLE_ITEMS.filter((item) =>
    item.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  return (
    <div className='space-y-4 max-w-sm'>
      <Input
        placeholder='라이브러리 검색...'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setRenderCount((c) => c + 1)
        }}
      />
      <div className='flex gap-4 text-xs text-muted-foreground'>
        <span>키 입력: <strong className='text-foreground'>{renderCount}회</strong></span>
        <span>실제 필터: <strong className='text-foreground'>{debouncedQuery ? '적용됨' : '전체'}</strong></span>
      </div>
      <div className='flex flex-wrap gap-1.5'>
        {filtered.map((item) => (
          <Badge key={item} variant='outline' className='text-xs'>{item}</Badge>
        ))}
        {filtered.length === 0 && (
          <p className='text-muted-foreground text-xs'>검색 결과 없음</p>
        )}
      </div>
      <p className='text-muted-foreground text-xs'>
        300ms 동안 입력이 멈춘 후에만 필터링이 실행됩니다. API 호출 횟수를 크게 줄일 수 있습니다.
      </p>
    </div>
  )
}

// 최적화 패턴 데모 콘텐츠
export default function OptimizationContent() {
  return (
    <div>
      <Tabs defaultValue='suspense'>
        <TabsList className='grid grid-cols-2 sm:grid-cols-4 h-auto'>
          <TabsTrigger value='suspense'>Suspense</TabsTrigger>
          <TabsTrigger value='dynamic'>next/dynamic</TabsTrigger>
          <TabsTrigger value='image'>next/image</TabsTrigger>
          <TabsTrigger value='debounce'>디바운스</TabsTrigger>
        </TabsList>

        <TabsContent value='suspense' className='mt-6'>
          <OptSection
            title='React Suspense 경계'
            description='React.lazy()와 Suspense를 결합하여 컴포넌트를 지연 로드하고, 로딩 중에는 fallback UI를 보여줍니다.'
            badge='React.lazy'
          >
            <SuspenseDemo />
          </OptSection>
        </TabsContent>

        <TabsContent value='dynamic' className='mt-6'>
          <OptSection
            title='next/dynamic 동적 임포트'
            description="Next.js의 dynamic()으로 SSR을 선택적으로 비활성화합니다. 브라우저 전용 API를 사용하는 컴포넌트에 필수적입니다."
            badge='next/dynamic'
          >
            <DynamicImportDemo />
          </OptSection>
        </TabsContent>

        <TabsContent value='image' className='mt-6'>
          <OptSection
            title='next/image 이미지 최적화'
            description="Next.js Image 컴포넌트는 자동으로 WebP 변환, lazy loading, CLS 방지를 처리합니다. 일반 <img>와 비교해보세요."
            badge='next/image'
          >
            <ImageOptimizationDemo />
          </OptSection>
        </TabsContent>

        <TabsContent value='debounce' className='mt-6'>
          <OptSection
            title='디바운스 검색 최적화'
            description='useDebounceValue로 검색 입력을 300ms 지연시켜 불필요한 API 호출을 방지합니다.'
            badge='useDebounceValue'
          >
            <DebounceSearchDemo />
          </OptSection>
        </TabsContent>
      </Tabs>

      <Separator className='my-10' />

      {/* 패턴 요약 */}
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        {[
          { technique: 'React.lazy + Suspense', use: '대형 컴포넌트 코드 분할', icon: '🔀' },
          { technique: 'next/dynamic', use: 'SSR 비활성화 / 동적 로드', icon: '⚡' },
          { technique: 'next/image', use: '자동 이미지 최적화', icon: '🖼️' },
          { technique: 'useDebounceValue', use: 'API 호출 횟수 감소', icon: '🔍' },
        ].map((item) => (
          <Card key={item.technique} className='p-4'>
            <p className='text-lg'>{item.icon}</p>
            <p className='font-medium text-sm mt-1'>{item.technique}</p>
            <p className='text-muted-foreground text-xs mt-0.5'>{item.use}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
