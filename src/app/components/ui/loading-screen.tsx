'use client'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Logo with gradient */}
      <div className="mb-8">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center animate-pulse">
          <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
        </div>
      </div>

      {/* Loading animation */}
      <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin mb-8"></div>

      {/* "from CapturGram" text */}
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">from</p>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-lg">CapturGram</span>
          <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
        </div>
      </div>
    </div>
  )
}