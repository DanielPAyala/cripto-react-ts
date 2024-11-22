import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CryptoCurrencyType, PairType } from '../types';
import { fetchCurrentCryptoPrice, getCryptos } from '../services/CryptoService';

type CryptoStoreType = {
  cryptoCurrencies: CryptoCurrencyType[];
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: PairType) => Promise<void>;
};

export const useCryptoStore = create<CryptoStoreType>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({ cryptoCurrencies }));
    },
    fetchData: async (pair) => {
      await fetchCurrentCryptoPrice(pair);
    },
  }))
);
