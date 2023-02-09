import {Injectable} from '@angular/core'
import {elementMockData} from "../../mockData/elementMockData";
import {elementModel} from "../../models/elementModel";
import {elementTypeModel} from "../../models/element-types";
import {elementTypes} from "../../enum/elementTypeEnum";

@Injectable({
  providedIn: 'root',
})
export class ElementsService {

  lisElements: any;
  elementList!: elementModel[];
  elementTypesList!: elementTypeModel[];

  constructor() {
  }

  getList(id: number): elementModel[] {
    if (this.elementList == undefined || this.elementList == null || this.elementList.length == 0) {

      this.lisElements = elementMockData;
      this.elementList = this.lisElements;

      if (this.elementList.filter(a => a.formId == id).length == 0) {
        this.elementList = this.elementList.filter(a => a.formId == 0);
      } else {
        this.elementList = this.elementList.filter(a => a.formId == id);
      }

    }
    return this.elementList;
  }

  getElementTypes() {

    this.elementTypesList = [
      {elementName: 'InputTextbox', id: elementTypes.InputTextbox},
      {elementName: 'InputEmail', id: elementTypes.InputEmail},
      {elementName: 'InputNumber', id: elementTypes.InputNumber},
      {elementName: 'InputTextarea', id: elementTypes.InputTextarea},
      {elementName: 'InputDate', id: elementTypes.InputDate},
      {elementName: 'SelectBox', id: elementTypes.SelectBox},
      {elementName: 'RadioButton', id: elementTypes.RadioButton},
      {elementName: 'Checkbox', id: elementTypes.Checkbox},
    ];
    return this.elementTypesList;
  }

  save(model: elementModel[]) {
    return this.elementList = model;
  }

}
