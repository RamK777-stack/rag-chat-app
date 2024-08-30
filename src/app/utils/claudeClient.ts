import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateResponse(prompt: string, context: string): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    messages: [
      { role: 'user', content: `Context: ${context}\n\nHuman: ${prompt}` }
    ],
  });
  return response.content[0].type === 'text' ? response.content[0].text : '';
}
