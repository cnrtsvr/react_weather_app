import React from 'react';
import WeatherTileImage from './inner_components/WeatherTileImage.js';
import * as PropTypes from 'prop-types'; // * because of no default export warning
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  degree: {
    fontSize: 14,
    paddingTop: '10px',
    paddingBottom: '0'
  },
});

function WeatherTile(props) {
  const classes = useStyles();

  return(
      <Card className='WeatherTileCard'>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.tile.dayName}
          </Typography>
          <WeatherTileImage weatherCode={props.tile.weatherCode}/>
          <Typography className={classes.degree} color="textSecondary" gutterBottom>
            {props.tile.celsius}&deg;C
          </Typography>
        </CardContent>
      </Card>
  )
}

WeatherTile.propTypes = {
  tile: PropTypes.object.isRequired,
};

export default WeatherTile;
