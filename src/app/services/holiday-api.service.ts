import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';

@Injectable({providedIn : 'root'})
export class HolidayApiService {
    readonly apiBase: string = "https://date.nager.at/api/v3/publicholidays/";
    readonly pathSeparator: string = "/";

    constructor(private httpClient: HttpClient) {}

    fetchData = async(url: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            firstValueFrom(this.httpClient.get(url))
                .then((payload) => { resolve(payload); })
                .catch((error) => { reject(error); });
        });
    };

    generateApiUrl = (year: number, locale: string):
        string => { return this.apiBase + year + this.pathSeparator + locale; };

    getHolidays = async(year: number, locale: string): Promise<any> => {
        const apiUrl = this.generateApiUrl(year, locale);

        const payload = await this.fetchData(apiUrl);

        return payload;
    };
}
