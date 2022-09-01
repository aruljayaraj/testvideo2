import React from 'react';
import { IonApp } from '@ionic/react';
import { setupIonicReact } from '@ionic/react';
import LFRoutes from './Routes';

setupIonicReact({
  mode: 'md'
});


const App: React.FC = () => {
  return (
    <IonApp>
        <LFRoutes />
    </IonApp>
  );
}

export default App;
