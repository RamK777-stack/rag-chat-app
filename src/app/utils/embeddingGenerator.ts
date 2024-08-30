import axios from 'axios';

export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const response = await axios.post(
            'https://api.voyageai.com/v1/embeddings',
            { input: text, model: 'voyage-2' },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
                },
            }
        );
        console.log(response.data)
        debugger
        return response.data;
    } catch (error) {
        debugger
        console.error('Error generating embedding:', error);
        throw error;
    }
}