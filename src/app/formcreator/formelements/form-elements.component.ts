import {Component, Input} from "@angular/core";
import {formModel} from "../../models/form-model";
import {elementModel} from "../../models/elementModel";
import {elementTypeModel} from "../../models/element-types";
import {elementTypes} from "../../enum/elementTypeEnum";
import {FormBuilder} from "@angular/forms";
import {ElementsService} from "../../services/elements/elements.service";
import {BaseService} from "../../services/shared/base.service";
import {messageTypeEnum} from "../../enum/messageTypeEnum";


@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.css'],
})
export class FormElementsComponent {
  title = 'Element';

  SaveMode = 'New';
  pblBackElement = false;
  plnFirstPage = true;
  plnCreateEditElements = false;
  pnlShowForms = false;
  pnlOptions = false;

  selectedCar: string = "";

  displayedColumns: string[] = ['FieldName', 'DisplayName', 'ElementType', 'Required', 'Actions'];

  @Input() selectedFormModel!: formModel;

  newElementModel!: elementModel;
  elementList!: elementModel[];
  elementTypesSource!: elementTypeModel[];
  controlOptions = [];

  selectedOptionItem: string[] = [];


  elementTypesList = elementTypes;

  constructor(
    private formBuilder: FormBuilder, private elementsService: ElementsService, private sharedService: BaseService) {
  }


  ngOnInit(): void {

    this.elementList = [];
    this.elementsService.save(this.elementList);
    this.getElementList();
    this.getElementTypes();
  }

  getElementList() {
    this.elementList = this.elementsService.getList(this.selectedFormModel.id);
  }

  getElementTypes() {
    this.elementTypesSource = this.elementsService.getElementTypes();
  }

  onElementTypeChange(value: number) {

    if (value == 6 || value == 5) {
      this.pnlOptions = true;
    } else {
      this.pnlOptions = false;
    }
  }

  openPanel() {
    this.selectedOptionItem = [];
    this.plnFirstPage = false;
    this.pblBackElement = true;
    this.plnCreateEditElements = true;
    this.newElementModel = new elementModel;
  }

  back() {
    this.plnFirstPage = true;
    this.pblBackElement = false;
    this.plnCreateEditElements = false;
  }

  onEdit(selectedRow: elementModel) {
    this.SaveMode = 'Edit';
    this.openPanel();
    this.newElementModel = selectedRow;
    if (this.newElementModel.options) {
      this.selectedOptionItem = this.newElementModel.options.map(o => o.value);
    }
  }

  delete(selectedRow: formModel) {
    if (confirm('Are you sure?')) {
      this.elementList = this.elementList.filter(f => f.id != selectedRow.id);
      this.elementsService.save(this.elementList);

      this.sharedService.message(messageTypeEnum.Success, 'Operation Success Completed','Success');
    }

  }

  onCreateEditElements() {
    this.plnFirstPage = false;
    this.pblBackElement = true;
    this.plnCreateEditElements = true;
  }

  save() {
    this.newElementModel.options = this.selectedOptionItem.map((o: string, i: number) => ({key: i.toString(), value: o}));
    if (this.SaveMode == 'New') {
      const MaxId = Math.max.apply(Math, this.elementList.map(o => {
        return o.id;
      }));
      this.newElementModel.id = MaxId + 1;
      this.newElementModel.formId = this.selectedFormModel.id;
      this.elementList.push(this.newElementModel);
    } else if (this.SaveMode == 'Edit') {
      this.elementList = this.elementList.map(a => {
        if (a.id !== this.newElementModel?.id) {
          return a;
        } else {
          return this.newElementModel;
        }
      });
    }
    this.elementsService.save(this.elementList);

    this.back();
    this.SaveMode = 'New';
    this.selectedOptionItem = [];
    this.newElementModel = new elementModel;
    this.sharedService.message(messageTypeEnum.Success, 'Operation Success Completed','Success');
  }
}
