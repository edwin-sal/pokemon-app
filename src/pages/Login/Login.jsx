import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import styles from './Login.module.css';
import loginIcon from '../../../resources/images/whos-that-pokemon-logo.png';
import { useEffect, useState } from 'react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const profileUrl = '../../../resources/images/profiles/';
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePicture, setProfilePicture] = useState(`${profileUrl}profile1.webp`);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [errorInfo, setErrorInfo] = useState({
    header: 'Undefined header',
    message: 'Undefined message',
  });
  const [usersData, setUsersData] = useState([]); 

  // Prevents authenticated users from accessing this page
  useEffect(() => {
    const retrievedValue = localStorage.getItem('isAuthenticated');
    const isAuthenticated = retrievedValue ? JSON.parse(retrievedValue) : false; 

    if(isAuthenticated) {
      history.replace('/home');
    }
  }, [history])

  // Fetch data from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem('users');
      if(data) {
        const users = JSON.parse(data);
        setUsersData(users);
      }
    } 
    
    catch (error) {
      console.error(error);
    }
  }, [])
  
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
    if (userName.length === 0) {
      setErrorInfo({
        header: 'Invalid Username',
        message: 'Please enter a valid username and try again',
      });
      setIsAlertOpen(true);
      return;
    }

    // Define the user object
    let user = {  // Ensure the user object is typed as User
      profilePicture: profilePicture,
      score: 0,
      username: userName,
      config: {
        isDarkMode: false,
      },
    };

    // Check if user already exists
    let userAlreadyExists = false;
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].username === user.username) {
        userAlreadyExists = true;
        user = usersData[i];
        break;
      }
    }

    // Set profile picture of user
    user.profilePicture = profilePicture;

    const currentUsers = JSON.parse(localStorage.getItem('users'));
    const updatedUsers = currentUsers.map(storedUser => {
      if(storedUser.username === user.username) {
        return user;
      } else {
        return storedUser;
      }
    });

    console.warn(updatedUsers);

    // Add user if it does not exist yet
    if(!userAlreadyExists) {
      console.warn('adding new user!');
      const dataToSave = [...usersData, user];
      setUsersData(prevUsersData => (dataToSave));
      localStorage.setItem('users', JSON.stringify(dataToSave));
    } 
    
    else {
      console.warn('user already exist!');
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    // Add currentUser to localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Set authentication to true
    localStorage.setItem('isAuthenticated', JSON.stringify(true));

    history.replace('/home/play');
  };

  const handleUserNameChange = (event) => {
    setUserName(event.detail.value);
  };

  // console.log(userName);
  // console.log(profilePicture)
  // console.log(usersData);
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
}

export default Login;
