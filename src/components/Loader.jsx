import React from 'react';
import ReactLoader from 'react-loader-spinner';
import { Modal } from '@mui/material';

const Loader = ({ showLoader }) => {
    return ( 

        <div className="Modal">
            <Modal open={showLoader}>
                <div className='content-loader'>
                    <ReactLoader
                        type="Grid"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            </Modal>
        </div>
    );
}
 
export default Loader;