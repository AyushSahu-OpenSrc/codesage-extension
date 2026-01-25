import Anthropic from '@anthropic-ai/sdk';
import * as vscode from 'vscode';

const anthropic = new Anthropic({
    apiKey: vscode.workspace.getConfiguration('codesage').get('claudeApiKey') || 'dummy-key',
});

export async function getClaudeCompletion(prompt: string): Promise<string> {
    try {
        const message = await anthropic.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 150,
            messages: [{ role: "user", content: prompt }]
        });
        
        // Note: The structure of Anthropic API response is slightly different in real implementation
        return (message.content[0] as any).text;
    } catch (error) {
        console.error("Error calling Claude API", error);
        return "";
    }
}

export async function generateEmbeddings(text: string): Promise<number[]> {
    // Claude does not provide embeddings directly, this would usually fall back to Cohere or OpenAI
    // Mocking an embedding array for the portfolio project
    return Array.from({ length: 1536 }, () => Math.random());
}
