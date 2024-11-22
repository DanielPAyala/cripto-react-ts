import { z } from 'zod';
import {
  CurrencySchema,
  CryptoCurrencyResponseSchema,
  CryptoCurrenciesResponseSchema,
  PairSchema,
} from '../schema/crypto-schema';

export type CurrencyType = z.infer<typeof CurrencySchema>;
export type CryptoCurrencyType = z.infer<typeof CryptoCurrencyResponseSchema>;
export type CryptoCurrenciesType = z.infer<
  typeof CryptoCurrenciesResponseSchema
>;
export type PairType = z.infer<typeof PairSchema>;
