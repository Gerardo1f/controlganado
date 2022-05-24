import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InseminacionDialogComponent } from './inseminacion-dialog.component';

describe('InseminacionDialogComponent', () => {
  let component: InseminacionDialogComponent;
  let fixture: ComponentFixture<InseminacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InseminacionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InseminacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
