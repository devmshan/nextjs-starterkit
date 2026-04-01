'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const profileSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  bio: z.string().max(200, '소개는 200자 이하로 입력하세요').optional(),
  timezone: z.string(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

// 시간대 옵션 목록
const timezoneOptions = [
  { value: 'Asia/Seoul', label: '서울 (UTC+9)' },
  { value: 'America/New_York', label: '뉴욕 (UTC-5)' },
  { value: 'Europe/London', label: '런던 (UTC+0)' },
  { value: 'Asia/Tokyo', label: '도쿄 (UTC+9)' },
]

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '홍길동',
      email: 'hong@example.com',
      bio: 'Next.js 개발자입니다.',
      timezone: 'Asia/Seoul',
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log('프로필 데이터:', data)
    toast.success('프로필이 업데이트되었습니다')
  }

  return (
    <div className='space-y-6 max-w-2xl'>
      <Card>
        <CardHeader>
          <CardTitle>프로필 정보</CardTitle>
          <CardDescription>공개 프로필 정보를 수정합니다</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 아바타 업로드 UI */}
          <div className='mb-6 flex items-center gap-4'>
            <Avatar size='lg'>
              <AvatarFallback>홍</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
              <Button variant='outline' size='sm' type='button'>
                사진 변경
              </Button>
              <p className='text-muted-foreground text-xs'>JPG, PNG, GIF 최대 2MB</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {/* 이름 */}
            <div className='space-y-1.5'>
              <Label htmlFor='name'>이름</Label>
              <Input
                id='name'
                {...register('name')}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className='text-destructive text-xs'>{errors.name.message}</p>
              )}
            </div>

            {/* 이메일 */}
            <div className='space-y-1.5'>
              <Label htmlFor='email'>이메일</Label>
              <Input
                id='email'
                type='email'
                {...register('email')}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className='text-destructive text-xs'>{errors.email.message}</p>
              )}
            </div>

            {/* 자기소개 */}
            <div className='space-y-1.5'>
              <Label htmlFor='bio'>자기소개</Label>
              <Textarea
                id='bio'
                rows={3}
                placeholder='간단한 자기소개를 입력하세요'
                {...register('bio')}
                aria-invalid={!!errors.bio}
              />
              {errors.bio && (
                <p className='text-destructive text-xs'>{errors.bio.message}</p>
              )}
            </div>

            {/* 시간대 Select (HTML native) */}
            <div className='space-y-1.5'>
              <Label htmlFor='timezone'>시간대</Label>
              <select
                id='timezone'
                {...register('timezone')}
                className='h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
              >
                {timezoneOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '프로필 저장'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
