import axios from "axios";
import moment from "moment";

const formatSparkline = (numbers) => {
  const sevenDaysAgo = moment().subtract(7, "days").unix();
  let formattedSparkline = numbers.map((item, index) => {
    return {
      timestamp: sevenDaysAgo + (index + 1) * 3600,
      value: item,
    };
  });
  return formattedSparkline;
};
const formatMarketData = (data) => {
  let formattedData = [];
  data.forEach((item) => {
    const formattedSparkLine = formatSparkline(item.sparkline_in_7d.price);
    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkLine,
      },
    };

    formattedData.push(formattedItem);
  });
  return formattedData;
};

export const getMarketData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=7d",
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "YOUR_API_KEY_HERE",
        },
      }
    );
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
