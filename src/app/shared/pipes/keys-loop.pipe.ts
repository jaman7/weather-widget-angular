import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

interface KeyValue<T> {
  key: string;
  value: T;
}

@Pipe({
  name: 'objectToArray',
})
export class ObjectToArrayPipe implements PipeTransform {
  @memo()
  transform<T>(value: { [key: string]: T } | null | undefined): KeyValue<T>[] {
    if (value === null) return [];
    return Object.keys(value).map(key => ({ key, value: value[key] }));
  }
}
