import React from 'react'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import HomePage from './components/HomePage'
import TypeChartEditor from './components/TypeChartEditor'
import TypeSystemProvider from './context/TypeSystemContext'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"
// import { Create } from '@mui/icons-material'
import CreateVSystemForm from './components/CreateVSystemForm'
import Header from './components/Header'
// import Footer from './components/Footer'

const theme = createTheme()

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TypeSystemProvider>
        <Box maxWidth="lg" className='wrapper' style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <Header />
          <Outlet />
        </Box>
      </TypeSystemProvider>
    </ThemeProvider>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "edit",
        element: <TypeChartEditor />
      },
      {
        path: 'new',
        element: <CreateVSystemForm />
      }
    ]
  },
]);

const App: React.FC = () => <RouterProvider router={router} />

if ((import.meta as any).hot) {
  (import.meta as any).hot.dispose(() => router.dispose());
}

export default App