import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CryptoCurrencyType, CryptoPriceType, PairType } from '../types';
import { fetchCurrentCryptoPrice, getCryptos } from '../services/CryptoService';

type CryptoStoreType = {
  cryptoCurrencies: CryptoCurrencyType[];
  result: CryptoPriceType;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: PairType) => Promise<void>;
};

export const useCryptoStore = create<CryptoStoreType>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {} as CryptoPriceType,
    loading: false,
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({ cryptoCurrencies }));
    },
    fetchData: async (pair) => {
      set(() => ({ loading: true }));
      const result = await fetchCurrentCryptoPrice(pair);
      set(() => ({ result, loading: false }));
    },
  }))
);
