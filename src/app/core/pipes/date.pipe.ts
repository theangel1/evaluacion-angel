// src/app/pipes/pretty-date.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict, format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'DateAngel',
  standalone: true,
  pure: true // Ideal para zoneless
})
export class DatePipe implements PipeTransform {

  transform(
    value: string | Date | number | null | undefined,
    mode: 'auto' | 'relative' | 'full' | 'short' = 'auto'
  ): string {

    if (!value) return 'Nunca';

    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Fecha inválida';

    // Modo automático: elige el mejor formato según antigüedad
    if (mode === 'auto') {
      const hoursAgo = (Date.now() - date.getTime()) / (1000 * 60 * 60);

      if (hoursAgo < 1) return 'justo ahora';
      if (hoursAgo < 24) return this.formatRelative(date);
      if (hoursAgo < 168) return this.formatRelative(date); // hasta 1 semana
      return this.formatFull(date);
    }

    switch (mode) {
      case 'relative':
        return this.formatRelative(date);

      case 'full':
        return this.formatFull(date);

      case 'short':
        return format(date, 'dd/MM/yyyy');

      default:
        return this.formatRelative(date);
    }
  }

private formatRelative(date: Date): string {
    if (isToday(date)) {
      return `hoy a las ${format(date, 'HH:mm')}`;
    }
    if (isYesterday(date)) {
      return `ayer a las ${format(date, 'HH:mm')}`;
    }

    return formatDistanceToNowStrict(date, {
      addSuffix: true,
      locale: es,
      roundingMethod: 'floor'
    }).replace('unos', ''); // "hace 3 días", "hace 2 años", etc.
  }

  private formatFull(date: Date): string {
    return format(date, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
  }
}