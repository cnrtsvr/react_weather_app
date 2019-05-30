import React from 'react';
import WeatherTile from '../weather_tile/WeatherTile.js';
import { Grid, Container } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';

const containerStyle = {
  paddingTop: '25px',
};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherForecast: [],
    };
  }

  render() {
    return (
        <Container maxWidth={'md'} style={containerStyle}>
          <Grid container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center">
            {this.state.weatherForecast.map((tile, index) => {
              return <Grid item xs key={'tile_' + index}>
                  <WeatherTile tile={tile}/>
                </Grid>
            })}
          </Grid>
        </Container>
    );
  }

  componentWillMount() {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?id=323786&APPID=' + process.env.REACT_APP_OWM_API_KEY + '&units=metric';
    axios.get(url).then((response) => {
      this.setState({
        weatherForecast: this.getWeatherArrayFromOWMData(response.data.list),
      });
    })
  }

  // This function will find the 5 days forecast from OWM data.
  // It will try to set 12:00 data as day's weather.
  getWeatherArrayFromOWMData(weatherList) {
    const weatherArr = [];
    let checkMoment = moment().utc().set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
    // Check if today's 12:00 is available in the list
    let checkIndex = weatherList.findIndex(x => x.dt === checkMoment.unix());
    // If not available, set the first data as today's weather
    if (checkIndex === -1) {
      weatherArr.push({
        dayName: checkMoment.format('ddd'),
        celsius: weatherList[0].main.temp,
        weatherCode: weatherList[0].weather[0].id,
      });
    } else { // If available, set the today's 12:00 data as today's weather
      weatherArr.push({
        dayName: checkMoment.format('ddd'),
        celsius: weatherList[checkIndex].main.temp,
        weatherCode: weatherList[checkIndex].weather[0].id,
      });
    }
    // Following 3 days will have the 12:00 data, just set them.
    for (let i = 0; i < 3; i ++) {
      checkMoment.add(1, 'days');
      checkIndex = weatherList.findIndex(x => x.dt === checkMoment.unix());
      weatherArr.push({
        dayName: checkMoment.format('ddd'),
        celsius: weatherList[checkIndex].main.temp,
        weatherCode: weatherList[checkIndex].weather[0].id,
      });
    }
    checkMoment.add(1, 'days');
    // Check if 5th day's 12:00 is available in the list
    checkIndex = weatherList.findIndex(x => x.dt === checkMoment.unix());
    // If not available, set the last data as 5th day's weather
    if (checkIndex === -1) {
      weatherArr.push({
        dayName: checkMoment.format('ddd'),
        celsius: weatherList[0].main.temp,
        weatherCode: weatherList[0].weather[0].id,
      });
    } else { // If available, set the 12:00 data as 5th day's weather
      weatherArr.push({
        dayName: checkMoment.format('ddd'),
        celsius: weatherList[checkIndex].main.temp,
        weatherCode: weatherList[checkIndex].weather[0].id,
      });
    }
    return weatherArr;
  }
}

export default Weather;
