
import { Route, Routes } from 'react-router-dom'

import PublicRoutes from './Public'
import React from 'react'

function ProtectedPage(): JSX.Element {
  return (
    <Routes >
      <Route path='/*' element={<PublicRoutes />} />
      <Route path='*' element={<>NOT FOUND</>} />
    </Routes>
  )
}

export default ProtectedPage
