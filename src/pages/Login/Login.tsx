import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import styles from './Login.module.css';
import loginIcon from '../../../resources/images/whos-that-pokemon-logo.png';
import profilePicture from '../../../resources/images/default-profile.jpg';
import { useState } from 'react';

const Login: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState('../../../resources/images/default-profile.jpg');

  return (
    <IonPage>
     <IonContent className="ion-padding">
        <div className={styles['card-container']}>
          <img 
            src={loginIcon}
            alt="Who's that pokemon logo"
            width="200px"
          />

          <IonCard>
            <IonCardHeader className="ion-justify-content-center ion-align-items-center">
              <IonButton className={styles['fit-content-button']}>
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
                placeholder="Enter Username here" 
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
