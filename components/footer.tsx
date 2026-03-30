import { Separator } from '@/components/ui/separator'

// 사이트 푸터 컴포넌트
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='mt-auto'>
      <Separator />
      <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row'>
        <p className='text-sm text-muted-foreground'>
          © {currentYear} Next Starter. All rights reserved.
        </p>
        <p className='text-sm text-muted-foreground'>
          Built with{' '}
          <span className='font-medium text-foreground'>Next.js</span>,{' '}
          <span className='font-medium text-foreground'>Tailwind CSS v4</span>,{' '}
          <span className='font-medium text-foreground'>shadcn/ui</span>
        </p>
      </div>
    </footer>
  )
}
