import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) { }

  removeKey(key) {
    return this.storage.remove(key);
  }

  clear() {
    return this.storage.clear();
  }

  get(key: string) {
    return this.storage.get(key);
  }

  save(key: string, data: any) {
    return this.storage.set(key, data);
  }

}
