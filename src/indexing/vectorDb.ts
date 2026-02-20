import { ChromaClient } from 'chromadb';

const client = new ChromaClient({ path: "http://localhost:8000" });

export async function storeEmbeddings(filePath: string, chunk: any, embedding: number[]) {
    const collection = await client.getOrCreateCollection({
        name: "codesage_workspace"
    });

    await collection.add({
        ids: [`${filePath}-${chunk.start}`],
        embeddings: [embedding],
        metadatas: [{ file: filePath, startLine: chunk.start, endLine: chunk.end }],
        documents: [chunk.text]
    });
}

export async function searchContext(queryEmbedding: number[]) {
    const collection = await client.getCollection({ name: "codesage_workspace" });
    
    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: 3
    });

    return results.documents[0];
}
