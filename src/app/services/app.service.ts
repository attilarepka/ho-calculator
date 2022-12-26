import {Injectable} from '@angular/core';

import {FileServeService} from './file-serve.service';
import {HolidayApiService} from './holiday-api.service';

interface Payload {
    homeOfficeLimit: number;
    annualLeaveLimit: number;
    daysMap: Map<string, string>;
    currentYear: number;
    locale: string;
}

@Injectable({providedIn : 'root'})
export class AppService {
    payload: Payload;
    remainingHomeOffice: number;
    remainingAnnualLeave: number;
    selectionType: string = 'homeoffice';
    selectedFile: File;

    readonly max_age_delta: number = 10;

    publicHolidays: any;

    constructor(private fileService: FileServeService,
                private apiService: HolidayApiService) {

        this.payload = {
            currentYear : 2023, // new Date(), // TODO: dynamic year
            locale : "",
            homeOfficeLimit : 150,
            daysMap : new Map<string, string>(),
            annualLeaveLimit : 0,
        };
        this.remainingHomeOffice = this.payload.homeOfficeLimit;
        this.remainingAnnualLeave = this.payload.annualLeaveLimit;
    }

    setPublicHolidays = async(): Promise<void> => {
        if (this.payload.currentYear !== undefined &&
            this.payload.locale !== "") {
            this.publicHolidays = await this.apiService.getHolidays(
                this.payload.currentYear, this.payload.locale);
        }
    };

    getPublicHolidays = (): Array<any> => { return this.publicHolidays; };

    isStartable = (): boolean => {
        // TODO: proper starting
        return this.payload.currentYear !== undefined &&
               this.payload.locale !== "";
    };

    setLocale = (locale: string): void => { this.payload.locale = locale; };

    getLocale = (): string => { return this.payload.locale; };

    setCurrentYear =
        (year: number): void => { this.payload.currentYear = year; };

    getCurrentYear = (): number => { return this.payload.currentYear; };

    setHomeOfficeLimit = (limit: number): void => {
        this.payload.homeOfficeLimit = Math.min(Math.max(limit, 0), 365);
        this.remainingHomeOffice = this.payload.homeOfficeLimit;
    };

    getHomeOfficeLimit = (): number => { return this.payload.homeOfficeLimit; };

    isHomeOfficeAllowed =
        (): boolean => { return this.remainingHomeOffice > 0; };

    isAnnualLeaveAllowed =
        (): boolean => { return this.remainingAnnualLeave > 0; };

    hasDaySelection = (): boolean => { return this.payload.daysMap.size > 0; };

    setAnnualLeaveLimit = (limit: number): void => {
        this.payload.annualLeaveLimit = Math.min(Math.max(limit, 0), 365);
        this.remainingAnnualLeave = this.payload.annualLeaveLimit;
    };

    getAnnualLeaveLimit =
        (): number => { return this.payload.annualLeaveLimit; };

    getRemainingHomeOffice = (): number => { return this.remainingHomeOffice; };

    getRemainingAnnualLeave =
        (): number => { return this.remainingAnnualLeave; };

    getDaysMap = (): Map<string, string> => { return this.payload.daysMap; };

    setSelectionType =
        (selection: string): void => { this.selectionType = selection; };

    getSelectionType = (): string => { return this.selectionType; };

    reset = (): void => {
        this.payload.daysMap.clear();
        this.payload.annualLeaveLimit = 0;
        this.payload.homeOfficeLimit = 150;
        this.remainingHomeOffice = this.payload.homeOfficeLimit;
        this.remainingAnnualLeave = this.payload.annualLeaveLimit;
    };

    save = (): void => {
        const payloadJSON = JSON.parse(JSON.stringify(this.payload));
        const array = Array.from(this.payload.daysMap, ([ date, type ]) => ({
                                                           date,
                                                           type,
                                                       }));
        payloadJSON.daysMap = array;
        this.fileService.onSave(JSON.stringify(payloadJSON));
    };

    load = async(payload: any): Promise<void> => {
        this.selectedFile = payload.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(this.selectedFile, 'UTF-8');
        return new Promise((resolve, reject) => {
            fileReader.onload = async () => {
                const input = JSON.parse(fileReader.result as string);
                this.payload.currentYear = input.currentYear;
                this.payload.annualLeaveLimit = input.annualLeaveLimit;
                this.payload.homeOfficeLimit = input.homeOfficeLimit;
                this.payload.locale = input.locale;
                input.daysMap.forEach((key: any) => {
                    this.payload.daysMap.set(key.date, key.type);
                });

                this.updateRemainingDays();
                resolve();
            };
            fileReader.onerror = (error) => {
                console.log(error);
                return reject(error);
            };
        });
    };

    updateRemainingDays = (): void => {
        let usedHomeOffice = 0;
        let usedAnnualLeave = 0;
        this.payload.daysMap.forEach((value) => {
            if (value === 'homeoffice')
                usedHomeOffice++;
            else
                ++usedAnnualLeave;
        });
        this.remainingHomeOffice =
            this.payload.homeOfficeLimit - usedHomeOffice;
        this.remainingAnnualLeave =
            this.payload.annualLeaveLimit - usedAnnualLeave;
    };

    setSelectedDay = (event: any): void => {
        const key = event.key;
        if (this.payload.daysMap.get(key) == this.selectionType)
            this.payload.daysMap.delete(key);
        else
            this.payload.daysMap.set(key, this.selectionType);

        this.updateRemainingDays();
    };

    yearFilter = (d: Date|null): boolean => {
        const year = d?.getFullYear();
        if (year === undefined)
            return true;
        const now = new Date().getFullYear();

        return (now + this.max_age_delta) >= year &&
               (now - this.max_age_delta) <= year;
    };
}
