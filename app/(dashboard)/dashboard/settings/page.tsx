'use client'

import { toast } from 'sonner'
import { InfoIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function SettingsPage() {
  // 저장 핸들러 (데모: 토스트 피드백)
  const handleSave = () => {
    toast.success('설정이 저장되었습니다')
  }

  const handleDangerAction = () => {
    toast.error('계정이 삭제되었습니다', { description: '이 작업은 되돌릴 수 없습니다' })
  }

  return (
    <div className='space-y-6 max-w-2xl'>
      {/* 일반 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>일반 설정</CardTitle>
          <CardDescription>서비스 기본 설정을 관리합니다</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-1.5'>
            <Label htmlFor='siteName'>서비스 이름</Label>
            <Input id='siteName' defaultValue='Next Starter' />
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='siteUrl'>서비스 URL</Label>
            <Input id='siteUrl' defaultValue='https://example.com' type='url' />
          </div>
          <Button onClick={handleSave}>변경사항 저장</Button>
        </CardContent>
      </Card>

      {/* 알림 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>알림 설정</CardTitle>
          <CardDescription>이메일 및 푸시 알림을 설정합니다</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {[
            { id: 'emailMarketing', label: '마케팅 이메일', description: '새로운 기능 및 프로모션 안내' },
            { id: 'emailSecurity', label: '보안 알림', description: '로그인 및 계정 변경 알림' },
            { id: 'pushNotifications', label: '푸시 알림', description: '실시간 서비스 알림' },
          ].map((item) => (
            <div key={item.id} className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label htmlFor={item.id} className='cursor-pointer'>
                  {item.label}
                </Label>
                <p className='text-muted-foreground text-xs'>{item.description}</p>
              </div>
              <Switch id={item.id} defaultChecked={item.id === 'emailSecurity'} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* 위험 구역 */}
      <div className='space-y-4'>
        <h3 className='text-destructive text-sm font-semibold'>위험 구역</h3>
        <Alert variant='destructive'>
          <InfoIcon />
          <AlertTitle>계정 삭제</AlertTitle>
          <AlertDescription>
            계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다. 이 작업은 되돌릴 수 없습니다.
          </AlertDescription>
        </Alert>
        <Button variant='destructive' onClick={handleDangerAction}>
          계정 삭제
        </Button>
      </div>
    </div>
  )
}
