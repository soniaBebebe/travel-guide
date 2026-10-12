import { type DateRange, durationDays as rangeDuration } from '@/shared/lib/dateRange';

export interface Trip{
    id: string;
    userId: string;
    title: string;
    destination: string|null;
    dates: DateRange;
    baseCurrency: string;
    coverUrl: string|null;
}

export type TripDraft=Omit<Trip, 'id'|'userId'>;
export const durationDays=(t:Trip): number=>rangeDuration(t.dates);

export const isUpcoming=(t:Trip, now=new Date()): boolean => t.dates.start>now;
export const isActive=(t:Trip, now=new Date()): boolean => t.dates.start<= now && now<= t.dates.end;
export const isPast=(t:Trip, now=new Date()): boolean => t.dates.end<now;