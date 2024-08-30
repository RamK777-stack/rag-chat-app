import { NextResponse } from 'next/server';
import { searchSimilar } from '../../utils/qdrantClient';
import { generateResponse } from '../../utils/claudeClient';
import { generateEmbedding } from '../../utils/embeddingGenerator';

export async function POST(request: Request) {
  const { query } = await request.json();
  console.log('query', query)

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    console.log('queryEmbedding', queryEmbedding)

    // Search for similar vectors in Qdrant
    const similarDocs = await searchSimilar('csv_collection', queryEmbedding?.data[0]?.embedding, 10);

    console.log('similarDocs', similarDocs)
    
    // Extract relevant context
    const context = similarDocs
      .filter(doc => doc.payload)
      .map(doc => doc.payload!.text)
      .join('\n');

    // Generate response using Claude
    const response = await generateResponse(query, context);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}