import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Result } from './dnd-equipment.service';

@Injectable({
  providedIn: 'root'
})
export class DndStorageService {
  favouriteData: Array<Result> = []

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
    let data: Array<Result> = await this.storage.get('favourite');
    console.log("Data: ")
    console.log(this.favouriteData);
    return data;
  }

  setData(value: any) {
    console.log("Before set");
    console.log(this.favouriteData);
    if (!this.favouriteData) {
      console.log("Its null");
      this.favouriteData = [];
      this.favouriteData.push(value);
      this.storage.set('favourite', this.favouriteData);
    }
    else if (value && !this.favouriteData.some(d => d.index === value.index)) {
      this.favouriteData.push(value);
      console.log("store: ");
      console.log(this.favouriteData);
      this.storage.set('favourite', this.favouriteData);
    } else if (this.favouriteData.some(d => d.index === value.index)) {
      console.log("removing fav");
      this.removeFromFavourite(value);
    }
  }

  isInStorage(value: Result) {
    if (this.favouriteData !== null) {
      return this.favouriteData.some(d => d.index === value.index);
    } else {
      return false;
    }
  }

  clearData() {
    console.log("Clear");
    this.storage.clear();
    this.favouriteData = [];
  }

  removeFromFavourite(value: any) {
    if (this.favouriteData.some(d => d.index === value.index)) {
      let index = this.favouriteData.findIndex(f => f.index === value.index);
      console.log(index);
      this.favouriteData = this.favouriteData.filter((d) => {
        return d.index !== value.index
      })
      console.log(this.favouriteData);
      this.storage.set('favourite', this.favouriteData);
    }
  }
}
