import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const ListItem = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage,
  logoUrl,
  onPress,
}) => {
  const priceChangeColor =
    priceChangePercentage > 0 ? "text-[#34C759]" : "text-[#FF3B30]";

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="px-4 mt-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image
            source={{
              uri: logoUrl,
            }}
            className="w-[48px] h-[48px]"
          />
          <View className="ml-2">
            <Text className="text-lg">{name}</Text>
            <Text className="text-sm text-[#A9ABB1]">
              {symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text>
            ${currentPrice.toLocaleString("en-US", { currency: "USD" })}
          </Text>
          <Text className={`${priceChangeColor}`}>
            {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
