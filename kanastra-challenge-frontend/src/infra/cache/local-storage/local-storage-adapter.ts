import { GetStorage, SetStorage } from '@/application/protocols/cache';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object | undefined): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? '{}');
  }
}
