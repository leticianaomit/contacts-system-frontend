import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsePersonDTO } from 'src/app/core/models/person';
import { PersonsService } from 'src/app/core/services/persons.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent implements OnInit {
  idPerson: string = '';
  personForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private personData: ResponsePersonDTO,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private personsService: PersonsService
  ) {
    if (this.personData?.id) {
      this.idPerson = this.personData.id;
      this.personForm.patchValue(this.personData);
    }
  }

  ngOnInit(): void {}

  submitForm() {
    const form = this.personForm.value;

    const person: ResponsePersonDTO = form;

    if (this.idPerson) this.updatePerson(person);
    else this.savePerson(person);

    this.dialog.closeAll();
  }

  private updatePerson(person: ResponsePersonDTO) {
    this.personsService.update(this.idPerson, person).subscribe(
      () => {
        console.log('ok');
      },
      (err) => {
        console.log('err');
      }
    );
  }

  private savePerson(person: ResponsePersonDTO) {
    this.personsService.create(person).subscribe(
      () => {
        console.log('ok');
      },
      (err) => {
        console.log('err');
      }
    );
  }
}
