import './styles/index.css'
import { MainRouter } from '@/routes'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider, BookingProvider } from './context'

function App() {
  return (
    <>
      <AuthProvider>
        <BookingProvider>
          <Provider store={store}>
            <MainRouter />
            <ToastContainer />
          </Provider>
        </BookingProvider>
      </AuthProvider>
    </>
  )
}

export default App
