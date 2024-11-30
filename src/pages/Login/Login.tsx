import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import styles from './Login.module.css';
import loginIcon from '../../../resources/images/whos-that-pokemon-logo.png';
import profilePicture from '../../../resources/images/default-profile.jpg';
import { useState } from 'react';
import { add } from 'ionicons/icons';

const Login: React.FC = () => {
  const profileUrl = '../../../resources/images/profiles/';

  const [profilePicture, setProfilePicture] = useState(`${profileUrl}profile1.webp`);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [errorInfo, setErrorInfo] = useState({
    header: 'Undefined header',
    message: 'Undefined message',
  })
  
  const profilePictures = [
    'profile1.webp',
    'profile2.webp',
    'profile3.webp',
    'profile4.webp',
    'profile5.webp',
    'profile6.webp',
    'diwata.webp',
  ];

  const handleLogin = () => {
    // Check if the user entered a username
    if(userName.length === 0) {
      setErrorInfo({
        header: 'Invalid Username',
        message: 'Please enter a valid username and try again',
      });
      setIsAlertOpen(true);
      return;
    }

    // Set info to localStorage. Store if empty, update if not.
    interface User {
      username: string;
      profilePicture: string;
      score: number;
    }


    if (localStorage.getItem('users') === null) {
      localStorage.setItem('users', JSON.stringify([{
        username: userName,
        profilePicture: profilePicture,
        score: 0,
      }]))
    } 
    
    else {
      const storedUsers = localStorage.getItem('users');
      const data: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if userName already exists
      let userNameAlreadyExist = false;
      for(let i = 0; i < data.length; i++) {
        if(data[i].username === userName) {
          // console.log(`${data[i].username} === ${userName}`)
          userNameAlreadyExist = true;
          break;
        } 
      }

      // Show error message if username already exists
      if(userNameAlreadyExist) {
        setErrorInfo({
          header: 'Invalid Username',
          message: `Username "${userName} already exists! Please enter a new one."`,
        });
        setIsAlertOpen(true);
        return;
      }

      // Insert user name to localStorage
      const updatedData = [...data, {
        username: userName,
        profilePicture: profilePicture,
        score: 0,
      }]

      localStorage.setItem('users', JSON.stringify(updatedData));
    }
  };

  const handleUserNameChange = (event: CustomEvent) => {
    setUserName(event.detail.value);
  };

  // console.log(userName);
  // console.log(profilePicture)
  return (
    <IonPage className={styles['loign-page']}>
     <IonContent className={`${styles['login-background']} ion-padding`}>
        <div className={styles['card-container']}>
          <img 
            src={loginIcon}
            alt="Who's that pokemon logo"
            width="200px"
          />

          <IonCard>
            <IonCardHeader className="ion-justify-content-center ion-align-items-center">
              <IonButton 
                className={styles['fit-content-button']}
                onClick={() => setIsOpen(true)}>
                <img 
                  src={profilePicture} 
                  alt="User profile picture" 
                  className={styles['profile-picture']}
                />
              </IonButton>

              <IonCardTitle className='ion-text-center'>What should people call you?</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonInput 
                className='ion-text-center'
                onIonInput={handleUserNameChange}
                value={userName}
                placeholder="Tap here to enter Username" 
                aria-label="Text"
              ></IonInput>

              <IonButton 
                className="ion-margin-top" 
                expand="full" 
                onClick={handleLogin}
              >
                Play Game
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Choose an Avatar Profile</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className={styles['profile-pictures-container']}>
              {profilePictures.map((fileName, index) => (
                <IonButton 
                  className={styles['fit-content-button']}
                  key={index}
                  onClick={() => {
                    setProfilePicture(profileUrl + fileName)
                    setIsOpen(false);
                  }}
                  id={fileName}>
                  <img 
                    src={profileUrl + fileName} 
                    alt="User profile picture" 
                    className={styles['profile-picture']}
                  />
                </IonButton>
              ))}
            </div>
          </IonContent>

          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonModal>

        <IonAlert
          isOpen={isAlertOpen}
          header={errorInfo.header}
          message={errorInfo.message}
          buttons={['Okay']}
          onDidDismiss={() => setIsAlertOpen(false)}>
        </IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Login;
