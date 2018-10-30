import React, {Component} from 'react';
import { FlatList } from 'react-native';

import ForecastCard from './components/ForecastCard';

constructor(props) {
  super(props);

  this.state = {
    latitude = 0,
    longitude = 0,
    forecast: [],
    error: ''
  };

  getLocation() {

    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState(
          (prevState) => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }), => { this.getWeather(); }
        );
      },
        (error) => this.setState({ forecast: error.mensage }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


getWeather() {

    // Construct the API url to call
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}';

    // Chamando API e mudando o estado
    fetch(url)
    .then(response => response.json())
    .then(data => {
        this.setState((prevState, props) => ({
          forecast: data
        }));
    })
  }
}

render() {
  return(
    <FlatList data={this.state.forecast.list} style={{marginTop20}} keyExtractor={item => item.dt_text} renderItem= {({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
    renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />}

  );
}
