// App.js
// Main application component with improved layout

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="app">
      <PipelineToolbar />
      <main className="app-main">
        <PipelineUI />
      </main>
      <SubmitButton />
    </div>
  );
}

export default App;