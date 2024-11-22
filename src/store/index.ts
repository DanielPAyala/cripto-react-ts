import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CryptoCurrenciesResponseSchema } from '../schema/crypto-schema';
import { CryptoCurrenciesType, CryptoCurrencyType } from '../types';

type CryptoStoreType = {
  cryptoCurrencies: CryptoCurrencyType[];
  fetchCryptos: () => Promise<void>;
};

async function getCryptos(): Promise<CryptoCurrenciesType> {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
  const {
    data: { Data },
  } = await axios.get(url);
  const result = CryptoCurrenciesResponseSchema.safeParse(Data);
  if (result.success) {
    return result.data;
  } else {
    return [];
  }
}

export const useCryptoStore = create<CryptoStoreType>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({ cryptoCurrencies }));
    },
  }))
);
