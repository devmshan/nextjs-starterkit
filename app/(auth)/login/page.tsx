'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// zod 스키마 정의
const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력하세요').email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  })

  // 폼 제출 핸들러 (실제 API 연동 시 여기에 구현)
  const onSubmit = async (data: LoginFormValues) => {
    // 데모: 1초 지연 후 성공 토스트
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('로그인 데이터:', data)
    toast.success('로그인되었습니다')
  }

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl'>로그인</CardTitle>
        <CardDescription>이메일과 비밀번호로 로그인하세요</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* 이메일 필드 */}
          <div className='space-y-1.5'>
            <Label htmlFor='email'>이메일</Label>
            <Input
              id='email'
              type='email'
              placeholder='name@example.com'
              autoComplete='email'
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className='text-destructive text-xs'>{errors.email.message}</p>
            )}
          </div>

          {/* 비밀번호 필드 */}
          <div className='space-y-1.5'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='password'>비밀번호</Label>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground text-xs underline underline-offset-4'
              >
                비밀번호 찾기
              </a>
            </div>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              autoComplete='current-password'
              {...register('password')}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className='text-destructive text-xs'>{errors.password.message}</p>
            )}
          </div>

          {/* 로그인 상태 유지 */}
          <div className='flex items-center gap-2'>
            <Checkbox id='rememberMe' {...register('rememberMe')} />
            <Label htmlFor='rememberMe' className='font-normal cursor-pointer'>
              로그인 상태 유지
            </Label>
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        {/* 소셜 로그인 구분선 */}
        <div className='my-4 flex items-center gap-3'>
          <Separator className='flex-1' />
          <span className='text-muted-foreground text-xs'>또는</span>
          <Separator className='flex-1' />
        </div>

        {/* 소셜 로그인 버튼 (UI 데모) */}
        <Button variant='outline' className='w-full' type='button'>
          Google로 계속하기
        </Button>
      </CardContent>

      <CardFooter className='justify-center'>
        <p className='text-muted-foreground text-sm'>
          계정이 없으신가요?{' '}
          <a
            href='/signup'
            className='text-foreground font-medium underline underline-offset-4'
          >
            회원가입
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
