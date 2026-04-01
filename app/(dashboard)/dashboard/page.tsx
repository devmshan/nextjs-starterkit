import { Users, TrendingUp, ShoppingCart, DollarSign } from 'lucide-react'
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
import { Progress, ProgressLabel } from '@/components/ui/progress'
import { PageHeader } from '@/components/layout/page-header'

// 데모 통계 데이터
const stats = [
  {
    title: '전체 사용자',
    value: '12,345',
    change: '+12% 지난달 대비',
    icon: Users,
  },
  {
    title: '월간 매출',
    value: '₩4,820,000',
    change: '+8.2% 지난달 대비',
    icon: DollarSign,
  },
  {
    title: '신규 주문',
    value: '843',
    change: '+3.1% 지난주 대비',
    icon: ShoppingCart,
  },
  {
    title: '전환율',
    value: '3.24%',
    change: '+0.5% 지난달 대비',
    icon: TrendingUp,
  },
]

// 데모 최근 활동 데이터
const recentOrders = [
  { id: '#1024', user: '김민준', product: 'Pro 플랜', amount: '₩29,000', status: '완료' },
  { id: '#1023', user: '이서연', product: 'Basic 플랜', amount: '₩9,000', status: '처리중' },
  { id: '#1022', user: '박지훈', product: 'Enterprise', amount: '₩99,000', status: '완료' },
  { id: '#1021', user: '최수아', product: 'Pro 플랜', amount: '₩29,000', status: '취소' },
  { id: '#1020', user: '정태양', product: 'Basic 플랜', amount: '₩9,000', status: '완료' },
]

// 상태에 따른 Badge variant 매핑
const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  완료: 'default',
  처리중: 'secondary',
  취소: 'destructive',
}

// 채널별 트래픽 비율 (Progress 데모)
const trafficSources = [
  { label: '검색 엔진', value: 45 },
  { label: '직접 방문', value: 28 },
  { label: '소셜 미디어', value: 18 },
  { label: '기타', value: 9 },
]

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='대시보드'
        description='서비스 현황을 한눈에 확인하세요'
      />

      {/* 통계 카드 그리드 */}
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

      {/* 하단 2컬럼 */}
      <div className='grid gap-4 lg:grid-cols-3'>
        {/* 최근 주문 테이블 */}
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>최근 주문</CardTitle>
            <CardDescription>최근 5건의 주문 현황입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>고객</TableHead>
                  <TableHead>상품</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className='font-medium'>{order.id}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status] ?? 'secondary'}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 트래픽 소스 Progress */}
        <Card>
          <CardHeader>
            <CardTitle>트래픽 소스</CardTitle>
            <CardDescription>채널별 방문자 비율</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {trafficSources.map((source) => (
              <Progress key={source.label} value={source.value}>
                <ProgressLabel>{source.label}</ProgressLabel>
                {/* ProgressValue는 render function을 받으므로 span으로 직접 표시 */}
                <span className='ml-auto text-sm text-muted-foreground tabular-nums'>
                  {source.value}%
                </span>
              </Progress>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
