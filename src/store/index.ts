import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CryptoCurrencyType } from '../types';
import { getCryptos } from '../services/CryptoService';

type CryptoStoreType = {
  cryptoCurrencies: CryptoCurrencyType[];
  fetchCryptos: () => Promise<void>;
};

export const useCryptoStore = create<CryptoStoreType>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({ cryptoCurrencies }));
    },
  }))
);
