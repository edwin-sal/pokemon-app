import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonLabel, IonPage } from "@ionic/react";

import styles from './PlayGame.module.css';

export default function PlayGame(props) {

  const blackFilter = {
    filter: 'grayscale(100%) brightness(2%)',
  };  

  console.log(props.generation)
  return(
    <IonPage>
      <IonContent fullscreen className={styles['play-background']}>
        <div className={styles['play-game-container']}>
          <IonCard>
            <div className={`${styles['image-container']} ion-text-center ion-margin`}>
              <img 
                style={blackFilter}
                alt="Silhouette of mountains" 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/600.svg" 
                width={150}
              />
            </div>

            <IonCardHeader className="ion-text-center">
              <IonCardTitle>Who's that Pokémon?</IonCardTitle>
              <IonCardSubtitle>Tap a button below to answer</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <div className={styles['buttons-container']}>
                <IonButton>Pikachu</IonButton>
                <IonButton>KlingKlang</IonButton>
                <IonButton>Charizard</IonButton>
                <IonButton>Arceus</IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          <IonButton onClick={props.goBack} className="ion-margin">Go back</IonButton> 
        </div>
        
      </IonContent>
    </IonPage>
  );
}