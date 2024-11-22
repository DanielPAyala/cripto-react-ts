import axios from 'axios';
import { CryptoCurrenciesType, PairType } from '../types';
import { CryptoCurrenciesResponseSchema } from '../schema/crypto-schema';

export async function getCryptos(): Promise<CryptoCurrenciesType> {
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

export async function fetchCurrentCryptoPrice(pair: PairType) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`;
  const {
    data: { DISPLAY },
  } = await axios.get(url);
  console.log(DISPLAY[pair.criptocurrency][pair.currency]);
}
