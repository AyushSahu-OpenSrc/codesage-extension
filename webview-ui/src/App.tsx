import React, { useState } from 'react';
import { Bot, Send, Search } from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState('');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--vscode-font-family)', color: 'var(--vscode-foreground)' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Bot size={24} color="var(--vscode-textLink-foreground)" />
        <h2>CodeSage AI Assistant</h2>
      </header>
      
      <div className="chat-container" style={{ minHeight: '300px', border: '1px solid var(--vscode-panel-border)', padding: '10px', borderRadius: '5px' }}>
        <p><em>CodeSage is indexed and ready. Ask me anything about your workspace!</em></p>
      </div>
      
      <div style={{ display: 'flex', marginTop: '15px', gap: '10px' }}>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Claude..."
          style={{ 
            flex: 1, 
            padding: '8px', 
            background: 'var(--vscode-input-background)',
            color: 'var(--vscode-input-foreground)',
            border: '1px solid var(--vscode-input-border)',
            borderRadius: '4px'
          }}
        />
        <button style={{ 
            padding: '8px 12px', 
            background: 'var(--vscode-button-background)',
            color: 'var(--vscode-button-foreground)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
