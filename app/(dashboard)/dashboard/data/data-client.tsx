'use client'

import { useState } from 'react'
import { useQueryState } from 'nuqs'
import { useDebounceValue } from 'usehooks-ts'
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { PageHeader } from '@/components/layout/page-header'
import { EmptyState } from '@/components/empty-state'

// 데모용 사용자 타입
type UserStatus = '활성' | '비활성' | '대기중'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: UserStatus
}

// 데모 초기 데이터
const initialUsers: User[] = [
  { id: 1, name: '김민준', email: 'minjun@example.com', role: '관리자', status: '활성' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '편집자', status: '활성' },
  { id: 3, name: '박지훈', email: 'jihun@example.com', role: '뷰어', status: '대기중' },
  { id: 4, name: '최수아', email: 'suah@example.com', role: '편집자', status: '비활성' },
  { id: 5, name: '정태양', email: 'taeyang@example.com', role: '뷰어', status: '활성' },
]

const statusVariant: Record<UserStatus, 'default' | 'secondary' | 'destructive'> = {
  활성: 'default',
  대기중: 'secondary',
  비활성: 'destructive',
}

// 빈 폼 초기값
const emptyForm = { name: '', email: '', role: '뷰어', status: '활성' as UserStatus }

export function DataPageClient() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [editTarget, setEditTarget] = useState<User | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // nuqs로 URL에 검색어와 상태 필터를 동기화
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const [statusFilter, setStatusFilter] = useQueryState('status', { defaultValue: '' })

  // 300ms 디바운스로 검색 성능 개선 (키 입력마다 필터링하지 않음)
  const [debouncedSearch] = useDebounceValue(search, 300)

  // 필터링된 사용자 목록 (디바운스된 검색어 사용)
  const filtered = users.filter((u) => {
    const matchSearch =
      debouncedSearch === '' ||
      u.name.includes(debouncedSearch) ||
      u.email.includes(debouncedSearch)
    const matchStatus = statusFilter === '' || u.status === statusFilter
    return matchSearch && matchStatus
  })

  // 다이얼로그 열기 (추가 또는 편집)
  const openDialog = (user?: User) => {
    if (user) {
      setEditTarget(user)
      setForm({ name: user.name, email: user.email, role: user.role, status: user.status })
    } else {
      setEditTarget(null)
      setForm(emptyForm)
    }
    setIsDialogOpen(true)
  }

  // 저장 (추가 또는 수정)
  const handleSave = () => {
    if (!form.name || !form.email) {
      toast.error('이름과 이메일을 입력하세요')
      return
    }
    if (editTarget) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editTarget.id ? { ...u, ...form } : u))
      )
      toast.success('사용자가 수정되었습니다')
    } else {
      const newUser: User = { id: Date.now(), ...form }
      setUsers((prev) => [...prev, newUser])
      toast.success('사용자가 추가되었습니다')
    }
    setIsDialogOpen(false)
  }

  // 삭제
  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    toast.success('사용자가 삭제되었습니다')
  }

  return (
    <div className='space-y-6'>
      <PageHeader
        title='사용자 관리'
        description='사용자 목록을 조회하고 관리합니다'
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger
              render={
                <Button onClick={() => openDialog()}>
                  <PlusIcon className='mr-1.5 h-4 w-4' />
                  사용자 추가
                </Button>
              }
            />

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editTarget ? '사용자 편집' : '사용자 추가'}</DialogTitle>
                <DialogDescription>
                  사용자 정보를 입력한 후 저장하세요
                </DialogDescription>
              </DialogHeader>

              <div className='space-y-3'>
                <div className='space-y-1.5'>
                  <Label htmlFor='userName'>이름</Label>
                  <Input
                    id='userName'
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder='홍길동'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='userEmail'>이메일</Label>
                  <Input
                    id='userEmail'
                    type='email'
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder='user@example.com'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='userRole'>역할</Label>
                  <select
                    id='userRole'
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    className='h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
                  >
                    {['관리자', '편집자', '뷰어'].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='userStatus'>상태</Label>
                  <select
                    id='userStatus'
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as UserStatus }))}
                    className='h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
                  >
                    {['활성', '비활성', '대기중'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <DialogFooter>
                <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleSave}>저장</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* 검색 + 필터 (nuqs URL 상태) */}
      <div className='flex flex-wrap gap-3'>
        <div className='relative flex-1 min-w-48'>
          <SearchIcon className='text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2' />
          <Input
            placeholder='이름 또는 이메일 검색'
            className='pl-8'
            value={search}
            onChange={(e) => setSearch(e.target.value || null)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value || null)}
          className='h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
        >
          <option value=''>전체 상태</option>
          <option value='활성'>활성</option>
          <option value='비활성'>비활성</option>
          <option value='대기중'>대기중</option>
        </select>
      </div>

      {/* 사용자 테이블 또는 Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchIcon}
          title='검색 결과 없음'
          description='조건에 맞는 사용자를 찾을 수 없습니다'
          action={
            <Button variant='outline' onClick={() => { setSearch(null); setStatusFilter(null) }}>
              필터 초기화
            </Button>
          }
        />
      ) : (
        <div className='rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className='text-right'>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='font-medium'>{user.name}</TableCell>
                  <TableCell className='text-muted-foreground'>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-1'>
                      {/* 편집 버튼 */}
                      <Button
                        variant='ghost'
                        size='icon'
                        aria-label='편집'
                        onClick={() => openDialog(user)}
                      >
                        <PencilIcon className='h-4 w-4' />
                      </Button>

                      {/* 삭제 확인 AlertDialog */}
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button variant='ghost' size='icon' aria-label='삭제' />
                          }
                        >
                          <TrashIcon className='h-4 w-4 text-destructive' />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>사용자 삭제</AlertDialogTitle>
                            <AlertDialogDescription>
                              <strong>{user.name}</strong> 사용자를 삭제하시겠습니까?
                              이 작업은 되돌릴 수 없습니다.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction
                              variant='destructive'
                              onClick={() => handleDelete(user.id)}
                            >
                              삭제
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
