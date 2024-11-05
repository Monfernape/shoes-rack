import React from 'react'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-8 py-4 h-full">{children}</div>
  )
}