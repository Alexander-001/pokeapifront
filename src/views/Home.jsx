import React, { useEffect, useState } from "react";
import "../styles/home.css";
import "../styles/colors.css";
import PokeLogo from "../images/logo.png";
import Loader from "../components/Loader";
import ErrorModal from "../components/ErrorModal";
import PokemonModal from "../components/PokemonModal";
import { ServicesAPI } from "../api/services";
import { ACTION_SERVICE_GET_ALL_POKEMON } from "../constants/constants";

const Home = () => {
  const [listPokemons, setListPokemons] = useState([]);
  const [successService, setSuccessService] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalPokemon, setShowModalPokemon] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [onCountChange, setOnCountChange] = useState(20);
  const [pokemonData, setPokemonData] = useState({});

  const callServicePokemon = async (limit) => {
    try {
      const response = await ServicesAPI.callService({
        action: ACTION_SERVICE_GET_ALL_POKEMON,
        limit,
      });
      if (response.status === 200 && response.data.pokeApi) {
        const { pokeApi } = response.data;
        return pokeApi;
      } else {
        throw new Error("error in request service");
      }
    } catch (error) {
      console.log("error loading service:", error);
      setSuccessService(false);
      setShowLoader(false);
      setShowModalError(true);
    }
  };

  const getAllPokemons = async (number) => {
    try {
      setShowLoader(true);
      let arrayListPokemon = [];
      for (let i = 1; i <= number; i++) {
        const pokeApi = await callServicePokemon(i);
        if (pokeApi === undefined) {
          throw new Error("error load service");
        }
        arrayListPokemon.push(pokeApi);
      }
      setShowLoader(false);
      setSuccessService(true);
      setListPokemons(arrayListPokemon);
    } catch (error) {
      console.log("error loading service:", error);
      setSuccessService(false);
      setShowLoader(false);
    }
  };

  const reloadPokemon = async () => {
    try {
      setShowLoader(true);
      for (let i = onCountChange + 1; i <= onCountChange + 20; i++) {
        const pokeApi = await callServicePokemon(i);
        listPokemons.push(pokeApi);
      }
      setShowLoader(false);
      setSuccessService(true);
      setOnCountChange(onCountChange + 20);
    } catch (error) {
      console.log("error loading service:", error);
      setSuccessService(false);
      setShowLoader(false);
    }
  };

  const openPokemonModal = (value, types, stats) => {
    const image = value.getAttribute("image");
    const name = value.getAttribute("name");
    const id = value.getAttribute("id");
    const dataModal = { image, name, id, types, stats };
    setPokemonData(dataModal);
    setShowModalPokemon(true);
  };

  const openClosePokemonModal = () => {
    setShowModalPokemon(!showModalPokemon);
  };

  const openCloseErrorModal = () => {
    setShowModalError(!showModalError);
  };

  const getPokemonClass = (type) => {
    let pokemonClass = "";
    switch (type) {
      case "grass":
        pokemonClass = "green";
        return pokemonClass;
      case "poison":
        pokemonClass = "violet-light";
        return pokemonClass;
      case "fire":
        pokemonClass = "orange";
        return pokemonClass;
      case "flying":
        pokemonClass = "gray-flight";
        return pokemonClass;
      case "water":
        pokemonClass = "blue-light";
        return pokemonClass;
      case "bug":
        pokemonClass = "green-light";
        return pokemonClass;
      case "normal":
        pokemonClass = "gray";
        return pokemonClass;
      case "electric":
        pokemonClass = "yellow";
        return pokemonClass;
      case "ground":
        pokemonClass = "brown-light";
        return pokemonClass;
      case "fairy":
        pokemonClass = "pink";
        return pokemonClass;
      case "fighting":
        pokemonClass = "red-dark";
        return pokemonClass;
      case "psychic":
        pokemonClass = "red-light";
        return pokemonClass;
      case "rock":
        pokemonClass = "brown-dark";
        return pokemonClass;
      case "ice":
        pokemonClass = "gray-flight";
        return pokemonClass;
      case "ghost":
        pokemonClass = "violet-dark";
        return pokemonClass;
      case "dragon":
        pokemonClass = "blue-dark";
        return pokemonClass;
      case "sinister":
        pokemonClass = "black";
        return pokemonClass;
      case "steel":
        pokemonClass = "gray";
        return pokemonClass;
      default:
        break;
    }
  };

  useEffect(() => {
    getAllPokemons(onCountChange);
  }, []);

  return (
    <div className="container-home">
      <div className="header-home">
        <img src={PokeLogo} alt="poke-logo" />
      </div>
      <Loader showLoader={showLoader} />
      <PokemonModal
        showModalPokemon={showModalPokemon}
        openClosePokemonModal={openClosePokemonModal}
        pokemonData={pokemonData}
        getPokemonClass={getPokemonClass}
      />
      <ErrorModal
        showErroModal={showModalError}
        openCloseErrorModal={openCloseErrorModal}
      />
      {successService ? (
        <>
          <div className="content-cards">
            {successService
              ? listPokemons.map((pokemon, idx) => {
                  const { name, id, types, stats } = pokemon;
                  const { front_default } = pokemon.sprites.other.home;
                  return (
                    <div
                      className="card"
                      key={idx}
                      image={front_default}
                      name={name.charAt(0).toUpperCase() + name.slice(1)}
                      id={id.toString().padStart(3, "0")}
                      onClick={(e) =>
                        openPokemonModal(e.currentTarget, types, stats)
                      }
                    >
                      <img src={front_default} alt="poke-logo" />
                      <div className="content-info">
                        <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                        <p>#{id.toString().padStart(3, "0")}</p>
                      </div>
                      <div className="content-types">
                        {types.map((poke, idx) => {
                          const { name } = poke.type;
                          const pokemonClass = getPokemonClass(name);
                          return (
                            <div key={idx} className={pokemonClass}>
                              {name.charAt(0).toUpperCase() + name.slice(1)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="content-button">
            <button className="btn-load" onClick={() => reloadPokemon()}>
              See more
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
