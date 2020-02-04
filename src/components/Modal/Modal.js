import React, { useState } from 'react';
import './Modal.scss';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const NovoModal = (props) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <button onClick={handleOpenModal}>Trigger Modal</button>
            <Modal
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
            >
                <button onClick={handleCloseModal}>Close Modal</button>   {props.children}
            </Modal>
        </div>
    );

}
export default NovoModal;
