'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// zod 스키마 - 비밀번호 일치 및 강도 검증 포함
const signupSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상이어야 합니다').max(50, '이름이 너무 깁니다'),
    email: z.string().min(1, '이메일을 입력하세요').email('올바른 이메일 형식이 아닙니다'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다')
      .regex(/[A-Z]/, '대문자를 1개 이상 포함해야 합니다')
      .regex(/[0-9]/, '숫자를 1개 이상 포함해야 합니다'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력하세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다',
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  // 폼 제출 핸들러 (실제 API 연동 시 여기에 구현)
  const onSubmit = async (data: SignupFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('회원가입 데이터:', data)
    toast.success('회원가입이 완료되었습니다')
  }

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl'>회원가입</CardTitle>
        <CardDescription>계정을 만들어 시작하세요</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* 이름 필드 */}
          <div className='space-y-1.5'>
            <Label htmlFor='name'>이름</Label>
            <Input
              id='name'
              type='text'
              placeholder='홍길동'
              autoComplete='name'
              {...register('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className='text-destructive text-xs'>{errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor='password'>비밀번호</Label>
            <Input
              id='password'
              type='password'
              placeholder='대문자, 숫자 포함 8자 이상'
              autoComplete='new-password'
              {...register('password')}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className='text-destructive text-xs'>{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 필드 */}
          <div className='space-y-1.5'>
            <Label htmlFor='confirmPassword'>비밀번호 확인</Label>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='비밀번호를 다시 입력하세요'
              autoComplete='new-password'
              {...register('confirmPassword')}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className='text-destructive text-xs'>{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? '가입 중...' : '회원가입'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className='justify-center'>
        <p className='text-muted-foreground text-sm'>
          이미 계정이 있으신가요?{' '}
          <a
            href='/login'
            className='text-foreground font-medium underline underline-offset-4'
          >
            로그인
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
