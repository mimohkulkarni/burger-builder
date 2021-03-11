import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';

const withErrorHandler = ( WrappedComponent, axios ) => {

    return class extends Component {
        state = {
            error: null
        }

        componentDidMount(){
            this._isMounted = true;
        }

        componentWillUnmount(){
            // console.log(this.reqInterceptor);
            this._isMounted = false;
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                if(this._isMounted) this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(req => req,error => {
                if(this._isMounted) this.setState({error: error});
            });

            return(
                <Auxillary>
                    <Modal show={this.state.error} closeModal={this.errorConfirmedHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
            );
        }
    }
}

export default withErrorHandler;