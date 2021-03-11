import React, { useEffect } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const Modal = props => {

    useEffect(() =>{
        //console.log('modal');
    },[props.show,props.children]);

    return(
        <Auxillary>
            <Backdrop show={props.show} click={props.closeModal} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'transformY(0)' : 'transformY(-100%)',
                    display: props.show ? 'block' : 'none'
                }} >
                {props.children}
            </div>
        </Auxillary>
    );
}

export default Modal;