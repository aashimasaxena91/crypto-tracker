import { format } from "date-fns";

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d: number;
  logo: string;
}

export function mapData(data: any[]): CoinData[] {
  return data.map((coin): CoinData => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol?.toUpperCase() || '',
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h_in_currency,
    change7d: coin.price_change_percentage_7d_in_currency,
    logo: coin.image,
  }));
}

export async function fetchCryptoCoinDetails(): Promise<CoinData[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-gE7kpkdpM5JkaCS1CAFNAXWJ',
    },
  };

  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&price_change_percentage=24h%2C7d',
      options
    );

    const data = await res.json();

    return mapData(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}


export async function cryptoConvertorAPI(fromObj: CoinData, toObj: CoinData, amount: number): Promise<number> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-gE7kpkdpM5JkaCS1CAFNAXWJ',
    },
  };

  try {
    const fromCurrency = fromObj.id;
    const toCurrency = toObj.symbol.toLowerCase();

    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${toCurrency}&ids=${fromCurrency}`,
      options
    );

    const data = await res.json();

    const newData = data[fromCurrency];
    const updatedData = newData?.[toCurrency];

    if (updatedData === undefined) {
      console.error("Conversion data missing:", data);
      return -1;
    }

    return Number(amount) * updatedData;

  } catch (err) {
    console.error("Conversion error:", err);
    return -1;
  }
}


export async function fetchChartDataDualView(coinId: string): Promise<{
  chart7d: [string, number][];
  chart24h: [string, number][];
}> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-gE7kpkdpM5JkaCS1CAFNAXWJ",
    },
  };

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
      options
    );
    const data = await res.json();

    if (!data || !Array.isArray(data.prices)) {
      console.error("Invalid API response:", data);
      return { chart7d: [], chart24h: [] };
    }

    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const chart7d: [string, number][] = [];
    const chart24h: [string, number][] = [];

    for (const [timestamp, price] of data.prices) {
      if (typeof timestamp !== "number" || typeof price !== "number") continue;

      const date = new Date(timestamp);
      const dayLabel = format(date, "dd MMM");
      const hourLabel = format(date, "HH:mm");

      chart7d.push([dayLabel, price]);
      if (timestamp >= oneDayAgo) chart24h.push([hourLabel, price]);
    }

    return { chart7d, chart24h };
  } catch (err) {
    console.error("Error fetching chart data:", err);
    return { chart7d: [], chart24h: [] };
  }
}





