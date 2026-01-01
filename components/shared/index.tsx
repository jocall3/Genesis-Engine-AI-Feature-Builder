
import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg', message?: string }> = ({ size = 'md', message }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`${sizes[size]} border-gray-800 border-t-primary rounded-full animate-spin`} />
      {message && <span className="text-sm font-medium text-gray-400 font-mono animate-pulse uppercase tracking-tighter">{message}</span>}
    </div>
  );
};

export const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="p-8 prose prose-invert max-w-none prose-sm prose-pre:bg-gray-900 prose-headings:text-primary overflow-y-auto max-h-full custom-scrollbar">
      {content.split('\n').map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-primary mt-6 mb-4">{line.replace('# ', '')}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-gray-200 mt-6 mb-3">{line.replace('## ', '')}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-gray-300 mt-4 mb-2">{line.replace('### ', '')}</h3>;
        if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-4 text-gray-400 mb-1">{line.replace(/^[*-] /, '')}</li>;
        if (line.startsWith('```')) return null;
        return <p key={i} className="text-gray-400 mb-2 leading-relaxed">{line}</p>;
      })}
    </div>
  );
};
