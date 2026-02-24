import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UprnTable } from './uprn-table.component';

describe('UprnTable', () => {
  let component: UprnTable;
  let fixture: ComponentFixture<UprnTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UprnTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UprnTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
