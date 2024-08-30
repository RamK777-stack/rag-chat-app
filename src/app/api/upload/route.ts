import { NextResponse } from 'next/server';
import { processCSV } from '../../utils/csvProcessor';
import { uploadEmbeddings } from '../../utils/qdrantClient';
import { generateEmbedding } from '../../utils/embeddingGenerator';

type CSVRow = string[];
type CSVData = CSVRow[];
type JSONRow = Record<string, string>;

function csvToJson(csvData: CSVData): JSONRow[] {
    const headers = csvData[0].map(header => header.trim());
    return csvData.slice(1)
        .filter(row => row.some(cell => cell.trim() !== ''))
        .map(row =>
            Object.fromEntries(
                headers.map((header, index) => [header, row[index]?.trim() ?? ''])
            )
        );
}

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {
        // Process CSV
        const arrayBuffer = await file.arrayBuffer();
        const csvData = await processCSV(arrayBuffer);

        console.log('csvData', csvData)
        const jsonData = csvToJson(csvData);

        // Extract the header and the rest of the rows
        const headers = csvData[0].map(header => header.trim());
        const dataRows = csvData.slice(1).filter(row => row.some(cell => cell.trim() !== ''));

        // Function to construct text from a row
        const constructText = (row) => {
            return row.map((cell, index) => `${headers[index]}: ${cell}`).join(', ');
        };
        // Prepare texts for embedding
        const texts = dataRows.map(constructText);

        console.log('texts', texts)

        // Join csvData into a single string
        const embeddingResponse = await generateEmbedding(texts);

        // Extract embeddings from the response
        const embeddings = embeddingResponse.data.map(item => item.embedding);

        // Upload to Qdrant
        await uploadEmbeddings('csv_collection', embeddings, csvData.map(text => ({ text })));

        return NextResponse.json({ message: 'File processed and uploaded successfully' });
    } catch (error) {
        console.error('Error processing file:', error);
        return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
    }
}