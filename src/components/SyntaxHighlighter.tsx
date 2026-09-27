import React from 'react';

interface SyntaxHighlighterProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language = 'kotlin',
  showLineNumbers = true,
}) => {
  const lines = code.trim().split('\n');

  // Syntax tokenizer regexes tailored to Kotlin, Python, Go, Rust, TS
  const highlightToken = (text: string) => {
    // If it's a comment
    if (text.startsWith('//') || text.startsWith('#')) {
      return <span style={{ color: '#5A6B87' }}>{text}</span>;
    }

    // Split words, string literals, and punctuation
    const tokens = text.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:fun|val|var|suspend|coroutineScope|async|awaitAll|def|class|asyncio|func|go|select|case|defer|return|struct|impl|pub|mut|let|const|function|import|from|dataclass)\b|\b(?:List|String|DeviceSummary|Job|Result|Context|User|Record|TokenStream|Option|usize|u8|int|float|bool)\b|\b\d+\b|[\(\)\{\}\[\]\.,;:<>=&\|!+\-*\/])/g);

    return tokens.map((token, i) => {
      if (!token) return null;

      // String literal
      if (token.startsWith('"') || token.startsWith("'")) {
        return <span key={i} style={{ color: '#C3E88D' }}>{token}</span>;
      }

      // Keywords
      if (/^(fun|val|var|suspend|coroutineScope|async|awaitAll|def|class|func|go|select|case|defer|return|struct|impl|pub|mut|let|const|function|import|from|dataclass)$/.test(token)) {
        return <span key={i} style={{ color: '#C792EA' }} className="font-medium">{token}</span>;
      }

      // Types / Interfaces
      if (/^(List|String|DeviceSummary|Job|Result|Context|User|Record|TokenStream|Option|usize|u8|int|float|bool)$/.test(token)) {
        return <span key={i} style={{ color: '#FFCB6B' }}>{token}</span>;
      }

      // Numbers
      if (/^\d+$/.test(token)) {
        return <span key={i} style={{ color: '#F78C6C' }}>{token}</span>;
      }

      // Punctuation / Operators
      if (/^[\(\)\{\}\[\]\.,;:<>=&\|!+\-*\/]$/.test(token)) {
        return <span key={i} style={{ color: '#8BA3C7' }}>{token}</span>;
      }

      // Functions (preceding opening paren)
      return <span key={i} style={{ color: '#E2E8F0' }}>{token}</span>;
    });
  };

  return (
    <pre className="m-0 font-mono text-[13px] leading-relaxed overflow-x-auto p-4 select-text">
      <code>
        {lines.map((line, idx) => (
          <div key={idx} className="table-row group">
            {showLineNumbers && (
              <span
                className="table-cell select-none pr-4 text-right text-xs"
                style={{ color: '#475569', minWidth: '2.5rem' }}
              >
                {idx + 1}
              </span>
            )}
            <span className="table-cell whitespace-pre font-mono">
              {highlightToken(line)}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
};
