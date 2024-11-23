import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CryptoCurrencyType, CryptoPriceType, PairType } from '../types';
import { fetchCurrentCryptoPrice, getCryptos } from '../services/CryptoService';

type CryptoStoreType = {
  cryptoCurrencies: CryptoCurrencyType[];
  result: CryptoPriceType;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: PairType) => Promise<void>;
};

export const useCryptoStore = create<CryptoStoreType>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {} as CryptoPriceType,
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({ cryptoCurrencies }));
    },
    fetchData: async (pair) => {
      const result = await fetchCurrentCryptoPrice(pair);
      set(() => ({ result }));
    },
  }))
);
