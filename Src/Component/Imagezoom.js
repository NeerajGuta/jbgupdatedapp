import React from 'react';
import {View, Dimensions} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const Imagezoom = ({route}) => {
  const {user} = route.params;
  const imageUrl = `https://justbuynewbackend.onrender.com/User/${user?.profileimage}`;
  console.log(imageUrl, 'Image URL');

  // Get screen width and height
  const {width, height} = Dimensions.get('window');

  const images = [
    {
      url: imageUrl,
      width: width,
      height: height,
    },
  ];

  return (
    <View style={{flex: 1}}>
      <ImageViewer
        imageUrls={images}
        enableSwipeDown
        backgroundColor="black"
        renderIndicator={() => null}
        minScale={1}
        maxScale={3}
      />
    </View>
  );
};

export default Imagezoom;
