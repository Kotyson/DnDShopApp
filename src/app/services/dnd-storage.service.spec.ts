import { TestBed } from '@angular/core/testing';

import { DndStorageService } from './dnd-storage.service';

describe('DndStorageService', () => {
  let service: DndStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DndStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
