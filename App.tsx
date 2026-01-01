
import React from 'react';
import AiFeatureBuilder from './AiFeatureBuilder';
import { NotificationProvider } from './components/NotificationContext';

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <div className="h-screen w-full">
        <AiFeatureBuilder />
      </div>
    </NotificationProvider>
  );
};

export default App;
