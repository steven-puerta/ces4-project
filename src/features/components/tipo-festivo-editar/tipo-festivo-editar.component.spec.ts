import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFestivoEditarComponent } from './tipo-festivo-editar.component';

describe('TipoFestivoEditarComponent', () => {
  let component: TipoFestivoEditarComponent;
  let fixture: ComponentFixture<TipoFestivoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoFestivoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoFestivoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
