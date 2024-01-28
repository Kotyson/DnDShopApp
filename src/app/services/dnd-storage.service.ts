import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DndStorageService {
  favouriteData: Array<string> = []

  constructor(private storage: Storage) {

  }

  async ngOnInit() {
    await this.storage.create();
    this.favouriteData = await this.storage.get('favourite');
    console.log("Data loaded from start of service: " + this.favouriteData);
  }

  async start() {
    this.favouriteData = await this.storage.get('favourite');
  }

  async getData() {
    let data: Array<string> = await this.storage.get('favourite');
    console.log("Data: " + data)
    return data;
  }

  setData(value: any) {
    if (value && !this.favouriteData.includes(value)) {
      this.favouriteData.push(value);
      console.log("store: " + this.favouriteData);
      this.storage.set('favourite', this.favouriteData);
    } else if (this.favouriteData.includes(value)) {
      this.removeFromFavourite(value);
    }
  }

  clearData() {
    this.storage.clear();
    this.favouriteData = [];
  }

  removeFromFavourite(value: any) {
    if (this.favouriteData.includes(value)) {
      let index = this.favouriteData.findIndex(f => f == value);
      console.log(index);
      this.favouriteData = this.favouriteData.filter((d) => {
        return d !== value
      })
      console.log(this.favouriteData);
      this.storage.set('favourite', this.favouriteData);
    }
  }
}
