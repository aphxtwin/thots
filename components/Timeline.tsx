'use client'

import { useActions, useUIState } from 'ai/rsc'
import { AI } from '@/app/(thots)/actions'
import Thought from './Thought'
import Chat from './Chat'
import { useState } from 'react'

export default function Timeline() {
  const [isLoading, setIsLoading] = useState(false)
  const { submitUserMessage } = useActions()
  const [messages, setMessages] = useUIState<typeof AI>()
  
  
  const handleSubmit = async (message: string) => {
    try {
      setIsLoading(true)
      const userMessage = await submitUserMessage({ content: message })
      
      // Update UI state with new message
      setMessages(currentState => ({ messages: [...currentState.messages, userMessage] }))
    } catch (error) {
      console.error('Error submitting message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full space-y-8 p-4">
      <Chat onSubmit={handleSubmit} />
      {(!messages || messages.length === 0) ? (
        <div className="text-center text-gray-500">No messages yet</div>
      ) : (
        messages.messages.map((message) => (
          <div key={message.id} className="space-y-4">
            <Thought
              content={message.content}
              author={message.role === 'user' ? 'You' : 'Assistant'}
              timestamp={message.timestamp}
            />
          </div>
        ))
      )}
    </div>
  )
}