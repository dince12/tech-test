import {ICompany} from '../../app.component';

import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {CompanyService} from '../../../service/company.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})

export class AddModalComponent implements OnInit {

  public title: string;

  public company: ICompany;
  public companyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private companyService: CompanyService
  ) {
  }

  public addCompany(): void {

    if (this.company) {

      // find the index
      const index = this.companyService.getList
        .findIndex(data => data.companyName === this.company.companyName);

      // set value of company at index to form controls
      this.companyService.getList[index] = this.companyForm.value;

      this.companyForm.reset();
      this.activeModal.close(true);

      return;
    }

    // push the object to the list of companies.
    this.companyService.getList.push(this.companyForm.value);

    // clear the form and close modal.
    this.companyForm.reset();
    this.activeModal.close(true);

    console.log(this.companyService.getList);

  }

  public ngOnInit(): void {
    // instantiate the company form
    this.companyForm = this.formBuilder.group({
      sector: ['', Validators.required],
      active: ['', Validators.required],
      country: ['', Validators.required],
      creationDay: ['', Validators.required],
      companyName: ['', Validators.required],
      // Customers input must be greater than -1 and be a number.
      customers: ['', [Validators.required, Validators.min(0)]]
    });

    if (this.company) {
      Object.keys(this.company).forEach(data => {
        this.companyForm.controls[data].setValue(this.company[data]);
      });
    }
  }
}
