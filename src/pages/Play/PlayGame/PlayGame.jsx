import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonLabel, IonLoading, IonPage, IonText, IonToast, useIonLoading } from "@ionic/react";

import styles from './PlayGame.module.css';
import { useEffect, useRef, useState } from "react";
import fetchRandomPokemon from "../../../utils/fetchRandomPokemon";
import { Haptics } from "@capacitor/haptics";

export default function PlayGame(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [hiddenPokemon, setHiddenPokemon] = useState('');
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [present, dismiss] = useIonLoading();
  const [loading, setLoading] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [newFetch, setNewFetch] = useState(0);
  const [toast, setToast] = useState({
    message: 'Undefined message',
    isShown: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showHiddenPokemon, setShowHiddenPokemon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const audioRef = useRef(null);

  const blackFilter = {
    filter: 'grayscale(100%) brightness(2%)',
  };  

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
  }, []);

  // Fetch 4 random pokemon
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Play who's that pokemon
        playAudio();

        setLoading(true);
        const pokemon1 = await fetchRandomPokemon(props.generation);
        const pokemon2 = await fetchRandomPokemon(props.generation);
        const pokemon3 = await fetchRandomPokemon(props.generation);
        const pokemon4 = await fetchRandomPokemon(props.generation);
        const randomPokemonsContainer = [pokemon1, pokemon2, pokemon3, pokemon4];
        const randomIndex = Math.floor(Math.random() * randomPokemonsContainer.length);
        // console.warn(randomIndex);

        

        setRandomPokemons(randomPokemonsContainer);
        setHiddenPokemon(randomPokemonsContainer[randomIndex]);
        setIsAnswerSelected(false);
      } 
      
      catch (error) {
        console.error(error);
      } 

      finally {
        setLoading(false);
      }
    };

    console.log(hiddenPokemon);
    fetchData();   
  }, [newFetch]);

  // Handle answer of user by clicking one of the choices
  const handleSelectAnswer = async (userPick) => {
    const isCorrectAnswer = userPick.name === hiddenPokemon.name;
    let score = currentScore;

    // Show hidden pokemon
    setShowHiddenPokemon(true);

    // Disabled buttons so no duplicates
    setIsAnswerSelected(true);
    

    // Update score
    if(isCorrectAnswer) {
      setCurrentScore(prevCurrentScore => prevCurrentScore += 1);
      score++;

    } else {
      // Vibrate
      await Haptics.vibrate();

      setShowAlert(true);

      // For hiding the next button
      setIsLost(true);
    }

    // Update high score if exceeded
    if(score > currentUser.score) {
      console.error(`New high scoire! ${score}`);

      // Update currentUser on state and localStorage
      setCurrentUser(prevCurrentUser => {
        const updatedCurrentUser = {...prevCurrentUser, score: score};

        // Update currentUser on localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));

        // Update users on localStorage
        let updatedUsers = JSON.parse(localStorage.getItem('users'));
        updatedUsers = updatedUsers.map(user => {
          if(user.username === currentUser.username) {
            return updatedCurrentUser;
          } else {
            return user;
          }
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Update this dependency state so it will fetch the new high score back in Play.jsx
        props.setNewHighScore(prevNewHighScore => prevNewHighScore += 1);

        return updatedCurrentUser;
      });

      // Update useEffect dependency for fetching users in Settings
      props.setRefreshLocalstorage(prevValue => prevValue += 1);
    }

    // Display result in a toast
    setToast({
      message: isCorrectAnswer ? 'You won!' : 'You lost!',
      isShown: true,
    });
  };

  // Play sound of pokemon
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // console.log(props.generation);
  // console.log(randomPokemons);
  console.log(hiddenPokemon);
  // console.log(currentUser);
  // console.log(showAlert);
  return(
    <IonPage>
      <IonLoading
        isOpen={loading}
        message={'Searching for wild Pokémon...'}
      />

      <IonToast
        isOpen={toast.isShown}
        message={toast.message}
        onDidDismiss={() => setToast(prevToast => ({...prevToast, isShown: false}))}
        duration={2000}
        buttons={[
          {
            text: 'Dismiss',
            role: 'cancel',
            handler: () => {
              console.log('Dismiss clicked');
            },
          },
        ]}>
      </IonToast>

      <IonAlert
        isOpen={showAlert}
        header="Oops, that’s not the one!"
        // subHeader={`Your score: ${currentScore}`}
        message={`Say hello to ${hiddenPokemon.name?.toUpperCase()}!`}
        buttons={['Go back']}
        onDidDismiss={() => {
          setShowAlert(false);
          props.goBack();
        }}>
      </IonAlert>

      <IonContent fullscreen className={`${styles['play-background']} ion-padding`}>
        <div className={styles['play-game-container']}>
          <IonText color="primary">
            <h1>Score: {currentScore}</h1>
          </IonText>
          <IonCard style={{width: '100%'}}>
            <div className={`${styles['image-container']} ion-text-center ion-margin`}>
              <img 
                style={!showHiddenPokemon ? blackFilter : {}}
                alt="Silhouette of a Pokemon" 
                src={hiddenPokemon?.sprite} 
                width={150}
              />
            </div>

            <IonCardHeader className="ion-text-center">
              <IonCardTitle>Who's that Pokémon?</IonCardTitle>
              <IonCardSubtitle>
                {isAnswerSelected ? `It's ${hiddenPokemon.name.toUpperCase()}!` : 'Tap a button below to answer'} 
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <div className={styles['buttons-container']}>
                {randomPokemons.map((pokemon, index) => (
                  <IonButton disabled={isAnswerSelected} onClick={() => handleSelectAnswer(pokemon)} key={index}>{pokemon.name}</IonButton>
                ))}
              </div>
            </IonCardContent>
          </IonCard>

          <div>
            <IonButton 
              onClick={props.goBack} 
              className="ion-margin" 
              style={{width: '120px'}}>
              Go back
            </IonButton> 
            
            {(showHiddenPokemon && !isLost) &&
              <IonButton 
                color="success"
                onClick={() => {
                  // Fetch new pokemon
                  setNewFetch(prevNewFetch => prevNewFetch += 1);
                  setShowHiddenPokemon(false);
                }} 
                className="ion-margin" 
                style={{width: '120px'}}>
                Next
              </IonButton>
            }
          </div>
        </div>
        
      </IonContent>
      <audio ref={audioRef} src={'https://shorturl.at/vHj94'} preload="auto" />
    </IonPage>
  );
}