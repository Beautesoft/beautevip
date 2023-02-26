import React from 'react';
import {Image} from 'react-native';
import {Images} from '../config/images';

const BackgroundImage = props => {
  const {blurRadius = 0, image} = props;
  return (
    <Image
      source={image ? image : Images.backgroundImage}
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
      }}
      resizeMode="cover"
      blurRadius={blurRadius}
    />
  );
};

export default BackgroundImage;
