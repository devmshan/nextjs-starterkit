import { Users, UserCheck, UserPlus, UserX } from 'lucide-react'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PageHeader } from '@/components/layout/page-header'

// 데모 통계 데이터
const stats = [
  { title: '전체 사용자', value: '12,345', change: '+12% 지난달 대비', icon: Users },
  { title: '활성 사용자', value: '9,821', change: '+8% 지난달 대비', icon: UserCheck },
  { title: '신규 가입', value: '342', change: '+24% 이번주 대비', icon: UserPlus },
  { title: '비활성', value: '2,524', change: '-3% 지난달 대비', icon: UserX },
]

// 데모 사용자 목록
const users = [
  { id: 1, name: '김민준', email: 'minjun@example.com', role: '관리자', status: '활성', joined: '2024-01-15' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '사용자', status: '활성', joined: '2024-02-03' },
  { id: 3, name: '박지훈', email: 'jihun@example.com', role: '사용자', status: '비활성', joined: '2024-02-18' },
  { id: 4, name: '최수아', email: 'sua@example.com', role: '편집자', status: '활성', joined: '2024-03-07' },
  { id: 5, name: '정태양', email: 'taeyang@example.com', role: '사용자', status: '활성', joined: '2024-03-22' },
  { id: 6, name: '한지민', email: 'jimin@example.com', role: '사용자', status: '정지', joined: '2024-04-10' },
]

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  활성: 'default',
  비활성: 'secondary',
  정지: 'destructive',
}

export default function UsersPage() {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='사용자'
        description='서비스 사용자 현황을 관리하세요'
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

      {/* 사용자 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
          <CardDescription>전체 등록 사용자 현황입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>가입일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarFallback className='text-xs'>
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium'>{user.name}</p>
                        <p className='text-xs text-muted-foreground'>{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-sm'>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[user.status] ?? 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>{user.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
