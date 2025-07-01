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
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&price_change_percentage=24h%2C7d',
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



export async function fetchChartData(coinId: string): Promise<string[][]> {
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-gE7kpkdpM5JkaCS1CAFNAXWJ'}
  };

  try{
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=20&interval=daily`, options);
    const data = await res.json();
    const newChartData = [["Date", "Prices"]];
    data.prices.map(( item: string[] ) => {
      newChartData.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
    });
    return newChartData;
  }catch(err){
    console.error(err);
    return [];
  }
}

