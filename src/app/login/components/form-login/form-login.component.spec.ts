import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormLoginComponent } from './form-login.component';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('componente creado', () => {
    expect(component).toBeTruthy();
  });

  it('formulario valida valores válidos', () => {
    component.form.controls['email'].setValue('mjimem8@gmail.com');
    component.form.controls['password'].setValue('111111');

    expect(component.form.valid).toBeTruthy();
  });

  it('formulario controla valores no válidos', () => {
    component.form.controls['email'].setValue('mjimem8@gmail.com');
    component.form.controls['password'].setValue('111');

    expect(component.form.invalid).toBeTruthy();
  });

  it('componente emite el formulario', () => {
    spyOn(component.onSubmit, 'emit');

    component.form.controls['email'].setValue('mjimem8@gmail.com');
    component.form.controls['password'].setValue('111111');

    component.validateForm();
    expect(component.onSubmit.emit).toHaveBeenCalledWith(component.form);
  });

  it('componente no emite el formulario por valores incorrectos en el formulario', () => {
    spyOn(component.onSubmit, 'emit');

    component.form.controls['email'].setValue('mjimem8@gmail.com');
    component.form.controls['password'].setValue('111');

    component.validateForm();
    expect(component.onSubmit.emit).not.toHaveBeenCalled();
  });

  it('componente emite los campos del formulario', () => {
    spyOn(component.onSubmit, 'emit');

    component.form.controls['email'].setValue('mjimem8@gmail.com');
    component.form.controls['password'].setValue('11111');

    component.validateForm();

    const checkValues = {
      email: 'mjimem8@gmail.com',
      password: '11111',
      remind: false
    };

    expect(component.onSubmit.emit).toHaveBeenCalledWith(jasmine.objectContaining({ value: checkValues }));
  });

});
