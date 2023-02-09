import {Injectable} from '@angular/core';
import {formMockData} from '../../mockData/formsMockData';
import {formModel} from "../../models/form-model";

@Injectable({
  providedIn: 'root',
})
export class FormService {

  listForm!: any;
  formList!: formModel[];

  constructor() {
  }

  getList(): formModel[] {
    if (this.formList == undefined || this.formList == null) {
      this.listForm = formMockData;
      this.formList = this.listForm;
    }
    return this.formList;
  }

  save(model: formModel[]) {
    return this.formList = model;
  }

}
