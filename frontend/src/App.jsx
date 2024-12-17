import {Box, useColorModeValue} from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}> {/*Box to fill the entire screen. Size is marked by minHeight = 100vh*/}
      <Navbar /> {/* Navigation bar*/}
      <Routes>  {/*Router container, containing the different routes within the front-end application*/}
        <Route path= "/" element={<HomePage />} />
        <Route path= "/create" element={<CreatePage />} />
        <Route path= "/" element={<HomePage />} />
      </Routes>
    </Box>
  )
}

export default App
