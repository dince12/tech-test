import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { CompanyService } from '../service/company.service';
import { AddModalComponent } from './modals/add-modal/add-modal.component';

import { animate, sequence, style, transition, trigger } from '@angular/animations';

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
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('anim', [
      transition('* => void', [
        style({height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'}),
        sequence([
          animate('.25s ease', style({height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'})),
          animate('.1s ease', style({height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none'}))
        ])
      ]),
      transition('void => active', [
        style({height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none'}),
        sequence([
          animate('.1s ease', style({height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'})),
          animate('.35s ease', style({height: '*', opacity: 1, transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'}))
        ])
      ])
    ])
  ]
})

export class AppComponent implements OnInit {

  public filter: string;

  constructor(
    private modalService: NgbModal,
    public companyService: CompanyService
  ) {
  }

  public removeCompany(company): void {
    // Let the service holding the data interact.
    this.companyService.removeCompany(company);
  }

  public openAddModal(): void {
    const modalRef = this.modalService.open(AddModalComponent, {size: 'lg'});
    modalRef.componentInstance.title = 'Add Company';
  }

  public openEdit(company: ICompany): void {
    const modalRef = this.modalService.open(AddModalComponent, {size: 'lg'});

    modalRef.componentInstance.company = company;
    modalRef.componentInstance.title = 'Edit Company';
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

  public ngOnInit(): void {

    // Make the first call to the "server" to get some data and store this in the service.
    this.companyService.getJSON().subscribe((companies: ICompany[]) => {

      if (companies && companies.length) {
        // set the service to hold the companies
        this.companyService.setList = companies;
      }
    });
  }
}
