import { ThemeControl } from 'components'
import './styles/index.css'
import { MainRouter } from 'routes'
import { Provider } from 'react-redux'
import { store } from 'store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Provider store={store}>
        <div className='bg-baseBackground h-[100vh] w-[100vw]'>
          <ThemeControl />
          <p className='text-3xl text-primary text-center font-normal'>This is code base project</p>
          <MainRouter />
          <ToastContainer />
        </div>
      </Provider>
    </>
  )
}

export default App
