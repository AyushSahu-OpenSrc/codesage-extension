import * as vscode from 'vscode';
import { CompletionProvider } from './providers/completionProvider';
import { indexWorkspace } from './indexing/treeSitterParser';

export function activate(context: vscode.ExtensionContext) {
    console.log('CodeSage extension is now active!');

    // Register Inline Completion Provider
    const completionProvider = new CompletionProvider();
    vscode.languages.registerInlineCompletionItemProvider(
        { pattern: '**' }, 
        completionProvider
    );

    // Register Indexing Command
    let disposableIndex = vscode.commands.registerCommand('codesage.indexWorkspace', async () => {
        vscode.window.showInformationMessage('CodeSage: Indexing workspace for semantic search...');
        await indexWorkspace();
        vscode.window.showInformationMessage('CodeSage: Indexing complete!');
    });

    context.subscriptions.push(disposableIndex);
}

export function deactivate() {}
