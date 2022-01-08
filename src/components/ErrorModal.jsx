import React from 'react';
import '../styles/modal.css';
import { Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation, faTimes } from '@fortawesome/free-solid-svg-icons'

const ErrorModal = ({ showErroModal,  openCloseErrorModal}) => {
    return ( 
        <div className='Modal'>
            <Modal open={showErroModal} onClose={openCloseErrorModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                onClick={openCloseErrorModal} 
                                className="icon-close"
                            />
                        </div>
                        <div className="modal-body">
                            <FontAwesomeIcon 
                                icon={faExclamation} 
                                onClick={openCloseErrorModal} 
                                className="icon-info"
                            />
                            <h1 className="title-error-modal">¡Lo sentimos!</h1>
                            <p>En estos momentos no está disponible el servicio de PokeApi.</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
     );
}
 
export default ErrorModal;