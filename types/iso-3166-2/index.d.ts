export namespace CountryInfo {
    interface Partial {
        name: string;
        sub: SubdivisionInfo.Map;
    }
    interface Full extends Partial {
        code: string;
    }

    interface Map {
        // full data if this country has been retrieved with country() at least once
        [code: string]: Full | Partial;
    }
}
export type CountryInfo = CountryInfo.Full;

export namespace SubdivisionInfo {
    interface Partial {
        type: string;
        name: string;
    }
    interface Full extends Partial {
        countryName: string;
        countryCode: string;
        code: string;
        regionCode: string;
    }

    interface Map {
        // full data if this subdivision has been retrieved with subdivision() at least once
        [code: string]: Full | Partial;
    }
}
export type SubdivisionInfo = SubdivisionInfo.Full;

export function subdivision(
    countryCodeOrFullSubdivisionCode: string,
    subdivisionCodeOrName?: string,
): SubdivisionInfo | null;

export function country(countryCodeOrName: string): CountryInfo | null;

export const data: CountryInfo.Map;

// map of alpha 3 codes to alpha 2 codes
export const codes: {
    [alpha3: string]: string;
};
