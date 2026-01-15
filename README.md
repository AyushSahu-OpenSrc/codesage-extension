<div align="center">
  <h1>🧠 CodeSage</h1>
  <p><strong>AI Programming Assistant for VS Code</strong></p>
</div>

## 🚀 Overview
CodeSage is a next-generation VS Code extension powered by **Anthropic Claude**. It provides highly accurate, context-aware code completions and inline documentation by deeply understanding your entire workspace.

Unlike traditional copilot tools that only read the currently open file, CodeSage uses **Tree-sitter** to parse the Abstract Syntax Tree (AST) of your entire repository, generating semantic embeddings stored in a local **Vector Database (ChromaDB)**.

## ✨ Features
* **Workspace Indexing:** Parses Python, TypeScript, and JavaScript files to map out functions, classes, and logic.
* **Semantic Code Search:** Instead of regex matching, search your codebase using natural language.
* **Context-Aware Completions:** Pulls highly relevant snippets from across the repository to feed Claude's context window.

## 🛠️ Technology Stack
* **Extension Framework:** VS Code Extension API
* **Language Models:** Anthropic Claude 3
* **Code Parsing:** Tree-sitter
* **Vector DB:** ChromaDB
* **Frontend UI:** React (Webview)

## 💻 Getting Started
1. Install the extension in VS Code.
2. Add your Anthropic API Key in Settings > CodeSage.
3. Run the command `CodeSage: Index Workspace` (Ctrl+Shift+I).
4. Start typing, and CodeSage will provide intelligent inline completions based on your workspace context.
