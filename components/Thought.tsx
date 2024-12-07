'use client'

type ThoughtProps = {
  content: string
  author: string
  timestamp: Date
}

export default function Thought({ content, author, timestamp }: ThoughtProps) {
  return (
    <div className="p-4 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800">
      <div className="flex items-center space-x-2 mb-1">
        <span className="font-bold">{author}</span>
        <span className="text-zinc-500 text-sm">
          {timestamp.toLocaleDateString()}
        </span>
      </div>
      <p className="text-zinc-200">{content}</p>
    </div>
  )
}