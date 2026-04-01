import { Suspense } from 'react'
import { DataPageClient } from './data-client'
import { TableSkeleton, PageHeaderSkeleton } from '@/components/loading-state'

// nuqs의 useQueryState는 useSearchParams를 내부적으로 사용하므로 Suspense 필요
export default function DataPage() {
  return (
    <Suspense
      fallback={
        <div className='space-y-6'>
          <PageHeaderSkeleton />
          <TableSkeleton rows={5} cols={5} />
        </div>
      }
    >
      <DataPageClient />
    </Suspense>
  )
}
