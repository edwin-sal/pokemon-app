import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { gameController, logOut } from 'ionicons/icons';
import { useEffect, useState } from 'react';

import '@ionic/react/css/palettes/dark.class.css';

// Define the interface for the currentUser object
interface User {
  username: string;
  profilePicture: string;
  score: number;
}

const Settings: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // For toggline dark mode
  const handleToggleChange = (event: CustomEvent) => {
    const isDarkMode = event.detail.checked;
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.documentElement.classList.remove('ion-palette-dark');
    }
  };

  // Fetch data of the current user
  useEffect(() => {
    try {
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        const data: User = JSON.parse(currentUserData);
        setCurrentUser(data);
      }
    } catch (error) {
      console.error('Error parsing currentUser from localStorage:', error);
    }
  }, []);

  // Render the page
  console.log(darkMode)
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

          <IonItem button>
            <IonLabel>Logout</IonLabel>
            <IonIcon aria-hidden="true" icon={logOut} />
          </IonItem>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
