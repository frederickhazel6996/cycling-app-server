import React from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import {
    Map,
    Marker,
    GoogleApiWrapper,
    InfoWindow,
    Polyline,
    Polygon
} from 'google-maps-react';
require('dotenv').config();
class GoogleMap extends React.Component {
    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        position: null
    };

    onMarkerClick = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        const { position } = this.state;

        return (
            <div style={{ height: '200px', width: '100%' }}>
                <Map
                    initialCenter={{
                        lat: 53.487855,
                        lng: -2.200119
                    }}
                    google={this.props.google}
                    className="map"
                    zoom={13}>
                    <Marker
                        position={{
                            lat: 53.487855,
                            lng: -2.200119
                        }}
                    />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(GoogleMap);
