import { BarChart3, TrendingUp, Eye, MousePointerClick } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress, ProgressLabel } from '@/components/ui/progress'
import { PageHeader } from '@/components/layout/page-header'

// 데모 분석 통계
const stats = [
  { title: '총 방문자', value: '89,412', change: '+18% 지난달 대비', icon: Eye },
  { title: '페이지뷰', value: '241,300', change: '+22% 지난달 대비', icon: BarChart3 },
  { title: '클릭수', value: '34,210', change: '+9% 지난달 대비', icon: MousePointerClick },
  { title: '이탈률', value: '42.3%', change: '-2.1% 지난달 대비', icon: TrendingUp },
]

// 인기 페이지 데이터
const topPages = [
  { path: '/', title: '홈', views: 32100, rate: 80 },
  { path: '/dashboard', title: '대시보드', views: 18400, rate: 46 },
  { path: '/login', title: '로그인', views: 14200, rate: 36 },
  { path: '/components', title: '컴포넌트', views: 9800, rate: 25 },
  { path: '/examples', title: '예제', views: 7600, rate: 19 },
]

export default function AnalyticsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='분석'
        description='방문자 및 트래픽 데이터를 확인하세요'
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

      {/* 인기 페이지 */}
      <Card>
        <CardHeader>
          <CardTitle>인기 페이지</CardTitle>
          <CardDescription>이번 달 가장 많이 방문된 페이지</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {topPages.map((page) => (
            <div key={page.path} className='space-y-1'>
              <div className='flex items-center justify-between text-sm'>
                <span className='font-medium'>{page.title}</span>
                <span className='text-muted-foreground tabular-nums'>{page.views.toLocaleString()} 뷰</span>
              </div>
              <Progress value={page.rate}>
                <ProgressLabel>{page.path}</ProgressLabel>
                <span className='ml-auto text-xs text-muted-foreground tabular-nums'>
                  {page.rate}%
                </span>
              </Progress>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
