import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongesListComponent } from './conges-list.component';

describe('CongesListComponent', () => {
  let component: CongesListComponent;
  let fixture: ComponentFixture<CongesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
