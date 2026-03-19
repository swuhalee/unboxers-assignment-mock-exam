import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import TutorialLayout from './pages/TutorialPage/TutorialLayout'
import TutorialPage from './pages/TutorialPage'
import ExamPage from './pages/ExamPage'
import ResultPage from './pages/ResultPage'
import FadeRoute from './components/Common/Route/FadeRoute'

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<TutorialLayout />}>
          <Route path="/" element={<FadeRoute element={<TutorialPage />} />} />
        </Route>
        <Route path="/exam" element={<FadeRoute element={<ExamPage />} />} />
        <Route path="/exam/result" element={<FadeRoute element={<ResultPage />} />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
