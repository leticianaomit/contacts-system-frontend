import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumn } from 'src/app/shared/models/table';
import { ResponsePersonDTO } from 'src/app/core/models/person';
import { PersonsService } from 'src/app/core/services/persons.service';
import { DialogDeleteComponent } from 'src/app/shared/components/dialog-delete/dialog-delete.component';
import { PersonFormComponent } from '../../components/person-form/person-form.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  tableColumns: TableColumn<ResponsePersonDTO>[] = [
    {
      label: 'Nome',
      property: 'name',
      type: 'text',
    },
    {
      property: 'id',
      type: 'actions',
    },
  ];
  displayedColumns: string[] = ['name', 'id'];
  dataSource = new MatTableDataSource<any>();
  pageSizeOptions = [10, 20, 50, 100];

  dialogSubscription!: Subscription;
  personListSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private personsService: PersonsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  ngOnDestroy() {
    this.personListSubscription?.unsubscribe();
    this.dialogSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadPersons() {
    this.personsService.getPersonList();
    this.personListSubscription = this.personsService.personList$.subscribe(
      (data) => {
        this.dataSource.data = data;
      }
    );
  }

  onClickBtnContacts(id: string) {
    this.router.navigate([`persons/${id}/contacts`]);
  }

  onClickBtnDeletePerson(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      autoFocus: false,
    });

    this.dialogSubscription?.unsubscribe();
    this.dialogSubscription =
      dialogRef.componentInstance.whenConfirmDelete.subscribe(() => {
        this.deletePerson(id);
      });
  }

  onClickBtnAddPerson() {
    this.dialog.open(PersonFormComponent, {
      width: '600px',
      autoFocus: false,
    });
  }

  onClickBtnEditPerson(person: ResponsePersonDTO) {
    this.dialog.open(PersonFormComponent, {
      data: person,
      width: '600px',
      autoFocus: false,
    });
  }

  async deletePerson(id: string) {
    await this.personsService.deletePerson(id);
    this.personsService.getPersonList();
    this.dialog.closeAll();
  }
}
