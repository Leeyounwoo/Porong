import { useRoutes } from 'react-router-dom'
import Alarm from './pages/Alarm';
import Login from './pages/Login';
import Main from './pages/Main';
import MessageDetail from './pages/MessegeDetail';
import SendMessage from './pages/SendMessage';



function App() {
  const routes = useRoutes([
    {
    path: '/',
    element: <Main/>
    },
    {
    path: '/login',
    element: <Login/>
    },
    {
    path: '/alarm',
    element: <Alarm/>
    },
    {
    path: '/detail',
    element: <MessageDetail/>
    },
    {
    path: '/send',
    element: <SendMessage/>
    },
  ])
  return routes;
}

export default App;
