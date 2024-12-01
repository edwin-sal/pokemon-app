import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { analytics, caretForwardCircleOutline, caretUpCircleOutline, chevronBackCircle, chevronForwardOutline, chevronUpCircle, chevronUpOutline, gameController, logOut, logOutOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';

import '@ionic/react/css/palettes/dark.class.css';
import { useHistory } from 'react-router';

const Settings = (props) => {
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
  const handleToggleChange = (event) => {
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
    setCurrentUser(updatedCurrentUser);

    // Update localStorage for currentUser
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));

    // Update localStorage for users
    let newUsers = JSON.parse(localStorage.getItem('users'));
    console.warn(newUsers);
    newUsers = newUsers.map(user => {
      if(updatedCurrentUser.username === user.username) {
        return updatedCurrentUser;
      } else {
        return user;
      }
    });
    localStorage.setItem('users', JSON.stringify(newUsers));

    // Toggle dark mode
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

    // Remove dark mode
    document.documentElement.classList.remove('ion-palette-dark');

    // Navigate to /login
    history.replace('/login');
  };

  // For selecting generation
  const handleGenerationChange = (e) => {
    const selectedValue = e.detail.value;
    props.setGeneration(selectedValue);
  };

  console.log(currentUser);
  console.log(props.generation)
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
            <IonLabel>View Leaderboards</IonLabel>
            <IonIcon aria-hidden="true" icon={analytics} />
          </IonItem>

          <IonItem>
            <IonSelect 
              onIonChange={handleGenerationChange}
              interface="action-sheet" 
              label="Select Generation" 
              placeholder="">
              <IonSelectOption value={1}>Generation 1</IonSelectOption>
              <IonSelectOption value={2}>Generation 2</IonSelectOption>
              <IonSelectOption value={3}>Generation 3</IonSelectOption>
              <IonSelectOption value={4}>Generation 4</IonSelectOption>
              <IonSelectOption value={5}>Generation 5</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem button onClick={handleLogout}>
            <IonLabel>Logout</IonLabel>
            <IonIcon aria-hidden="true" icon={logOutOutline} />
          </IonItem>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;