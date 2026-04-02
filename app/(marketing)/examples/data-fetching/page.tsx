'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, AlertTriangle, Users, FileText } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// JSONPlaceholder API 타입 정의
interface Post {
  id: number
  userId: number
  title: string
  body: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

// 데이터 페칭 상태 타입
type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

interface FetchState<T> {
  data: T | null
  status: FetchStatus
  error: string | null
}

// 로딩 스켈레톤 (테이블용)
function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className='space-y-2'>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className='flex gap-4'>
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className='h-8 flex-1' />
          ))}
        </div>
      ))}
    </div>
  )
}

// 에러 상태 컴포넌트
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Alert variant='destructive'>
      <AlertTriangle className='h-4 w-4' />
      <AlertTitle>데이터를 불러오지 못했습니다</AlertTitle>
      <AlertDescription className='flex items-center justify-between'>
        <span>{message}</span>
        <Button variant='outline' size='sm' onClick={onRetry} className='ml-4 shrink-0'>
          <RefreshCw className='mr-1.5 h-3.5 w-3.5' />
          다시 시도
        </Button>
      </AlertDescription>
    </Alert>
  )
}

// Posts 탭 컴포넌트
function PostsTab() {
  const [state, setState] = useState<FetchState<Post[]>>({
    data: null,
    status: 'idle',
    error: null,
  })

  const fetchPosts = useCallback(async () => {
    setState({ data: null, status: 'loading', error: null })
    try {
      // 인위적 지연으로 로딩 상태 시각화
      await new Promise((r) => setTimeout(r, 800))
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Post[] = await res.json()
      setState({ data, status: 'success', error: null })
    } catch (err) {
      setState({ data: null, status: 'error', error: (err as Error).message })
    }
  }, [])

  // 에러 시뮬레이션
  const simulateError = useCallback(async () => {
    setState({ data: null, status: 'loading', error: null })
    await new Promise((r) => setTimeout(r, 600))
    setState({ data: null, status: 'error', error: '네트워크 연결을 확인해주세요 (시뮬레이션)' })
  }, [])

  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <Button onClick={fetchPosts} disabled={state.status === 'loading'} size='sm'>
          {state.status === 'loading' ? (
            <><RefreshCw className='mr-1.5 h-4 w-4 animate-spin' />불러오는 중...</>
          ) : (
            <><FileText className='mr-1.5 h-4 w-4' />Posts 가져오기</>
          )}
        </Button>
        <Button variant='outline' size='sm' onClick={simulateError} disabled={state.status === 'loading'}>
          에러 시뮬레이션
        </Button>
      </div>

      {state.status === 'idle' && (
        <p className='text-muted-foreground text-sm py-8 text-center'>
          버튼을 클릭하여 데이터를 불러오세요
        </p>
      )}

      {state.status === 'loading' && <TableSkeleton rows={6} cols={3} />}

      {state.status === 'error' && (
        <ErrorState message={state.error!} onRetry={fetchPosts} />
      )}

      {state.status === 'success' && state.data && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'>ID</TableHead>
              <TableHead className='w-16'>User</TableHead>
              <TableHead>제목</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.data.map((post) => (
              <TableRow key={post.id}>
                <TableCell className='font-mono text-xs text-muted-foreground'>{post.id}</TableCell>
                <TableCell>
                  <Badge variant='outline' className='text-xs'>#{post.userId}</Badge>
                </TableCell>
                <TableCell className='text-sm capitalize'>{post.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

// Users 탭 컴포넌트
function UsersTab() {
  const [state, setState] = useState<FetchState<User[]>>({
    data: null,
    status: 'idle',
    error: null,
  })

  const fetchUsers = useCallback(async () => {
    setState({ data: null, status: 'loading', error: null })
    try {
      await new Promise((r) => setTimeout(r, 600))
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: User[] = await res.json()
      setState({ data, status: 'success', error: null })
    } catch (err) {
      setState({ data: null, status: 'error', error: (err as Error).message })
    }
  }, [])

  return (
    <div className='space-y-4'>
      <Button onClick={fetchUsers} disabled={state.status === 'loading'} size='sm'>
        {state.status === 'loading' ? (
          <><RefreshCw className='mr-1.5 h-4 w-4 animate-spin' />불러오는 중...</>
        ) : (
          <><Users className='mr-1.5 h-4 w-4' />Users 가져오기</>
        )}
      </Button>

      {state.status === 'idle' && (
        <p className='text-muted-foreground text-sm py-8 text-center'>
          버튼을 클릭하여 데이터를 불러오세요
        </p>
      )}

      {state.status === 'loading' && <TableSkeleton rows={5} cols={4} />}

      {state.status === 'error' && (
        <ErrorState message={state.error!} onRetry={fetchUsers} />
      )}

      {state.status === 'success' && state.data && (
        <div className='grid gap-3 sm:grid-cols-2'>
          {state.data.map((user) => (
            <Card key={user.id} className='p-4'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='font-medium text-sm'>{user.name}</p>
                  <p className='text-muted-foreground text-xs'>@{user.username}</p>
                </div>
                <Badge variant='secondary' className='text-xs'>#{user.id}</Badge>
              </div>
              <div className='mt-2 space-y-0.5 text-xs text-muted-foreground'>
                <p>{user.email}</p>
                <p>{user.website}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// 데이터 페칭 패턴 예제 페이지
export default function DataFetchingExamplePage() {
  return (
    <Container>
      <Section>
        <div className='mb-6'>
          <Link href='/examples' className='text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors'>
            <ArrowLeft className='h-4 w-4' />
            예제 목록
          </Link>
        </div>

        <PageHeader
          title='데이터 페칭 패턴'
          description='로딩·에러·성공 상태를 명확하게 분리하는 Client Component 데이터 페칭 패턴입니다.'
          actions={<Badge>데이터</Badge>}
        />

        {/* 패턴 요약 */}
        <div className='mt-8 grid gap-3 sm:grid-cols-3'>
          {[
            { label: 'idle', desc: '초기 상태 — 요청 전', color: 'text-muted-foreground' },
            { label: 'loading', desc: 'Skeleton UI 표시', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'error', desc: 'Alert + 재시도 버튼', color: 'text-destructive' },
          ].map((s) => (
            <Card key={s.label} className='p-4'>
              <code className={`text-sm font-bold ${s.color}`}>{s.label}</code>
              <p className='text-muted-foreground text-xs mt-1'>{s.desc}</p>
            </Card>
          ))}
        </div>

        <div className='mt-8'>
          <Tabs defaultValue='posts'>
            <TabsList>
              <TabsTrigger value='posts'>
                <FileText className='mr-1.5 h-4 w-4' />Posts
              </TabsTrigger>
              <TabsTrigger value='users'>
                <Users className='mr-1.5 h-4 w-4' />Users
              </TabsTrigger>
            </TabsList>
            <TabsContent value='posts' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-base'>Posts 목록</CardTitle>
                  <CardDescription>
                    JSONPlaceholder API에서 포스트를 가져옵니다. 에러 시뮬레이션으로 에러 상태도 확인하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PostsTab />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='users' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-base'>Users 목록</CardTitle>
                  <CardDescription>
                    JSONPlaceholder API에서 사용자 목록을 카드 형태로 렌더링합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UsersTab />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Section>
    </Container>
  )
}
