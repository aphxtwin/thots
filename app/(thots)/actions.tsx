'use server'

import { nanoid } from '@/lib/utils'
import { createAI, getMutableAIState, streamUI, } from 'ai/rsc'
import { openai } from '@ai-sdk/openai'
import Thought from '@/components/Thought'
import { timeStamp } from 'console'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIState {
  messages: Message[]
}

async function submitUserMessage(
  message: { content: string }
): Promise<{ id: string, role: 'user' | 'assistant', content: string, timestamp: Date } | undefined> {
  'use server'
  
  const aiState = getMutableAIState<typeof AI>()
  const { content } = message
  const uniqueId = nanoid()

  if (!content?.trim()) return
  console.log(aiState.get().messages, 'aiState.get().messages')
  const userMessage: Message = {
    id: uniqueId,
    role: 'user',
    content,
    timestamp: new Date()
  }
    // Update the AI state with the new user message
  // Example server action update
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      userMessage
    ]
  });

  console.log(aiState.get().messages, 'aiState.get().messages')

  
  const result = await streamUI({
    model: openai('gpt-4'),
    system: `
    You are the consciousness of the user.
    You are a helpful assistant that can help the user achieve his goals.
    You can help the user with his doubts and questions.
    You're going to generate 5 posts as responses to the user post.
    Each post should be a separate thought.
    1. A philosophical take that empowers the user to the ubermensch.
    2. A humorous take that makes the user laugh.
    3. A factual response with context and insight that is not obvious and awakes curiosity.
    4. An introspective angle that is not obvious and opens new perspectives that the user might not have considered.
    5. A constructive take that guides the user to take action towards the achievement of his goals.
    `,
    messages: [
      ...aiState.get().messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ],
    text: async function* ({ content, done }) {
      try {
        yield <div className="animate-pulse">Generating perspectives...</div>
        
        if (done) {
          // Update AI state with the final message
          const updatedState = {
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: uniqueId,
                role: 'assistant',
                content,
                timestamp: new Date()
              }
            ]
          };
          
          // Update the AI state
          aiState.done(updatedState);
          
          // Return the final UI component
          return <Thought 
            author={'assistant'} 
            content={content} 
            timestamp={new Date()}
          />;
        }
      } catch (error) {
        console.error('Error in text generator:', error)
        throw error
      }
    }
  })
  console.log(result.value, 'result')

  return { id: uniqueId, role: userMessage.role, content: userMessage.content, timestamp: userMessage.timestamp}
  
}

export const AI = createAI({
  actions: {
    submitUserMessage
  },
  initialUIState: {
    messages: [] as Message[]
  },
  initialAIState: {
    messages: [] as Message[]
  }
})