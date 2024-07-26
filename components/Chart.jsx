// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import { ChartDot, ChartPath, ChartPathProvider } from '@rainbow-me/animated-charts';

// const Chart = ({ currentPrice, logoUrl, name, priceChangePercentage7d, sparkline, symbol }) => {

//     const priceChangeColor =
//     priceChangePercentage7d > 0 ? "text-[#34C759]" : "text-[#FF3B30]";

//   return (
//     <ChartPathProvider data={{ points:sparkline, smoothingStrategy: 'bezier' }} >
//             <View className="m-6" >
//       <View className="">
//         <View className="flex-row justify-between items-center">
//             <View className="flex-row items-center" >
//                 <Image source={{uri: logoUrl}} className="w-[24px] h-[24px] mr-2"/>
//                 <Text className="text-[14px] text-[#A9ABB1]" >{name} ({symbol.toUpperCase()})</Text>
//             </View>
//             <Text className="text-[14px] text-[#A9ABB1]" >7d</Text>
//         </View>
//         <View className="flex-row justify-between items-center">
//             <Text className="text-[24px] text-black font-bold">${currentPrice.toLocaleString('en-US', { currency: 'USD'})}</Text>
//             <Text className={`text-[18px] ${priceChangeColor}`}>{priceChangePercentage7d.toFixed(2)}%</Text>
//         </View>
//       </View>
//       <ChartPath height={SIZE / 2} stroke="yellow" width={SIZE} />
//       <ChartDot style={{ backgroundColor: 'blue' }} />
//     </View>
//     </ChartPathProvider>
//   )
// }

// export default Chart
