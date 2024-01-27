import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EquipmentDetailsPage } from './equipment-details.page';

describe('EquipmentDetailsPage', () => {
  let component: EquipmentDetailsPage;
  let fixture: ComponentFixture<EquipmentDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EquipmentDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
