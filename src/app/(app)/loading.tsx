import React from 'react'

const loading = () => {
  return (
    <div className="w-full h-full bg-loader fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800  border-solid rounded-full animate-spin"></div>
  </div>
  )
}

export default loading
