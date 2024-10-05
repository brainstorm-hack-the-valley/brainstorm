import React from 'react';
import Timer from '../../components/timer';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300">
      <Timer startTime={10} paused={false}/>
      {/* Other components go here */}
    </div>
  );
}

export default App;
