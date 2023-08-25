import { Route, Routes } from 'react-router-dom'
import HomePage from './Home'
import './index.scss'


const PublicRoutes = (): JSX.Element => {

  return (
    <div className='main-user'>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default PublicRoutes
