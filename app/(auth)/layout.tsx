import Link from 'next/link'

// 인증 전용 레이아웃: Header/Footer 없이 중앙 정렬 카드 구조
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center px-4 py-12'>
      {/* 로고 */}
      <Link href='/' className='mb-8 flex items-center gap-2 font-bold text-lg'>
        <span className='text-primary'>Next</span>
        <span>Starter</span>
      </Link>

      {/* 인증 카드 영역 */}
      <div className='w-full max-w-sm'>{children}</div>

      {/* 하단 링크 */}
      <p className='text-muted-foreground mt-8 text-center text-xs flex items-center justify-center gap-3'>
        <Link href='/examples' className='hover:text-foreground underline underline-offset-4'>
          ← 예제 목록
        </Link>
        <span>·</span>
        <Link href='/' className='hover:text-foreground underline underline-offset-4'>
          홈으로 돌아가기
        </Link>
      </p>
    </main>
  )
}
