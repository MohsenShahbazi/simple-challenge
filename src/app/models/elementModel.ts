import {elementTypes} from "../enum/elementTypeEnum";
import {baseModel} from "./baseModel";

export class elementModel extends baseModel{
  formId: number;
  fieldName: string;
  value: string | undefined;
  displayName: string;
  required: boolean;
  order: number;
  elementType: elementTypes;
  validator: string;
  description: string;
  options: {key: string, value: string}[];

  constructor(options: {
    id?: number;
    formId?: number;
    fieldName?: string;
    displayName?: string;
    value?: string;
    required?: boolean;
    order?: number;
    elementType?: elementTypes;
    validator?: string;
    description?: string;
    options?: {key: string, value: string}[];} = {})
    {
      super();
    this.id = options.id || 1;
    this.formId = options.formId || 1;
    this.fieldName = options.fieldName || '';
    this.displayName = options.displayName || '';
    this.value = options.value;
    this.required = !!options.required;
    this.order = options.order || 1;
    this.elementType = options.elementType || elementTypes.InputTextbox;
    this.validator = options.validator || "";
    this.description = options.description  || '';
    this.options = options.options || [];
  }
}

export class InputTextbox extends elementModel{
  override elementType = elementTypes.InputTextbox;
}

export class InputEmail extends elementModel{
  override elementType = elementTypes.InputEmail;
}

export class InputDate extends elementModel{
  override elementType = elementTypes.InputDate;
}

export class InputNumber extends elementModel{
  override elementType = elementTypes.InputNumber;
}

export class SelectBox extends elementModel{
  override elementType = elementTypes.SelectBox;
}


export class Checkbox extends elementModel{
  override elementType = elementTypes.Checkbox;
}

export class RadioButton extends elementModel{
  override elementType = elementTypes.RadioButton;
}

export class InputTextarea extends elementModel{
  override elementType = elementTypes.InputTextarea;
}

