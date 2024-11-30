import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturaImagemPage } from './captura-imagem.page';

describe('CapturaImagemPage', () => {
  let component: CapturaImagemPage;
  let fixture: ComponentFixture<CapturaImagemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaImagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
