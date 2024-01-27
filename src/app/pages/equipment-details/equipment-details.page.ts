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
    if (itemUrl != null) {
      this.equipmentService.getEquipmentDetail(itemUrl).subscribe({
        next: (res) => {
          console.log(res)
          this.Result = res
          if (this.Result.cost) {
            this.setCoinImage();
          }
          if (this.Result.desc) {
            this.Result.desc = this.restructureDescWithTables(this.Result.desc);
          }
        },
        error: (e: Error) => {
          console.log("Error " + e.message);
        }
      });

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

  // Table manipulation
  isArr(data: any) {
    return Array.isArray(data);
  }

  isItTable(data: string): boolean {
    let regex = /\|([^|]+)\|/g;
    return regex.test(data);
  }

  getTableRow(data: string) {
    let row = data.split('|');
    row = row.map(d => d.trim());
    row = row.filter(n => n);
    console.log("Cells: " + row);
    return row;
  }

  restructureDescWithTables(desc: Array<string>): Array<any> {
    let newDesc: Array<any> = []
    let table: Array<Array<string>> = []
    console.log("Old");
    console.log(desc)
    for (let element of desc) {
      if (this.isItTable(element)) {
        table.push(this.getTableRow(element));
      } else {
        if (table.length > 0) {
          let head = table.shift();
          table.shift();
          if (head) {
            table.unshift(head);
          }
          newDesc.push(table);
          table = []
        }
        newDesc.push(element);
      }
    }
    if (table.length > 0) {
      let head = table.shift();
      table.shift();
      if (head) {
        table.unshift(head);
      }
      newDesc.push(table);
    }
    console.log("New");
    console.log(newDesc);
    return newDesc;
  }

  getHeaderFromTable(data: any) {
    return data[0];
  }

  getRowsFromTable(data: Array<Array<any>>) {
    return data.slice(1);
  }
}
