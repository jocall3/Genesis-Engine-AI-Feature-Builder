
import React, { useState } from 'react';
import { ProjectNode, GeneratedFile } from '../types';
import { Icons } from '../constants';

interface Props {
  tree: ProjectNode;
  onFileSelect: (file: GeneratedFile) => void;
}

export const ProjectTreeViewer: React.FC<Props> = ({ tree, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (tree.type === 'file') {
    return (
      <div 
        onClick={() => onFileSelect({ filePath: tree.path, content: tree.content || '' })}
        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-800 cursor-pointer rounded text-sm text-gray-400 hover:text-white transition-colors"
      >
        <Icons.File />
        <span className="truncate">{tree.name}</span>
      </div>
    );
  }

  return (
    <div className="select-none">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-800 cursor-pointer rounded text-sm font-medium text-gray-300 transition-colors"
      >
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
        </div>
        <Icons.Folder />
        <span className="truncate">{tree.name}</span>
      </div>
      {isOpen && tree.children && (
        <div className="ml-4 border-l border-gray-800">
          {tree.children.map(child => (
            <ProjectTreeViewer key={child.id} tree={child} onFileSelect={onFileSelect} />
          ))}
        </div>
      )}
    </div>
  );
};
