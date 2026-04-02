import { FileText, Eye, MessageSquare, ThumbsUp } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/page-header'

// 데모 통계 데이터
const stats = [
  { title: '전체 콘텐츠', value: '248', change: '+14개 이번달', icon: FileText },
  { title: '총 조회수', value: '143,200', change: '+32% 지난달 대비', icon: Eye },
  { title: '댓글', value: '1,842', change: '+21% 지난달 대비', icon: MessageSquare },
  { title: '좋아요', value: '9,140', change: '+17% 지난달 대비', icon: ThumbsUp },
]

// 데모 콘텐츠 목록
const contents = [
  { id: 1, title: 'Next.js 16 App Router 완벽 가이드', category: '튜토리얼', views: 12400, status: '게시됨', date: '2024-03-20' },
  { id: 2, title: 'Tailwind CSS v4 새로운 기능 소개', category: '블로그', views: 8900, status: '게시됨', date: '2024-03-18' },
  { id: 3, title: 'TypeScript 5.x 업데이트 정리', category: '블로그', views: 7300, status: '게시됨', date: '2024-03-15' },
  { id: 4, title: 'shadcn/ui 컴포넌트 활용법', category: '튜토리얼', views: 6100, status: '초안', date: '2024-03-14' },
  { id: 5, title: 'React 19 새로운 훅 완전 정복', category: '튜토리얼', views: 5400, status: '게시됨', date: '2024-03-10' },
  { id: 6, title: 'Prisma ORM 실전 사용기', category: '블로그', views: 4200, status: '검토중', date: '2024-03-08' },
]

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  게시됨: 'default',
  초안: 'secondary',
  검토중: 'secondary',
}

export default function ContentPage() {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='콘텐츠'
        description='게시된 콘텐츠를 관리하세요'
      />

      {/* 통계 카드 */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {stat.title}
                </CardTitle>
                <Icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>{stat.value}</p>
                <p className='text-xs text-muted-foreground mt-1'>{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 콘텐츠 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>콘텐츠 목록</CardTitle>
          <CardDescription>최근 등록된 콘텐츠입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>조회수</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>등록일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell className='font-medium max-w-[280px] truncate'>{content.title}</TableCell>
                  <TableCell className='text-sm text-muted-foreground'>{content.category}</TableCell>
                  <TableCell className='text-sm tabular-nums'>{content.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[content.status] ?? 'secondary'}>
                      {content.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>{content.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
