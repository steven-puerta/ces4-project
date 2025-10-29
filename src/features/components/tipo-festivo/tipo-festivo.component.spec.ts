import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFestivoComponent } from './tipo-festivo.component';

describe('TipoFestivoComponent', () => {
  let component: TipoFestivoComponent;
  let fixture: ComponentFixture<TipoFestivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoFestivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoFestivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
