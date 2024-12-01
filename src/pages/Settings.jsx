import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { gameController, logOut } from 'ionicons/icons';
import { useEffect, useState } from 'react';

import '@ionic/react/css/palettes/dark.class.css';
import { useHistory } from 'react-router';

const Settings = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const history = useHistory();

  // Fetch data of the current user
  useEffect(() => {
    try {
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        const data = JSON.parse(currentUserData);
        setDarkMode(data.config.isDarkMode);
        setCurrentUser(data);
      }
    } catch (error) {
      console.error('Error parsing currentUser from localStorage:', error);
    }
  }, []);

  // For toggline dark mode
  const handleToggleChange = () => {
    const isDarkMode = event.detail.checked;
    setDarkMode(isDarkMode);

    // Update state for current user
    const updatedCurrentUser = {
      ...currentUser, 
      config: { 
        ...currentUser?.config, // Spread the existing config object if it exists
        isDarkMode: isDarkMode   // Update the isDarkMode property
      }
    };

    setCurrentUser(updatedCurrentUser)

    if (isDarkMode) {
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.documentElement.classList.remove('ion-palette-dark');
    }
  };

  const handleLogout = () => {
    // Remove currentUser
    localStorage.removeItem('currentUser');

    // Disable authentication
    localStorage.setItem('isAuthenticated', JSON.stringify(false));

    // Navigate to /login
    history.replace('/login');
  };

  // Render the page
  console.log(currentUser)
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList lines="full">
          <IonItem>
            <IonAvatar slot="start">
              <img alt="Silhouette of a person's head" src={currentUser?.profilePicture || "https://ionicframework.com/docs/img/demos/avatar.svg"} />
            </IonAvatar>
            <IonLabel>{currentUser?.username}</IonLabel>
          </IonItem>

          <IonItem>
            <IonToggle checked={darkMode} onIonChange={handleToggleChange}>
              <IonLabel>Enable Dark Mode</IonLabel>
            </IonToggle>
          </IonItem>

          <IonItem button onClick={handleLogout}>
            <IonLabel>Logout</IonLabel>
            <IonIcon aria-hidden="true" icon={logOut} />
          </IonItem>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;