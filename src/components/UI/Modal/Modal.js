import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component{
    
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    componentDidUpdate () {
        console.log('[Modal.js] componentDidUpdate');
    }
    
    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transfom: this.props.show ? 'tranlateY(0)' : 'translateY(-100vh)',
                        display : this.props.show ? 'block' : 'none'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}


export default Modal;