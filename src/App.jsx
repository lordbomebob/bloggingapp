import { useRoutes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/Signin';
import SignupPage from './pages/Signup';
import ViewBlogDetailsPage from './pages/ViewBlogDetailsPage';
import ViewBlogsPage from './pages/ViewBlogsPage';
import { ViewFavoritePage } from './pages/ViewFavoritePage';

function App() {
  // React Router Setup

  const routes = useRoutes([
    {
      path: '/',
      element: <SignInPage />
    },
    {
      path: '/signup',
      element: <SignupPage />
    },
    {
      path: '/home',
      element: <HomePage />
    },
    {
      path: '/viewblogs',
      element: <ViewBlogsPage />
    },
    {
      path: '/viewblogs/:id',
      element: <ViewBlogDetailsPage />
    },
    {
      path:'viewfavorite/:uid',
      element:<ViewFavoritePage/>
    },
    {
      path: "*",
      element: <NotFoundPage />
    }

  ])

 return (
  <>
    <Navbar />
    {routes}
  </>
 )

}

export default App
