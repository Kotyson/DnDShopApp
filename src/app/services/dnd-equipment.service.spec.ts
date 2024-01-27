import { TestBed } from '@angular/core/testing';

import { DndEquipmentService } from './dnd-equipment.service';

describe('DndEquipmentService', () => {
  let service: DndEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DndEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
