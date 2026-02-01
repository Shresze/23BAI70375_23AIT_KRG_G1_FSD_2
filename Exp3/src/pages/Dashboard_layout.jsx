import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Dashboard_layout() {
  return (
    <div className="container">
      <h1 className="page-title">DASHBOARD LAYOUT</h1>

      <Outlet />
    </div>
  )
}
