import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Detail, DndEquipmentService, Root } from 'src/app/services/dnd-equipment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.page.html',
  styleUrls: ['./equipment-details.page.scss'],
})
export class EquipmentDetailsPage implements OnInit {
  Result: Detail = <Detail>{};
  coinUrl = environment.goldCoin;
  weightIconUrl = environment.weigthtIcon;

  constructor(private route: ActivatedRoute, private equipmentService: DndEquipmentService) {
  }

  ngOnInit() {
    this.Result.cost = Object();
    this.Result.damage = Object();
    this.Result.damage.damage_type = Object();
    this.Result.equipment_category = Object();
    this.Result.gear_category = Object();
    this.Result.properties = Object();
    this.Result.range = Object();

    const itemUrl = this.route.snapshot.paramMap.get('id2');
    // this.route.paramMap.subscribe(params => {
    //   let id1 = params.get('id1');
    //   let id2 = params.get('id2');
    // });
    console.log(itemUrl);
    if (itemUrl != null) {
      this.equipmentService.getEquipmentDetail(itemUrl).subscribe({
        next: (res) => {
          console.log(res)
          this.Result = res
          console.log(this.Result.error)
          if (this.Result.cost) {
            this.setCoinImage();
          }
        },
        error: (e: Error) => {
          console.log("Error " + e.message);
        }
      });
      // this.equipmentService.getEquipmentDetail("magic-items/" + id).subscribe({
      //   next: (res) => {
      //     console.log(res)
      //     this.Result = res
      //     console.log(this.Result.error)
      //   },
      //   error: (e: Error) => {
      //     console.log("Error " + e.message);
      //   }
      // });

    }

  }

  setCoinImage() {
    switch (this.Result.cost.unit) {
      case 'gp':
        this.coinUrl = environment.goldCoin;
        break;
      case 'sp':
        this.coinUrl = environment.silverCoin;
        break;
      case 'cp':
        this.coinUrl = environment.copperCoin;
        break;
      default:
        break;
    }
  }

}
