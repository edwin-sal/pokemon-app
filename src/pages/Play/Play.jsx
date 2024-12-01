import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import styles from './Play.module.css'
import { useEffect, useState } from 'react';
import pokemon from '../../../resources/images/gifs/mew.gif'

const Play = () => {
  const [pokemonGif, setPokemonGif] = useState('../../../resources/images/gifs/mew.gif');

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

  return (
    <IonPage>
      <IonContent fullscreen className="ion-flex ion-align-items-center ion-justify-content-center">
        <div className={styles['play-button-container']}>
          <img 
            src={pokemonGif}
            alt="Pokemon gif"
            width="200px"
          />

          <IonButton>Play Game</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Play;
