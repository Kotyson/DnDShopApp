import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Result } from 'src/app/services/dnd-equipment.service';
import { DndStorageService } from 'src/app/services/dnd-storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favourite: Array<Result> = []

  constructor(private storage: Storage, private dndStorage: DndStorageService) { }

  async ngOnInit() {
    this.storage.create();
    this.dndStorage.start();
    this.getData();
  }

  getData = async () => {
    console.log("asasa");
    const value = await this.dndStorage.getData();
    if (value) {
      console.log(value);
      this.favourite = value;
    }
  }

  ionViewDidEnter() {
    console.log("Going to favs");
    this.getData();
  }
}
