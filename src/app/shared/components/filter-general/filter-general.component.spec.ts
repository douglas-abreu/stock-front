import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGeneralComponent } from './filter-general.component';

describe('FilterGeneralComponent', () => {
  let component: FilterGeneralComponent;
  let fixture: ComponentFixture<FilterGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
