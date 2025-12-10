import React from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import ProtectedLayout from './layout/ProtectedLayout'
import Home from './pages/Home'
import UpdateTodo from './components/UpdateTodo'
import AddTodo from './pages/AddTodo'

const App = () => {
  return (
    <Routes>
      <Route path='/login'element={<Login/>}/>
      <Route element={<ProtectedLayout/>}>
       <Route index element={<Home/>}/>
        <Route path="/update/:id" element={<UpdateTodo/>} />
        <Route path="/todo/add" element={<AddTodo/>}/>
      </Route>
    </Routes>
  )
}

export default App
