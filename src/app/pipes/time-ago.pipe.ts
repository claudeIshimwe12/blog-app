import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    const now = new Date().getTime();
    const then = new Date(value).getTime();
    const diffInSeconds = (now - then) / 1000;
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInDays < 1) {
      return 'Today';
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks}w ago`;
    }
  }
}
