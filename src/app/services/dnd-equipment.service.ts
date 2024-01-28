import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Root {
  count: number
  results: Result[]
  error: string
}

export interface Result {
  index: string
  name: string
  url: string
}

export interface Detail {
  desc: any[]
  special: any[]
  index: string
  name: string
  equipment_category: EquipmentCategory
  gear_category: GearCategory
  tool_category: string
  weapon_category: string
  weapon_range: string
  category_range: string
  cost: Cost
  damage: Damage
  range: Range
  weight: number
  properties: Property[]
  url: string
  contents: any[]
  quantity: number
  error: string
}

export interface EquipmentCategory {
  index: string
  name: string
  url: string
}

export interface GearCategory {
  index: string
  name: string
  url: string
}

export interface Cost {
  quantity: number
  unit: string
}

export interface Damage {
  damage_dice: string
  damage_type: DamageType
}

export interface DamageType {
  index: string
  name: string
  url: string
}

export interface Range {
  normal: number
  long: number
}

export interface Property {
  index: string
  name: string
  url: string
}


@Injectable({
  providedIn: 'root'
})

export class DndEquipmentService {

  constructor(private http: HttpClient) { }

  getAllEquipment(): Observable<Root> {
    return this.http.get<Root>(`${environment.baseUrl}/api/equipment`);
  }

  getEquipmentDetail(id: string): Observable<Detail> {
    console.log(id);
    return this.http.get<Detail>(`${environment.baseUrl}${id}`);
  }

  getAllMagicitems(): Observable<Root> {
    return this.http.get<Root>(`${environment.baseUrl}/api/magic-items`);
  }

  getEquipment(url: string): Observable<Root> {
    return this.http.get<Root>(`${environment.baseUrl}${url}`);
  }
}
