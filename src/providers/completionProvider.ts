import * as vscode from 'vscode';
import { getClaudeCompletion, generateEmbeddings } from '../api/claudeApi';
import { searchContext } from '../indexing/vectorDb';

export class CompletionProvider implements vscode.InlineCompletionItemProvider {
    async provideInlineCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        context: vscode.InlineCompletionContext,
        token: vscode.CancellationToken
    ): Promise<vscode.InlineCompletionItem[]> {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        
        // Basic debounce/trigger condition
        if (linePrefix.trim().length < 3) {
            return [];
        }

        // 1. Get embedding for current line context
        const embedding = await generateEmbeddings(linePrefix);
        
        // 2. Fetch semantic context from Vector DB
        const relevantContext = await searchContext(embedding);
        
        // 3. Ask Claude for completion using retrieved context
        const prompt = `Context:\n${relevantContext.join('\n')}\n\nComplete the following code:\n${linePrefix}`;
        const completionText = await getClaudeCompletion(prompt);

        if (!completionText) { return []; }

        return [new vscode.InlineCompletionItem(completionText)];
    }
}
