import { FrankfurterEntityBase } from '../FrankfurterEntityBase';
import type { FrankfurterSDK } from '../FrankfurterSDK';
import type { Control } from '../types';
import type { Currency, CurrencyListMatch } from '../FrankfurterTypes';
declare class CurrencyEntity extends FrankfurterEntityBase<Currency> {
    constructor(client: FrankfurterSDK, entopts: any);
    make(this: CurrencyEntity): CurrencyEntity;
    list(this: any, reqmatch?: CurrencyListMatch, ctrl?: Control): Promise<CurrencyEntity[]>;
}
export { CurrencyEntity };
