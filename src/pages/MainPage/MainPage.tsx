import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from '@ionic/react';
import { ellipse, gameController, settings, square, triangle } from 'ionicons/icons';
import Play from '../Play';
import Settings from '../Settings';
import Tab3 from '../Tab3';

const MainPage: React.FC = () => {
  const history = useHistory();

  // Prevents unauthenticated users from accessing this page
  useEffect(() => {
    const retrievedValue: string | null = localStorage.getItem('isAuthenticated');
    const isAuthenticated: boolean = retrievedValue ? JSON.parse(retrievedValue) : false; 

    if(!isAuthenticated) {
      history.replace('/login');
    }
  }, [history])

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home/play" component={Play} />
        <Route exact path="/home/settings" component={Settings} />

        {/* Redirect /home to /home/tab1 */}
        <Route exact path="/home" render={() => <Redirect to="/home/play" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="play" href="/home/play">
          <IonIcon aria-hidden="true" icon={gameController} />
          <IonLabel>Play</IonLabel>
        </IonTabButton>

        <IonTabButton tab="settings" href="/home/settings">
          <IonIcon aria-hidden="true" icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
        
      </IonTabBar>
    </IonTabs>
  );
};

export default MainPage;
