import {Injectable} from '@angular/core';
import {selectOptions} from '../../../assets/configs/select-options';
import {first} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DateHelper {

  private formats = {
    date: 'dd/MM/yyyy',
    dayMonthYear: 'dd MMM yyyy',
    dateTime: 'dd/MM/yyyy HH:mm a',
    monthYear: 'LLL yyyy',
    dateMandarin: 'yMMMd',
    dateTimeMandarin: 'yMMMd HH:mm a',

    monthDay: 'MMM dd',
    monthDayMandarin: 'MMM dd',
    monthDayTime: 'MMM dd, h:mm a',
    monthDayTimeMandarin: 'MMM dd, h:mm a',
    monthDayYear: 'MMM dd, yyyy',
    monthDayYearMandarin: 'MMM dd, yyyy',
    fullMonthDayYear: 'MMMM dd, yyyy',
    fullMonthDayYearMandarin: 'MMMM dd, yyyy',
  };

  private locale: string;

  constructor(
    // private languageService: LanguageService
  ) {
  }

  async getFormat(format): Promise<string> {
    return this.formats[format];
    // const locale: Language = this.languageService.locale ?? await this.languageService.locale$.pipe(first()).toPromise();
    // this.locale = locale.code;
    // if (this.locale === 'zh_cn' || this.locale === 'zh_tw') {
    //   return this.getMandarinFormat(format);
    // } else {
    //   return this.formats[format];
    // }
  }

  private getMandarinFormat(format): string {
    return this.formats[`${format}Mandarin`] ?? this.formats[format];
  }

  sameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  monthYearToDate(month: string, year: number): Date {
    const monthInNumber: number = selectOptions.months.indexOf(month);
    return new Date(year, monthInNumber, 1);
  }

  monthYearDayToDate(year: number, month: number, day: number) {
    return new Date(year, month, day);
  }

  monthDayToDate(month: string, day: number) {
    const monthInNumber: number = selectOptions.months.indexOf(month);
    return new Date(1, monthInNumber, day);
  }

  monthDayToEpoch(month: string, day: number) {
    return this.dateToEpoch(this.monthDayToDate(month, day));
  }

  monthYearDayToEpoch(year: number, month: number, day: number) {
    return this.dateToEpoch(this.monthYearDayToDate(year, month, day));
  }

  monthYearToEpoch(month: string, year: number): number {
    return this.dateToEpoch(this.monthYearToDate(month, year));
  }

  dateToEpoch(date: Date): number {
    return date.valueOf();
  }

  dateToEpochWithNowTime(date: Date, now: Date): number {
    try {
      date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    } catch (err) {
    }
    return date.valueOf();
  }

  epochToDate(epochTime: number): Date {
    return new Date(epochTime);
  }

  getDayFromEpoch(epochTime?: number): number {
    return epochTime ? this.epochToDate(epochTime).getDate() : null;
  }

  getDayFromDate(date?: Date): number {
    return date ? date.getDate() : null;
  }

  getMonthFromEpoch(epochTime?: number): string {
    return epochTime ? selectOptions.months[this.epochToDate(epochTime).getMonth()] : null;
  }

  getMonthFromDate(date?: Date): string {
    return date ? selectOptions.months[date.getMonth()] : null;
  }

  getYearFromEpoch(epochTime?: number): number {
    return epochTime ? this.epochToDate(epochTime).getFullYear() : null;
  }

  getYearFromDate(date?: Date): number {
    return date ? date.getFullYear() : null;
  }

  getMonthYearTextFromEpoch(epochTime: number): string {
    return `${this.getMonthFromEpoch(epochTime)} ${this.getYearFromEpoch(epochTime)}`;
  }

  getNewDate(options?: { year?: number, month?: number, day?: number, date?: Date }): Date {
    const date = options?.date ?? new Date();
    return new Date(
      (date.getFullYear() + (options?.year ? +options.year : 0)),
      (date.getMonth() + (options?.month ? +options.month : 0)),
      (date.getDate() + (options?.day ? +options.day : 0)));
  }
}
