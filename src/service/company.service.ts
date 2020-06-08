import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {ICompany} from '../app/app.component';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  private _companies: ICompany[] = [];

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<ICompany[]> {
    // using http to client to mimic API consumption
    return this.http.get('assets/companies.json').pipe(map((res: any) => res));
  }

  public removeCompany(company: ICompany): void {
    // find the index of the company in the array.
    const index = this._companies.findIndex((comp: ICompany) => comp.companyName === company.companyName);

    // remove the passed in company.
    this._companies.splice(index, 1);
  }

  public removeEitherEnd(first?): void {
    // checking length to avoid trying to splice an empty array.
    if (this._companies.length) {
      first ? this._companies.splice(0, 1) :
        this._companies.splice((this._companies.length - 1) , 1);
    }
  }

  public get getList(): ICompany[] {
    return this._companies;
  }

  public set setList(companies: ICompany[]) {
    this._companies = companies;
  }
}
