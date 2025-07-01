export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d: number;
  logo: string;
}

export async function fetchTopCryptos(): Promise<CoinData[]> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&price_change_percentage=24h,7d"
  );
  const data = await res.json();

  return data.map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h_in_currency,
    change7d: coin.price_change_percentage_7d_in_currency,
    logo: coin.image,
  }));
}

export async function convertCrypto(fromId: string, toId: string, amount: number): Promise<number> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${fromId}&vs_currencies=${toId}`
  );
  const data = await res.json();
  return amount * data[fromId][toId];
}


export async function fetchSparklineData(coinId: string): Promise<string[][]> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
  );
  const data = await res.json();
  const newChartData = [["Date", "Prices"]];
  data.prices.map(( item: string[] ) => {
    newChartData.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
  });
  console.log("newChartData");
  return newChartData;
}

