import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import styles from './Login.module.css';
import loginIcon from '../../../resources/images/whos-that-pokemon-logo.png';
import profilePicture from '../../../resources/images/default-profile.jpg';
import { useState } from 'react';

const Login: React.FC = () => {
  const profileUrl = '../../../resources/images/profiles/';

  const [profilePicture, setProfilePicture] = useState(`${profileUrl}default-profile.jpg`);
  const [isOpen, setIsOpen] = useState(false);
  
  const profilePictures = [
    'profile1.webp',
    'profile2.webp',
    'profile3.webp',
    'profile4.webp',
    'profile5.webp',
    'profile6.webp',
    'diwata.webp',
  ];

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
                placeholder="Tap here to enter Username" 
                aria-label="Text"
              ></IonInput>

              <IonButton 
                className="ion-margin-top" 
                expand="full" 
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
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Login;
