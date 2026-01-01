import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white/6 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
          >Live</button>
          <div className="text-sm text-white">Clicks: {count}</div>
        </div>
      </div>
    </div>
  )
}
