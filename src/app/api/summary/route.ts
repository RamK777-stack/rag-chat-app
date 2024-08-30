import { NextResponse } from 'next/server';
import { searchSimilar } from '../../utils/qdrantClient';
import { generateResponse } from '../../utils/claudeClient';

export async function GET() {
  try {
    // Fetch all documents from Qdrant (or a subset if there are too many)
    const allDocs = await searchSimilar('csv_collection', [], 100); // Adjust the limit as needed

    // Extract text from all documents
    const allText = allDocs.map(doc => doc?.payload?.text ?? '').join('\n');

    // Generate summary using Claude
    const summary = await generateResponse(
      "Please provide a concise summary of the following text:",
      allText
    );

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating the summary' },
      { status: 500 }
    );
  }
}