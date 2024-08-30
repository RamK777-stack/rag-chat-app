import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({ url: process.env.QDRANT_URL, apiKey: process.env.QDRANT_API_KEY });

// Add this new function to create a collection
export async function createCollection(collectionName: string, vectorSize: number) {
  try {
    await client.createCollection(collectionName, { vectors: { size: vectorSize, distance: 'Cosine' } });
    console.log(`Collection ${collectionName} created successfully.`);
  } catch (error) {
    console.error(`Error creating collection ${collectionName}:`, error);
    throw error;
  }
}

export async function uploadEmbeddings(collectionName: string, embeddings: number[][], payload: any[]) {
  try {
    // Check if the collection exists, if not, create it
    const collections = await client.getCollections();
    if (!collections.collections.some(c => c.name === collectionName)) {
      await createCollection(collectionName, embeddings[0].length);
    }

    const p = embeddings.map((vector, i) => ({
        id: i,
        vector,
        payload: payload[i],
      }))

    console.log(p)

    await client.upsert(collectionName, {
      wait: true,
      points: embeddings.map((vector, i) => ({
        id: i,
        vector,
        payload: payload[i],
      })),
    });
    console.log(`Embeddings uploaded to ${collectionName} successfully.`);
  } catch (error) {
    console.error(`Error uploading embeddings to ${collectionName}:`, error);
    throw error;
  }
}


export async function searchSimilar(collectionName: string, queryVector: number[], limit: number = 5) {
    try {
      const response = await client.search(collectionName, {
        vector: queryVector,
        limit,
        params: {
          exact: false,
          hnsw_ef: 128
        }
      });
      return response;
    } catch (error) {
      console.error(`Error searching similar vectors in ${collectionName}:`, error);
      throw error;
    }
  }
