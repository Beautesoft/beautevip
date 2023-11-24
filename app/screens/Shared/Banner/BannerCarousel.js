import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const BannerCarousel = ({ bannerData }) => {
  const [curIndex, setCurIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (curIndex + 1) % bannerData.length;
      setCurIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [curIndex, bannerData.length]);

  const renderDot = (index) => (
    <View
      key={index}
      style={[
        styles.dot,
        { backgroundColor: curIndex === index ? '#FFA500' : '#D3D3D3' },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={bannerData}
        keyExtractor={(item) => item.bannerID.toString()}
        renderItem={({ item }) => (
          <View style={styles.bannerContainer}>
            <Image source={{ uri: item.bannerImg }} style={styles.bannerImage} />
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurIndex(newIndex);
        }}
      />
      
      <View style={styles.dotsContainer}>{bannerData.map((_, index) => renderDot(index))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.4, // 40% height
    padding: 6,
  },
  bannerContainer: {
    width: Dimensions.get('window').width * 0.9,
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default BannerCarousel;
