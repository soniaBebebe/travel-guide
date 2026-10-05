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