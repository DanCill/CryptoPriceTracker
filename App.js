import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "./components/ListItem";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Chart from "./components/Chart";
import { getMarketData } from "./services/cryptoService";
import { SAMPLE_DATA } from "./assets/data/sampleData";

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };
    fetchMarketData();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView className="h-full">
          <View className="mt-16 px-8 bg-white">
            <Text className="text-2xl font-bold text-black">Markets</Text>
          </View>
          <View className="mx-4 my-6 h-px border-t-0 bg-[#A9ABB1]" />

          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={({ item }) => (
              <ListItem
                name={item.name}
                symbol={item.symbol}
                currentPrice={item.current_price}
                priceChangePercentage={
                  item.price_change_percentage_7d_in_currency
                }
                logoUrl={item.image}
                onPress={() => openModal(item)}
              />
            )}
          />
        </SafeAreaView>

        <View className="flex p-6 justify-center bg-gray">
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            className="shadow-md shadow-black"
            style={{
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <BottomSheetView className="flex items-center">
              {selectedCoinData ? (
                <Chart
                  currentPrice={selectedCoinData.current_price}
                  logoUrl={selectedCoinData.image}
                  name={selectedCoinData.name}
                  priceChangePercentage7d={
                    selectedCoinData.price_change_percentage_7d_in_currency
                  }
                  sparkline={selectedCoinData.sparkline_in_7d.price}
                  symbol={selectedCoinData.symbol}
                />
              ) : null}
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
