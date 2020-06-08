import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../service/company.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface ICompany {
  sector: string;
  country: string;
  active: boolean;
  customers: number;
  isEditing?: boolean;
  creationDay: string;
  companyName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public companyForm: FormGroup;

  public localCompanies: ICompany[] = [];
  public displayAddInputs: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {
  }

  public removeCompany(company): void {
    // Let the service holding the data interact.
    this.companyService.removeCompany(company);
  }

  public sortListByName(): void {
    this.companyService.getList.sort((a, b) => {
      // kick out early
      if (a.companyName.toLocaleLowerCase() === b.companyName.toLocaleLowerCase()) {
        return 0;
      }
      return a.companyName.toLocaleLowerCase() < b.companyName.toLocaleLowerCase() ? -1 : 1;
    });
  }

  public removeEnds(first?): void {
    // Room for component logic or checking before actioned in service
    this.companyService.removeEitherEnd(first);
  }

  public addCompany(): void {
    // push the object to the list of companies.
    this.companyService.getList.push(this.companyForm.value);

    // clear the form and close the add box.
    this.companyForm.reset();
    this.displayAddInputs = !this.displayAddInputs;
  }

  public isValid(x, company, attr): void {
    // this needs much better validation and error handling.
    // wanted to complete in a time that would allow for an understanding to pace.
    company[attr] = x;
  }

  public openEdit(company: ICompany): void {
    // this needs much better validation and error handling.
    // wanted to complete in a time that would allow for an understanding to pace.
    if (company.isEditing) {
      company.isEditing = !company.isEditing;
      return;
    }

    // toggle the the other to not editing.
    this.companyService.getList
      .forEach((comp: ICompany) => comp.isEditing = false);

    company.isEditing = !company.isEditing;
  }

  public closeAdd(): void {
    this.companyForm.reset();
    this.displayAddInputs = !this.displayAddInputs;
  }

  public ngOnInit(): void {

    // instantiate the company form
    this.companyForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      sector: ['', Validators.required],
      creationDay: ['', Validators.required],
      country: ['', Validators.required],
      // Customers input must be greater than -1 and be a number.
      customers: ['', [Validators.required, Validators.min(0)]],
      active: ['', Validators.required]
    });

    // Make the first call to the "server" to get some data and store this in the service.
    this.companyService.getJSON().subscribe((companies: ICompany[]) => {

      if (companies && companies.length) {
        // give each a flag to toggle an edit.
        companies.map((data: ICompany) => data.isEditing = false);

        this.companyService.setList = companies;

        // Point a local variable to service.
        this.localCompanies = this.companyService.getList;
      }
    });
  }
}
