import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {elementModel} from "../../models/elementModel";
import {elementTypes} from "../../enum/elementTypeEnum";

@Injectable({providedIn: 'root'})
export class elementsControlService{

  toFormGroup(inputs: elementModel[]): FormGroup {
    const group: any = {};

    inputs.forEach(input => {

      let validator: ValidatorFn[] = input.required ? [Validators.required] : [];
      switch (input.elementType) {
        case elementTypes.InputEmail:
          validator.push(Validators.email);
          break;
        default:
          break;
      }
      group[input.fieldName] = validator.length > 0 ? new FormControl(input.value || '', validator)
                                              : new FormControl(input.value || '');
    });

    return new FormGroup(group);
  }
}
