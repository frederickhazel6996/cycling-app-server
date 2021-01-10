import React from 'react';
import DEMO from './../../../../../store/constant';
import Aux from '../../../../../hoc/_Aux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const navLogo = props => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }
    let temp_name = props.email.split('@');
    let name = temp_name[0];
    return (
        <Aux>
            <div className="navbar-brand header-logo">
                <a href={DEMO.BLANK_LINK} className="b-brand">
                    <div className="b-bg">
                        <i class="fas fa-bicycle" />
                    </div>
                    <span className="b-title">{name}</span>
                </a>
                <a
                    href={DEMO.BLANK_LINK}
                    className={toggleClass.join(' ')}
                    id="mobile-collapse"
                    onClick={props.onToggleNavigation}>
                    <span />
                </a>
            </div>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        layout: state.original.layout,
        collapseMenu: state.original.collapseMenu,
        email: state.admin.username
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(navLogo)
);
