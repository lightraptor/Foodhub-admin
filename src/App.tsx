import './styles/index.css'
import { MainRouter } from '@/routes'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider, NotiProvider } from './context'

function App() {
  return (
    <>
      <AuthProvider>
        <NotiProvider>
          <Provider store={store}>
            <MainRouter />
            <ToastContainer />
          </Provider>
        </NotiProvider>
      </AuthProvider>
    </>
  )
}

export default App
