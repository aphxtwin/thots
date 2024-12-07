import Navigation from '@/components/Navigation'
import Timeline from '@/components/Timeline'
import { AI } from '@/app/(thots)/actions'

export default function Home() {
  return (
    <AI initialAIState={{ messages: [] }}>
      <div className="flex">
      <div className="w-1/4 border-r border-zinc-800 fixed h-screen">
        <Navigation />
      </div>
      
      {/* Timeline Column */}
      <div className="w-3/4 ml-[25%]">
        <Timeline />
      </div>
    </div>
    </AI>

  )
}