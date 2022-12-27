import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';

@Injectable({providedIn : 'root'})
export class HolidayApiService {
    // swagger:
    // https://date.nager.at/swagger/index.html
    readonly apiBase: string = "https://date.nager.at/api/v3/";
    readonly publicHolidays: string = "publicholidays/";
    readonly availableCountries: string = "availablecountries/";
    readonly pathSeparator: string = "/";

    constructor(private httpClient: HttpClient) {}

    fetchData = async(url: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            firstValueFrom(this.httpClient.get(url))
                .then((payload) => { resolve(payload); })
                .catch((error) => { reject(error); });
        });
    };

    generateAvailableCountriesApiUrl =
        (): string => { return this.apiBase + this.availableCountries; };

    generatePublicHolidaysApiUrl = (year: number, locale: string): string => {
        return this.apiBase + this.publicHolidays + year + this.pathSeparator +
               locale;
    };

    getHolidays = async(year: number, locale: string): Promise<any> => {
        const apiUrl = this.generatePublicHolidaysApiUrl(year, locale);

        const payload = await this.fetchData(apiUrl);

        return payload;
    };

    getAvailableCountries = async(): Promise<any> => {
        const apiUrl = this.generateAvailableCountriesApiUrl();

        const payload = await this.fetchData(apiUrl);

        return payload;
    };
}
