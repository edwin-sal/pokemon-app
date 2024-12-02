import { IonAlert, IonButton, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import styles from './Play.module.css'
import { useEffect, useState } from 'react';
import pokemon from '../../../resources/images/gifs/mew.gif'
import PlayGame from './PlayGame/PlayGame';
// import gif from '../../../public/images/gifs/mew.gif'

const Play = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pokemonGif, setPokemonGif] = useState(null);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [newHighScore, setNewHighScore] = useState(0);
  const [toggleRandomGif, setToggleRandomGif] = useState(false);

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
      // Bulbasaur
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fbulasaur.gif?alt=media&token=d05766ba-d0ef-4bfb-844d-437b923f69cd',

      // Dahon
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fdahon.gif?alt=media&token=ccc07c09-1044-467b-b8ce-c605848aa2b7',

      // Makuhita
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fmakuhita.gif?alt=media&token=76b6869f-b66a-4de8-99b8-83bd5ffcfb21',

      // Mew
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fmew.gif?alt=media&token=bfecbb38-9073-423f-aa90-65d71f2fd13a',

      // Pikachu
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fpikachu.gif?alt=media&token=c2d51bad-9dc8-46a4-92af-26f98dd74eaa',

      // Shell
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fshell.gif?alt=media&token=c3e131a8-95eb-496f-9d44-821758890ab1',

      // Muk
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fmuk.gif?alt=media&token=3d725845-b349-4aaa-ab5c-0f97e2c82e13',

      // Multo
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fmulto.gif?alt=media&token=0d19b963-6dd9-46cc-b67b-aa85a8ff314d',

      // Squirtle
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fsquirtle.gif?alt=media&token=f4e2f109-1b2e-46e7-aeb1-53a306cfb90c',

      // Pikachu 2
      'https://firebasestorage.googleapis.com/v0/b/studeefy-fb668.appspot.com/o/pokemon%2Fimages%2Fgifs%2Fpikachu2.gif?alt=media&token=d8ae2034-6b9d-4d7f-ad93-d329e30178dc',
    ];

    const randomGif = pokemons[Math.floor(Math.random() * pokemons.length)];
    setPokemonGif(randomGif);
  }, [toggleRandomGif]);

  console.log(props.generation);
  return (
    !isPlayingGame 
    ?
      <IonPage>
        <IonContent fullscreen className={styles['play-background']}>
          <div className={styles['play-button-container']}>
            <img 
              onClick={() => setToggleRandomGif(prevToggleRandomGif => !prevToggleRandomGif)}
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
