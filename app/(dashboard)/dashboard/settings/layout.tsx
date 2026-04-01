import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PageHeader } from '@/components/layout/page-header'

// 설정 섹션 탭 목록
const settingsTabs = [
  { value: 'general', label: '일반', href: '/dashboard/settings' },
  { value: 'profile', label: '프로필', href: '/dashboard/settings/profile' },
  { value: 'notifications', label: '알림', href: '/dashboard/settings/notifications' },
]

// 설정 페이지 공통 레이아웃: Tabs 네비게이션 + 콘텐츠
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='설정'
        description='계정 및 서비스 환경을 관리하세요'
      />
      <Tabs defaultValue='general'>
        <TabsList>
          {settingsTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value='general' className='mt-6'>
          {children}
        </TabsContent>
        <TabsContent value='profile' className='mt-6'>
          {children}
        </TabsContent>
        <TabsContent value='notifications' className='mt-6'>
          {children}
        </TabsContent>
      </Tabs>
    </div>
  )
}
