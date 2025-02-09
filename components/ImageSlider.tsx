import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from "react-native";
import React, { useRef, useState } from "react";
import Pagination from "./Pagination";

type ImageSliderProps = {
  imageList: string[];
};

const width = Dimensions.get("screen").width;

const ImageSlider = ({ imageList }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index % imageList.length);
    }
  };
  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
    {
      viewabilityConfig,
      onViewableItemsChanged,
    },
  ]);

  return (
    <View>
      <FlatList
        data={imageList}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item }) => (
          <View style={{ width, justifyContent: "center", alignItems: "center" }}>
            <Image source={{ uri: item }} style={{ width: 300, height: 300, borderRadius: 15 }} />
          </View>
        )}
      />
      <Pagination currentIndex={currentIndex} items={imageList} />
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({});
