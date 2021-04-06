import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patterns } from 'src/app/utils/utils';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<FormGroup>();

  public form: FormGroup;
  private readonly ERRORS_FORMS = {
    minlength: 'Campo con menos carácteres de los necesarios',
    pattern: 'Campo con carácteres inválidos',
    required: 'Campo requerido'
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(patterns.email)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      remind: [false]
    });
  }

  showErrorForm(fieldName: string): boolean {
    if (this.form.controls[fieldName]) {
      const { invalid, touched, dirty } = this.form.controls[fieldName];
      return invalid && touched && dirty;
    }
  
    return false;
  }

  getError(fieldName: string): string {
    return this.form.controls[fieldName] 
      && this.form.controls[fieldName].errors
      && this.ERRORS_FORMS[Object.keys(this.form.controls[fieldName].errors)[0]]
  }

  validateForm() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form);
    } 
  }

}
