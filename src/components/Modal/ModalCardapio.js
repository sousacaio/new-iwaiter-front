import React, { Component } from "react";
import { ModalWrapper, ModalBoxSetup, ModalBg } from "./GeneralStyle";
import PropTypes from "prop-types";
/*
visible: boolean,
dismiss: function on click on Close.
*/
export default class ModalCardapio extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        dismiss: PropTypes.func.isRequired,
    };
    render() {
        const { visible, dismiss, children, client } = this.props;
        return (
            <div>
                <React.Fragment>
                    {visible ? (
                        <ModalWrapper>
                            <ModalBoxSetup width={client}>{children}   </ModalBoxSetup>
                            <ModalBg onClick={dismiss} />
                        </ModalWrapper>
                    ) : null}
                </React.Fragment>
            </div >
        );
    }
}