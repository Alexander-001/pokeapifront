import React from 'react';
import '../styles/modal.css';
import '../styles/colors.css';
import { Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const PokemonModal = ({ showModalPokemon, openClosePokemonModal, pokemonData, getPokemonClass }) => {
    
    const { id, image, name, types, stats } = pokemonData;

    return ( 
        <div className="Modal">
            <Modal open={showModalPokemon} onClose={openClosePokemonModal}>
                {showModalPokemon ? (
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <FontAwesomeIcon 
                                    icon={faTimes} 
                                    onClick={openClosePokemonModal} 
                                    className="icon-close"
                                />
                            </div>
                            <div className="modal-body">
                                <div className="content-image">
                                    <img src={image} alt="pokemon"/>
                                    <h1>{name} #{id}</h1>
                                    <div className="content-types modal">
                                        {types.map((poke, idx) => {
                                            const { name } = poke.type;
                                            const pokemonClass = getPokemonClass(name);
                                            return (
                                                <div key={idx} className={pokemonClass}>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
                                            )
                                        })}
                                    </div>
                                    <div className="content-stats">
                                        <div className="content-info-stats">
                                            {stats.map((pokeStat, idx) => {
                                                const { base_stat, stat } = pokeStat;
                                                const { name } = stat;
                                                return (
                                                    <h1>{name.charAt(0).toUpperCase() + name.slice(1)}: {base_stat}</h1>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </div>
    );
}
 
export default PokemonModal;