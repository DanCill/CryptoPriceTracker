import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-wagmi-charts";
import { useSharedValue } from "react-native-reanimated";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Chart = ({
  currentPrice,
  logoUrl,
  name,
  priceChangePercentage7d,
  sparkline,
  symbol,
}) => {
  const latestCurrentPrice = useSharedValue(currentPrice);

  const priceChangeColor =
    priceChangePercentage7d > 0 ? "text-[#34C759]" : "text-[#FF3B30]";

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;
  }, [currentPrice]);

  return (
    <LineChart.Provider data={sparkline}>
      <View className="m-6">
        <View className="">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={{ uri: logoUrl }}
                className="w-[24px] h-[24px] mr-2"
              />
              <Text className="text-[14px] text-[#A9ABB1]">
                {name} ({symbol.toUpperCase()})
              </Text>
            </View>
            <Text className="text-[14px] text-[#A9ABB1]">7d</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <LineChart.PriceText
              className="text-[24px] text-black font-bold"
              format={(d) => {
                "worklet";
                return d.formatted
                  ? `$${d.formatted} USD`
                  : `$${latestCurrentPrice.value.toLocaleString("en-US", {
                      currency: "USD",
                    })}`;
              }}
            />
            <Text className={`text-[18px] ${priceChangeColor}`}>
              {priceChangePercentage7d.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
      <LineChart
        className="mx-3 justify-center items-center"
        width={deviceWidth - 25}
        height={deviceHeight * 0.25}
      >
        <LineChart.Path />
        <LineChart.CursorCrosshair color="red">
          <LineChart.HoverTrap />
        </LineChart.CursorCrosshair>
      </LineChart>
    </LineChart.Provider>
  );
};

export default Chart;
