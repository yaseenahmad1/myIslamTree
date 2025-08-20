import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Greetings from "../components/Greetings/Greetings"; 
import Homepage from '../components/Homepage/Homepage';
import CurrentUserGalleries from '../components/Galleries/CurrentUserGalleries'; // adding our current user gallery list
import CreateGalleryForm from '../components/Galleries/CreateGalleryForm'; // adding our create form for galleries 
import SingleGallery from '../components/Galleries/SingleGalleryPage'; 

export const router = createBrowserRouter([
  {
    path: "/", 
    element: <Greetings />,
  }, 
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Homepage />,
      },
      {
        path: "/my-galleries",    
        element: <CurrentUserGalleries />,
      },
      {
        path: "/create-a-gallery",
        element: <CreateGalleryForm />,
      },
      {
        path: "/galleries/:id",   
        element: <SingleGallery />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);