'use client'

import React, { useState } from 'react'
type ChatProps = {
  onSubmit: (message: string) => void
}

export default function Chat({ onSubmit }: ChatProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ messages: Message[] }>({ messages: [] });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      onSubmit(input)
     
      setInput('')
    }
  }

  return (
    <div className="w-full">
      <form
        className="flex w-full flex-col bg-neutral-800 rounded-xl p-4 space-y-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder="What's happening?"
          className="resize-none text-lg w-full text-zinc-200 bg-transparent placeholder-gray-500 focus:outline-none p-2 rounded-xl border border-zinc-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />
        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="bg-zinc-900 text-white font-semibold py-2 px-8 rounded-full hover:bg-zinc-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
            disabled={!input.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  )
}