import { useState, useEffect } from 'react'
import { useStore } from '../../store/useStore'

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(true) // Always open for debugging
  const [logs, setLogs] = useState<string[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const state = useStore()
  
  useEffect(() => {
    // Capture console logs
    const originalLog = console.log
    const originalError = console.error
    
    console.log = (...args) => {
      originalLog(...args)
      setLogs(prev => [...prev, args.join(' ')].slice(-20))
    }
    
    console.error = (...args) => {
      originalError(...args)
      setErrors(prev => [...prev, args.join(' ')].slice(-10))
    }
    
    // Capture unhandled errors
    const handleError = (event: ErrorEvent) => {
      setErrors(prev => [...prev, `ERROR: ${event.message} at ${event.filename}:${event.lineno}`].slice(-10))
    }
    
    window.addEventListener('error', handleError)
    
    return () => {
      console.log = originalLog
      console.error = originalError
      window.removeEventListener('error', handleError)
    }
  }, [])
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 text-lg font-bold"
      >
        Debug ({errors.length} errors)
      </button>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 text-white p-4 z-50 max-h-[50vh] overflow-auto border-t-4 border-red-500">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 text-white bg-red-500 px-3 py-1 rounded text-xl"
      >
        ×
      </button>
      
      <div className="mb-4">
        <h3 className="text-red-500 font-bold text-xl mb-2">🚨 Debug Panel</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-yellow-500 font-bold mb-1">App State:</h4>
            <div className="bg-black/50 p-2 rounded text-xs">
              <p>Events: {state.events.length}</p>
              <p>Loading: {state.isLoading ? 'YES' : 'NO'}</p>
              <p>View Mode: {state.viewMode}</p>
              <p>Quality: {state.quality}</p>
              <p>Current Event: {state.currentEventIndex}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-yellow-500 font-bold mb-1">Device:</h4>
            <div className="bg-black/50 p-2 rounded text-xs">
              <p>User Agent: {navigator.userAgent.slice(0, 50)}...</p>
              <p>Screen: {window.innerWidth}x{window.innerHeight}</p>
              <p>Touch: {('ontouchstart' in window) ? 'YES' : 'NO'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {errors.length > 0 && (
        <div className="mb-4">
          <h4 className="text-red-500 font-bold mb-1">❌ Errors ({errors.length}):</h4>
          <div className="bg-red-900/30 p-2 rounded text-xs max-h-32 overflow-y-auto">
            {errors.map((error, i) => (
              <div key={i} className="mb-1 text-red-300">{error}</div>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h4 className="text-green-500 font-bold mb-1">📋 Console Logs:</h4>
        <div className="bg-black/50 p-2 rounded text-xs max-h-32 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet...</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="mb-1 text-gray-300">{log}</div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DebugPanel