import React, { Component } from 'react'
import * as L from "leaflet";
import { PopupQuestion } from './Popups';


export default class TaqueriaMap extends Component {
    mymap = L.map('taqueria_map').setView([33.35000, -112.32000], 15);
    componentDidMount() {
        this.markers = L.layerGroup().addTo(this.mymap);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoianJuZWxzMTAiLCJhIjoiY2ticjNwdXR4MXlpcTJ5dG1rdjF4MDdxeSJ9.tiUpLiArSzx6thNUgPOL-w'
        }).addTo(this.mymap);
        // const marker = new L.Marker([this.latitude, this.longitude], {
        //     rotationAngle: 100
        // }).bindPopup(<PopupQuestion />);
    }
    render() {
        return (
            <div id='taqueria_map' />
        )
    }
}
