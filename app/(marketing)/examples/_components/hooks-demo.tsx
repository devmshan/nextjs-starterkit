'use client'

import { useState } from 'react'
import { Copy, Check, Monitor, Smartphone } from 'lucide-react'
import {
  useLocalStorage,
  useDebounceValue,
  useCopyToClipboard,
  useMediaQuery,
  useToggle,
} from 'usehooks-ts'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

// useLocalStorage 카운터 데모
function LocalStorageDemo() {
  const [count, setCount] = useLocalStorage('hooks-demo-counter', 0)
  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-3'>
        <Button variant='outline' size='sm' onClick={() => setCount((c) => c - 1)}>−</Button>
        <span className='min-w-10 text-center font-mono text-xl font-bold'>{count}</span>
        <Button variant='outline' size='sm' onClick={() => setCount((c) => c + 1)}>+</Button>
        <Button variant='ghost' size='sm' onClick={() => setCount(0)}>초기화</Button>
      </div>
      <p className='text-muted-foreground text-xs'>
        페이지를 새로고침해도 값이 유지됩니다 (localStorage 키: <code className='bg-muted rounded px-1'>hooks-demo-counter</code>)
      </p>
    </div>
  )
}

// useDebounceValue 검색 데모
function DebounceDemo() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue] = useDebounceValue(inputValue, 400)

  return (
    <div className='space-y-3 max-w-sm'>
      <Input
        placeholder='텍스트를 입력하세요'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className='grid grid-cols-2 gap-2 text-sm'>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs font-medium'>즉시 반영</p>
          <code className='bg-muted block rounded px-2 py-1 text-xs'>{inputValue || '—'}</code>
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs font-medium'>400ms 디바운스</p>
          <code className='bg-muted block rounded px-2 py-1 text-xs'>{debouncedValue || '—'}</code>
        </div>
      </div>
    </div>
  )
}

// useCopyToClipboard 데모
function CopyToClipboardDemo() {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)
  const sampleText = 'npx create-next-app@latest --example https://github.com/your-starter-kit'

  const handleCopy = async () => {
    const ok = await copyToClipboard(sampleText)
    if (ok) {
      setCopied(true)
      toast.success('클립보드에 복사되었습니다')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className='space-y-2 max-w-lg'>
      <div className='flex items-center gap-2'>
        <code className='bg-muted flex-1 rounded px-3 py-2 text-xs truncate'>{sampleText}</code>
        <Button variant='outline' size='icon' onClick={handleCopy} aria-label='복사'>
          {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
        </Button>
      </div>
      {copiedText && (
        <p className='text-muted-foreground text-xs'>마지막으로 복사한 내용: <code className='bg-muted rounded px-1'>{copiedText.slice(0, 40)}...</code></p>
      )}
    </div>
  )
}

// useMediaQuery 뷰포트 감지 데모
function MediaQueryDemo() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  return (
    <div className='space-y-3'>
      <div className='flex flex-wrap gap-3'>
        <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${isDesktop ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-muted'}`}>
          <Monitor className='h-4 w-4' />
          <span>데스크톱 (≥768px)</span>
          <Badge variant={isDesktop ? 'default' : 'secondary'}>{isDesktop ? '활성' : '비활성'}</Badge>
        </div>
        <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${!isDesktop ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-muted'}`}>
          <Smartphone className='h-4 w-4' />
          <span>모바일 ({'<'}768px)</span>
          <Badge variant={!isDesktop ? 'default' : 'secondary'}>{!isDesktop ? '활성' : '비활성'}</Badge>
        </div>
      </div>
      <p className='text-muted-foreground text-xs'>
        현재: <strong>{isLargeScreen ? '대형 화면 (≥1024px)' : isDesktop ? '태블릿 (768px~1023px)' : '모바일 (<768px)'}</strong>
        — 브라우저 창 크기를 줄여 변화를 확인하세요
      </p>
    </div>
  )
}

// useToggle 토글 데모
function ToggleDemo() {
  const [isDarkMode, toggleDarkMode] = useToggle(false)
  const [isExpanded, toggleExpanded] = useToggle(false)
  const [isEnabled, toggleEnabled, setEnabled] = useToggle(true)

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-6'>
        <div className='flex items-center gap-3'>
          <Switch id='toggle-dark' checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          <Label htmlFor='toggle-dark'>다크 모드 시뮬레이션: <strong>{isDarkMode ? '켜짐' : '꺼짐'}</strong></Label>
        </div>
        <div className='flex items-center gap-3'>
          <Switch id='toggle-expand' checked={isExpanded} onCheckedChange={toggleExpanded} />
          <Label htmlFor='toggle-expand'>패널 확장: <strong>{isExpanded ? '펼침' : '접힘'}</strong></Label>
        </div>
        <div className='flex items-center gap-3'>
          <Switch id='toggle-enable' checked={isEnabled} onCheckedChange={toggleEnabled} />
          <Label htmlFor='toggle-enable'>기능 활성화: <strong>{isEnabled ? '활성' : '비활성'}</strong></Label>
        </div>
      </div>
      <div className='flex gap-2'>
        <Button variant='outline' size='sm' onClick={() => setEnabled(true)}>활성화</Button>
        <Button variant='outline' size='sm' onClick={() => setEnabled(false)}>비활성화</Button>
      </div>
    </div>
  )
}

// 훅 데모 섹션 컴포넌트
interface HookSectionProps {
  hook: string
  description: string
  children: React.ReactNode
}

function HookSection({ hook, description, children }: HookSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <code className='bg-primary/10 text-primary rounded px-2 py-0.5 text-sm font-semibold'>{hook}</code>
          <Badge variant='secondary'>usehooks-ts</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

// usehooks-ts 훅 데모 콘텐츠
export default function HooksContent() {
  return (
    <div className='space-y-6'>
      <HookSection
        hook='useLocalStorage'
        description='브라우저 localStorage와 React 상태를 동기화합니다. 새로고침 후에도 값이 유지됩니다.'
      >
        <LocalStorageDemo />
      </HookSection>

      <HookSection
        hook='useDebounceValue'
        description='빠르게 바뀌는 입력값을 지정한 시간(ms) 이후에만 반영하여 불필요한 API 호출을 줄입니다.'
      >
        <DebounceDemo />
      </HookSection>

      <HookSection
        hook='useCopyToClipboard'
        description='텍스트를 클립보드에 복사하고 성공 여부를 반환합니다. 마지막으로 복사한 값도 추적합니다.'
      >
        <CopyToClipboardDemo />
      </HookSection>

      <HookSection
        hook='useMediaQuery'
        description='CSS 미디어 쿼리를 React 상태로 구독합니다. Sidebar의 모바일/데스크톱 분기에 활용됩니다.'
      >
        <MediaQueryDemo />
      </HookSection>

      <HookSection
        hook='useToggle'
        description='boolean 상태 토글을 간결하게 관리합니다. setValue로 직접 지정도 가능합니다.'
      >
        <ToggleDemo />
      </HookSection>
    </div>
  )
}
