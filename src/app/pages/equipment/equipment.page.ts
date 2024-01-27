import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { DndEquipmentService, Result } from 'src/app/services/dnd-equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss'],
})
export class EquipmentPage implements OnInit {
  equipment: Result[] = [];
  magicEquipment: Result[] = [];
  allEquipment: Result[] = [];
  filteredEquipment: Result[] = [];
  currentPage = 1;
  itemsPerPage = 80;
  count: number = 0;

  constructor(private dndEquipmentService: DndEquipmentService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadEquipment();
  }

  loadEquipment() {
    this.dndEquipmentService.getAllEquipment().subscribe(eq => {
      this.equipment = JSON.parse(JSON.stringify(eq.results));
      console.log(this.equipment);
      this.count += eq.count;
      this.dndEquipmentService.getAllMagicitems().subscribe(mag => {
        this.magicEquipment = JSON.parse(JSON.stringify(mag.results));
        this.count += mag.count;
        console.log(this.magicEquipment);
        this.allEquipment = [...this.equipment, ...this.magicEquipment];
        this.filteredEquipment = this.allEquipment;
      });
    });

  }

  searchChangeInput(event: any) {
    console.log(this.allEquipment)
    const query = event.target.value.toLowerCase();
    this.filteredEquipment = this.allEquipment.filter((d) => d.index.toLowerCase().indexOf(query) > -1);
    console.log(this.filteredEquipment)
  }

  async loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();

    loading.dismiss();
    event?.target.complete();
    if (event) {
      event.target.disabled = (this.currentPage * this.itemsPerPage) >= this.count;
    }
  }

}
