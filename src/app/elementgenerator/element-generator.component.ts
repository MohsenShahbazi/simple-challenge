import {FormGroup} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';

import {elementModel} from "../models/elementModel";
import {elementTypes} from "../enum/elementTypeEnum";


@Component({
  selector: 'app-element-generator',
  templateUrl: './element-generator.component.html',
  styleUrls: ['./element-generator.component.css']
})
export class ElementGeneratorComponent implements OnInit {
  elementTypesList = elementTypes;
  @Input() input!: elementModel;
  @Input() form!: FormGroup;
  title = 'test bugloos'
  constructor() {

  }

  ngOnInit(): void {
  }

  get isValid() {
    return this.form.controls[this.input.fieldName].valid;
  }

}
