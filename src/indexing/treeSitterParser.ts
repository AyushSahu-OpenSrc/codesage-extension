import * as vscode from 'vscode';
import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';
import Python from 'tree-sitter-python';
import { storeEmbeddings } from './vectorDb';
import { generateEmbeddings } from '../api/claudeApi';

export async function indexWorkspace() {
    const parser = new Parser();
    const files = await vscode.workspace.findFiles('**/*.{js,ts,py}', '**/node_modules/**');

    for (const file of files) {
        const doc = await vscode.workspace.openTextDocument(file);
        const code = doc.getText();
        
        if (file.fsPath.endsWith('.py')) {
            parser.setLanguage(Python);
        } else {
            parser.setLanguage(JavaScript);
        }

        const tree = parser.parse(code);
        
        // Extract functions and classes
        const chunks = extractChunks(tree.rootNode, code);
        
        for (const chunk of chunks) {
            const embedding = await generateEmbeddings(chunk.text);
            await storeEmbeddings(file.fsPath, chunk, embedding);
        }
    }
}

function extractChunks(node: Parser.SyntaxNode, code: string): any[] {
    const chunks: any[] = [];
    // Recursively walk tree-sitter AST to find meaningful blocks (functions, classes)
    if (node.type === 'function_declaration' || node.type === 'class_definition') {
        chunks.push({
            text: code.substring(node.startIndex, node.endIndex),
            start: node.startPosition.row,
            end: node.endPosition.row
        });
    }
    
    for (let i = 0; i < node.childCount; i++) {
        chunks.push(...extractChunks(node.child(i)!, code));
    }
    return chunks;
}
