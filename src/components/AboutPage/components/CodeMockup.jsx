import React from 'react';
import '../styles/CodeMockup.css';

const CodeMockup = ({ language, fileName, code }) => {
  const getLanguageLabel = () => {
    const languages = {
      'jsx': 'React JSX',
      'js': 'JavaScript',
      'css': 'CSS',
      'html': 'HTML',
      'json': 'JSON'
    };

    return languages[language] || language;
  };

  // Simple syntax highlighting for demonstration
  const highlightSyntax = (code) => {
    if (language === 'jsx' || language === 'js') {
      // Highlight JSX/JS keywords
      code = code.replace(
        /(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|=>)/g,
        '<span class="keyword">$1</span>'
      );

      // Highlight strings
      code = code.replace(
        /(['"`])(.*?)(['"`])/g,
        '<span class="string">$1$2$3</span>'
      );

      // Highlight React components
      code = code.replace(
        /(<\/?)([A-Z][a-zA-Z]*)/g,
        '$1<span class="component">$2</span>'
      );

      // Highlight comments
      code = code.replace(
        /(\/\/.*|\/\*[\s\S]*?\*\/)/g,
        '<span class="comment">$1</span>'
      );
    }

    if (language === 'css') {
      // Highlight CSS properties
      code = code.replace(
        /([\w-]+)(\s*):(\s*)([^;]+)(;)/g,
        '<span class="property">$1</span>$2:$3<span class="value">$4</span>$5'
      );

      // Highlight selectors
      code = code.replace(
        /([.#][\w-]+)(\s*\{)/g,
        '<span class="selector">$1</span>$2'
      );
    }

    return code;
  };

  return (
    <div className="code-mockup">
      <div className="code-header">
        <div className="code-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="code-file-name">{fileName}</div>
        <div className="code-language">{getLanguageLabel()}</div>
      </div>
      <div className="code-content">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}></code>
        </pre>
      </div>
    </div>
  );
};

export default CodeMockup;
