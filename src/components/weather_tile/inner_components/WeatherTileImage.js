import React from 'react';
import * as PropTypes from 'prop-types'; // * because of no default export warning


function WeatherTileImage(props) {
  return (
      <i className={ 'wi wi-owm-' + props.weatherCode } style={{ fontSize: '25px'}}/>
  )
}

WeatherTileImage.propTypes = {
  weatherCode: PropTypes.number.isRequired,
};

export default WeatherTileImage;
