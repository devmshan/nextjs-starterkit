import { Sidebar } from '@/components/layout/sidebar'
import { DashboardHeader } from '@/components/layout/dashboard-header'

// 대시보드 레이아웃: 데스크톱 고정 사이드바 + 상단 헤더 + 콘텐츠
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* 데스크톱 사이드바 (모바일에서는 숨김) */}
      <Sidebar className='hidden md:flex' />

      {/* 메인 콘텐츠 영역 */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        <DashboardHeader />
        <main className='flex-1 overflow-y-auto p-4 md:p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}
