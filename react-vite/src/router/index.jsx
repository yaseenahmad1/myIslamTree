import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Greetings from "../components/Greetings/Greetings"; 

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
        element: <h1>Welcome!</h1>,
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