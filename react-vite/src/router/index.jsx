import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Greetings from "../components/Greetings/Greetings"; 
import Homepage from '../components/Homepage/Homepage';
import CurrentUserGalleries from '../components/Galleries/CurrentUserGalleries'; // adding our current user gallery list
import CreateGalleryForm from '../components/Galleries/CreateGalleryForm'; // adding our create form for galleries 
import SingleGallery from '../components/Galleries/SingleGalleryPage'; 
import EditGalleryForm from '../components/Galleries/EditGalleryForm';
import CreateJournalForm from '../components/Journals/CreateJournalForm';
import PrivateJournals from '../components/Journals/PrivateJournals';
import SingleJournalPage from '../components/Journals/SingleJournalPage';
import EditJournalForm from '../components/Journals/EditJournalForm';

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
        path: "/galleries/:galleryId/edit",
        element: <EditGalleryForm />,
      },
      {
        path: "/galleries/:galleryId",   
        element: <SingleGallery />,
      },
      {
        path: "/galleries/:galleryId/journals/new",
        element: <CreateJournalForm />,  // this is where the + button navigates
      },
      {
        path: "/my-private-journals",
        element: <PrivateJournals />,
      },
      {
        path: "/journals/:journalId",
        element: <SingleJournalPage />,
      },
      {
        path: "/journals/:journalId/edit",
        element: <EditJournalForm />,
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