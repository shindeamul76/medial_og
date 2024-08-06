
import React from 'react';
import PostPage from './components/PostPage';


const App: React.FC = () => {
  return (
    <div className="App grainy">
      <header className="App-header">
        <h1 className="text-2xl font-bold mb-6 text-center mt-2 text-teal-400">Create a Post</h1>
        <PostPage />
      </header>
    </div>
  );
};

export default App;