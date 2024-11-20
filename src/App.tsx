import './styles/index.css'
import { MainRouter } from '@/routes'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Provider store={store}>
        <MainRouter />
        <ToastContainer />
      </Provider>
    </>
  )
}

export default App
