"use server"

import { streamText } from "ai"
import { ollama } from "ollama-ai-provider"
import { createStreamableValue } from "ai/rsc"

export async function generate(
  input: string,
  system: string = "generate what the user wants, don't repeat content, and don't be too long"
) {
  const stream = createStreamableValue("")

  ;(async () => {
    const { textStream } = await streamText({
      model: ollama("phi3:latest"),
      prompt: input,
      system: system,
      temperature: 0.5,
    })

    for await (const delta of textStream) {
      stream.update(delta)
    }

    stream.done()
  })()

  return { output: stream.value }
}
