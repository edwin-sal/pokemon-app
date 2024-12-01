import { IonAlert, IonButton, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import styles from './Play.module.css'
import { useEffect, useState } from 'react';
import pokemon from '../../../resources/images/gifs/mew.gif'
import PlayGame from './PlayGame/PlayGame';

const Play = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pokemonGif, setPokemonGif] = useState('../../../resources/images/gifs/mew.gif');
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [newHighScore, setNewHighScore] = useState(0);

  // Fetch data of the current user
  useEffect(() => {
    try {
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        const data = JSON.parse(currentUserData);
        setCurrentUser(data);
      }
    } catch (error) {
      console.error('Error parsing currentUser from localStorage:', error);
    }
  }, [newHighScore]);

  // Set pokemon gif
  useEffect(() => {
    const pokemons = [
      'bulasaur.gif',
      'dahon.gif',
      'makuhita.gif',
      'mew.gif',
      'pikachu.gif',
      'shell.gif',
      'muk.gif',
      'multo.gif',
      'squirtle.gif',
      'pikachu2.gif',
    ];

    const randomGif = pokemons[Math.floor(Math.random() * pokemons.length)];
    setPokemonGif('../../../resources/images/gifs/' + randomGif);
  }, []);

  console.log(props.generation);
  return (
    !isPlayingGame 
    ?
      <IonPage>
        <IonContent fullscreen className={styles['play-background']}>
          <div className={styles['play-button-container']}>
            <img 
              src={pokemonGif}
              alt="Pokemon gif"
              width="200px"
            />

            <IonButton onClick={() => setIsPlayingGame(true)} id="play-alert" size='large'>Play Game</IonButton>

            <IonLabel className='ion-margin-top'>
              <h1>High Score: {currentUser?.score}</h1>
            </IonLabel>
          </div>
          
        </IonContent>
      </IonPage>
    :
      <PlayGame 
        generation={props.generation} 
        goBack={() => setIsPlayingGame(false)} 
        setNewHighScore={setNewHighScore}
        setRefreshLocalstorage={props.setRefreshLocalstorage}
      />
    
  );
};

export default Play;
