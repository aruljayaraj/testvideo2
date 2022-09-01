import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { IonContent } from '@ionic/react';
// import { lfConfig } from './Constants';
import PrivateRoute from './AuthGuard';

import Home from './app/pages/Home/Home';
import NoPage from './app/pages/NoPage/NoPage'; 

import Header from './app/components/Header/Header';
import Footer from './app/components/Footer/Footer';
//import Layout from './app/pages/Layout/Layout';



const LFRoutes: React.FC = () => {
      
    return (
      // <DebugRouter>
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
          <Suspense fallback={<div><h1>Loading...</h1></div>}>
            <Header />
            <IonContent>
              <Routes>
                  <Route path="/" element={<Home/>} />
        
                  <Route path="*" element={<NoPage />} />
              </Routes>
          </IonContent>
          <Footer/>
        </Suspense>  
      </BrowserRouter>
    // </DebugRouter>
    );
}

export default LFRoutes;
