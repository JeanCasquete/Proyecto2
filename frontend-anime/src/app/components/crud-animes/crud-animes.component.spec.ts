import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAnimesComponent } from './crud-animes.component';

describe('CrudAnimesComponent', () => {
  let component: CrudAnimesComponent;
  let fixture: ComponentFixture<CrudAnimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudAnimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAnimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
