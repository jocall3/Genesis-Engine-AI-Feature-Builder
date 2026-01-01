
import React from 'react';

interface Props {
  value: string;
  language: string;
  onChange: (val: string) => void;
}

export const Editor: React.FC<Props> = ({ value, language, onChange }) => {
  return (
    <div className="flex-grow flex flex-col bg-[#1e1e1e] border border-gray-800 rounded-lg overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-800">
        <span className="text-xs font-mono text-gray-400 uppercase">{language}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="flex-grow w-full p-4 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none focus:ring-0 leading-relaxed custom-scrollbar"
      />
    </div>
  );
};
