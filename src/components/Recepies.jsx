import React, {useState, useEffect} from 'react';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import "../App.scss";
import * as imageLoader from '../assets/prepare-food.json';
import Card from './Card'

function Recepies(props) {
    const list = []
    const [recepies, setRecepies] = useState({
            done: false,
            selected: false,
            selectionComplete: false,
            recepiesList: [],
            groceryList: [],
            selected: false
    });
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: imageLoader.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const confirmSelection = () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ list })
      };
        fetch('http://192.168.1.4:5001/Siri/ReactRecepies', requestOptions)
        // fetch('http://localhost:3000/groceryList')
          .then(response => response.json())
          .then(json => {
            setRecepies({
                ...recepies,
              groceryList: json,
              selectionComplete: true
            })
          })
          .catch(function() {
            console.log("error")
        })
      }
    const addToList = (recept, selected) => {
        if(selected){
            list.splice(recept, 1)
        }else{
            list.push(recept)
        }        
    }
    
    
    useEffect(() => {
        setRecepies({done: false});
        fetch("http://192.168.1.4:5001/Siri/Recepies")
        // fetch("http://localhost:3000/recepies")
        .then(response => response.json())
        .then(json => {
            setRecepies({
                recepiesList: json,
                done: true    
            })
        })
        .catch(function() {
            console.log("error")
        })
    }, [])

    const {recepiesList, done, selected, selectionComplete, groceryList} = recepies;
    return (
        <React.Fragment>
                <div>
                    {!done ? (
                        <FadeIn>
                            <div className="lottie">
                                <h2>Hämtar recept från Raspberry Pi</h2>
                            </div>
                            <Lottie options={defaultOptions} height={241} width={352} />
                        </FadeIn>
                    ) : (
                        <FadeIn>
                            {!selectionComplete ? (
                                <div>
                                    <div className='cards-slider-wrapper'>
                                        {recepiesList.map((recept, index) => (
                                        <Card
                                            onClick={(recept, selected) => addToList(recept, selected)}
                                            key={index}
                                            recepie={recept}
                                            index={index}
                                        />
                                    
                                    ))}
                                    </div>
                                    <button onClick={confirmSelection}>Slutför och generera inköpslista</button>
                                </div>
                            ) : (
                                <div>
                                    {groceryList.map((grocery, index) => (
                                    <h1>{grocery}</h1>
                                    ))}                    
                                </div>
                            )}
                        </FadeIn>
                    )}
                </div>
            </React.Fragment>
    );
}

export default Recepies;