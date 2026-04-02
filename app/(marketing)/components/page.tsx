'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight,
  Bell, CheckCircle, AlertTriangle, Info,
} from 'lucide-react'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { PageHeader } from '@/components/layout/page-header'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress, ProgressLabel } from '@/components/ui/progress'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// 섹션 래퍼 (쇼케이스용)
function ShowcaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold border-b pb-2'>{title}</h2>
      {children}
    </div>
  )
}

export default function ComponentsPage() {
  const [sliderValue, setSliderValue] = useState([40])
  const [switchOn, setSwitchOn] = useState(false)
  const [checked, setChecked] = useState(false)

  return (
    <Container>
      <Section>
        <PageHeader
          title='컴포넌트 쇼케이스'
          description='스타터킷에 포함된 모든 UI 컴포넌트를 한눈에 확인하세요'
        />

        <div className='mt-10 space-y-12'>

          {/* 버튼 */}
          <ShowcaseSection title='Button'>
            <div className='flex flex-wrap gap-3'>
              <Button>Default</Button>
              <Button variant='secondary'>Secondary</Button>
              <Button variant='outline'>Outline</Button>
              <Button variant='ghost'>Ghost</Button>
              <Button variant='destructive'>Destructive</Button>
              <Button variant='link'>Link</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Button size='sm'>Small</Button>
              <Button size='default'>Default</Button>
              <Button size='lg'>Large</Button>
              <Button size='icon'><Bell className='h-4 w-4' /></Button>
            </div>
          </ShowcaseSection>

          {/* Badge */}
          <ShowcaseSection title='Badge'>
            <div className='flex flex-wrap gap-2'>
              {(['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'] as const).map(
                (v) => <Badge key={v} variant={v}>{v}</Badge>
              )}
            </div>
          </ShowcaseSection>

          {/* 폼 요소 */}
          <ShowcaseSection title='Form Elements'>
            <div className='grid gap-4 sm:grid-cols-2 max-w-xl'>
              <div className='space-y-1.5'>
                <Label htmlFor='demo-input'>Input</Label>
                <Input id='demo-input' placeholder='텍스트를 입력하세요' />
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='demo-textarea'>Textarea</Label>
                <Textarea id='demo-textarea' placeholder='여러 줄 입력' rows={2} />
              </div>
              <div className='flex items-center gap-2'>
                <Switch
                  id='demo-switch'
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                />
                <Label htmlFor='demo-switch'>Switch: {switchOn ? '켜짐' : '꺼짐'}</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='demo-checkbox'
                  checked={checked}
                  onCheckedChange={(v) => setChecked(!!v)}
                />
                <Label htmlFor='demo-checkbox'>Checkbox</Label>
              </div>
            </div>
          </ShowcaseSection>

          {/* Toggle & ToggleGroup */}
          <ShowcaseSection title='Toggle / ToggleGroup'>
            <div className='flex flex-wrap gap-4 items-center'>
              <Toggle aria-label='굵게'>
                <Bold className='h-4 w-4' />
              </Toggle>
              <Toggle variant='outline' aria-label='기울임'>
                <Italic className='h-4 w-4' />
              </Toggle>
              <ToggleGroup aria-label='텍스트 서식'>
                <ToggleGroupItem value='bold' aria-label='굵게'><Bold className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value='italic' aria-label='기울임'><Italic className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value='underline' aria-label='밑줄'><Underline className='h-4 w-4' /></ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup aria-label='정렬'>
                <ToggleGroupItem value='left' aria-label='왼쪽'><AlignLeft className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value='center' aria-label='가운데'><AlignCenter className='h-4 w-4' /></ToggleGroupItem>
                <ToggleGroupItem value='right' aria-label='오른쪽'><AlignRight className='h-4 w-4' /></ToggleGroupItem>
              </ToggleGroup>
            </div>
          </ShowcaseSection>

          {/* Slider */}
          <ShowcaseSection title='Slider'>
            <div className='max-w-sm space-y-3'>
              <Slider
                defaultValue={sliderValue}
                onValueChange={(val) => setSliderValue(Array.isArray(val) ? [...val] : [val as number])}
                min={0}
                max={100}
              />
              <p className='text-muted-foreground text-sm'>값: {sliderValue[0]}</p>
            </div>
          </ShowcaseSection>

          {/* Progress */}
          <ShowcaseSection title='Progress'>
            <div className='max-w-sm space-y-3'>
              {[25, 50, 75, 100].map((v) => (
                <Progress key={v} value={v}>
                  <ProgressLabel>{v}%</ProgressLabel>
                </Progress>
              ))}
            </div>
          </ShowcaseSection>

          {/* Avatar */}
          <ShowcaseSection title='Avatar'>
            <div className='flex flex-wrap items-center gap-4'>
              <Avatar size='sm'><AvatarFallback>A</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
              <Avatar size='lg'><AvatarFallback>C</AvatarFallback></Avatar>
              <AvatarGroup>
                {['김', '이', '박', '최'].map((name) => (
                  <Avatar key={name}><AvatarFallback className='text-xs'>{name}</AvatarFallback></Avatar>
                ))}
              </AvatarGroup>
            </div>
          </ShowcaseSection>

          {/* Skeleton */}
          <ShowcaseSection title='Skeleton'>
            <div className='space-y-2 max-w-sm'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-1.5 flex-1'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-3 w-48' />
                </div>
              </div>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-4/5' />
            </div>
          </ShowcaseSection>

          {/* Alert */}
          <ShowcaseSection title='Alert'>
            <div className='space-y-3 max-w-lg'>
              <Alert>
                <Info />
                <AlertTitle>안내</AlertTitle>
                <AlertDescription>일반 안내 메시지입니다.</AlertDescription>
              </Alert>
              <Alert variant='destructive'>
                <AlertTriangle />
                <AlertTitle>경고</AlertTitle>
                <AlertDescription>위험한 작업에 대한 경고 메시지입니다.</AlertDescription>
              </Alert>
            </div>
          </ShowcaseSection>

          {/* Toast (Sonner) */}
          <ShowcaseSection title='Toast (Sonner)'>
            <div className='flex flex-wrap gap-2'>
              <Button variant='outline' onClick={() => toast.success('성공 메시지')}>
                <CheckCircle className='mr-1.5 h-4 w-4' /> Success
              </Button>
              <Button variant='outline' onClick={() => toast.error('오류 메시지')}>
                오류
              </Button>
              <Button variant='outline' onClick={() => toast.warning('경고 메시지')}>
                경고
              </Button>
              <Button variant='outline' onClick={() => toast.info('정보 메시지')}>
                정보
              </Button>
              <Button
                variant='outline'
                onClick={() => toast.loading('처리 중...', { duration: 2000 })}
              >
                로딩
              </Button>
            </div>
          </ShowcaseSection>

          {/* Tooltip */}
          <ShowcaseSection title='Tooltip'>
            <div className='flex gap-4'>
              <Tooltip>
                <TooltipTrigger render={<Button variant='outline' />}>
                  마우스 올리기
                </TooltipTrigger>
                <TooltipContent>툴팁 내용입니다</TooltipContent>
              </Tooltip>
            </div>
          </ShowcaseSection>

          {/* Tabs */}
          <ShowcaseSection title='Tabs'>
            <Tabs defaultValue='tab1' className='max-w-md'>
              <TabsList>
                <TabsTrigger value='tab1'>탭 1</TabsTrigger>
                <TabsTrigger value='tab2'>탭 2</TabsTrigger>
                <TabsTrigger value='tab3'>탭 3</TabsTrigger>
              </TabsList>
              <TabsContent value='tab1' className='mt-4'>
                <p className='text-sm text-muted-foreground'>탭 1의 콘텐츠입니다.</p>
              </TabsContent>
              <TabsContent value='tab2' className='mt-4'>
                <p className='text-sm text-muted-foreground'>탭 2의 콘텐츠입니다.</p>
              </TabsContent>
              <TabsContent value='tab3' className='mt-4'>
                <p className='text-sm text-muted-foreground'>탭 3의 콘텐츠입니다.</p>
              </TabsContent>
            </Tabs>
          </ShowcaseSection>

          {/* Accordion */}
          <ShowcaseSection title='Accordion'>
            <Accordion className='max-w-md'>
              {[
                { value: 'q1', trigger: '자주 묻는 질문 1', content: 'Lorem ipsum dolor sit amet consectetur.' },
                { value: 'q2', trigger: '자주 묻는 질문 2', content: 'Tailwind CSS v4는 CSS 기반으로 설정합니다.' },
                { value: 'q3', trigger: '자주 묻는 질문 3', content: 'shadcn/ui는 소스코드를 직접 소유하는 방식입니다.' },
              ].map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.trigger}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ShowcaseSection>

          {/* Card */}
          <ShowcaseSection title='Card'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {[
                { title: '기본 카드', description: '카드 설명 텍스트입니다', content: '카드 본문 내용' },
                { title: '통계 카드', description: '이번 달 총 매출', content: '₩4,820,000' },
                { title: '액션 카드', description: '빠른 작업 실행', content: '카드에 버튼이나 액션을 추가합니다' },
              ].map((card) => (
                <Card key={card.title}>
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm'>{card.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ShowcaseSection>

          <Separator />

          {/* 오버레이 컴포넌트 */}
          <ShowcaseSection title='Overlay — Dialog / Drawer'>
            <div className='flex flex-wrap gap-3'>
              {/* Dialog */}
              <Dialog>
                <DialogTrigger render={<Button variant='outline' />}>
                  Dialog 열기
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>다이얼로그 제목</DialogTitle>
                    <DialogDescription>
                      다이얼로그 설명 텍스트입니다. 모달 형식으로 중앙에 표시됩니다.
                    </DialogDescription>
                  </DialogHeader>
                  <p className='text-sm text-muted-foreground'>다이얼로그 본문 내용입니다.</p>
                  <DialogFooter showCloseButton>
                    <Button>확인</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Drawer */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant='outline'>Drawer 열기</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer 제목</DrawerTitle>
                    <DrawerDescription>
                      모바일 친화적인 바텀 시트 형태의 오버레이입니다.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className='p-4 text-sm text-muted-foreground'>
                    Drawer 본문 내용입니다. 모바일에서 바텀 시트로 동작합니다.
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </ShowcaseSection>

        </div>
      </Section>
    </Container>
  )
}
