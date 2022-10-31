import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <Routes>

      <Route path='/' element={<Layout />} >
        <Route index element={<Public />} />
        <Route path='/login' element={<Login />} />

        <Route path='dash' element={<DashLayout />} >{/* Dashboard starts here */}

          <Route index element={<Welcome />} />

          <Route path='notes'>
            <Route index element={<NotesList />} />
          </Route>

          <Route path='users'>
            <Route index element={<UsersList />} />
          </Route>
        
        </Route>{/* End of the dashboard */}

      </Route>
    </Routes>
  )
}

export default App
