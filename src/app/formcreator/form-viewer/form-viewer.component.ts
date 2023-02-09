import {Component, Input, OnInit} from "@angular/core";
import {formModel} from "../../models/form-model";
import {elementModel} from "../../models/elementModel";
import {FormGroup} from "@angular/forms";
import {ElementsService} from "../../services/elements/elements.service";
import {BaseService} from "../../services/shared/base.service";
import {AuthService} from "../../services/shared/auth.service";
import {elementsControlService} from "../../services/elements/elementsControl.service";
import {messageTypeEnum} from "../../enum/messageTypeEnum";


@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.css']
})
export class FormViewerComponent implements OnInit {
  title: string = 'FormViewer';

  SaveMode = 'New';
  pblBackFormViewer = false;
  plnFirstPage = true;
  plnCreateEditFormViewer = false;
  displayedColumns: string[] = [];

  @Input() selectedFormModel!: formModel;

  elementList!: elementModel[];
  form: FormGroup = new FormGroup({});
  NewData: any;
  formListDate: any[] = [];


  constructor(
    private elementsControlService: elementsControlService,
    private elementsService: ElementsService,
    private sharedService: BaseService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.title = this.selectedFormModel.formName;

    this.elementList = [];
    this.elementsService.save(this.elementList);
    this.elementList = this.elementsService.getList(this.selectedFormModel.id);
    this.form = this.elementsControlService.toFormGroup(this.elementList);

    this.displayedColumns = Object.keys(this.form.value);
    this.displayedColumns.push('Actions');

  }

  openPanel() {
    this.form.reset();
    this.plnFirstPage = false;
    this.plnCreateEditFormViewer = true;
    this.pblBackFormViewer = true;
    this.NewData = [];
  }

  back() {
    this.plnFirstPage = true;
    this.pblBackFormViewer = false;
    this.plnCreateEditFormViewer = false
  }


  delete(SelectedRow: any) {

    if (confirm('Are you sure?')) {
      this.formListDate = this.formListDate.filter(f => f.Id != SelectedRow.Id);

      this.sharedService.message(messageTypeEnum.Success, 'Operation Success Completed','Success');
    }

  }

  edit(SelectedRow: any) {

    this.SaveMode = 'Edit';
    this.openPanel();
    this.NewData = SelectedRow;
    let ColumnArray = Object.keys(this.form.value);
    this.form.value.Name = 'aa22';
    ColumnArray.map(a => {
      if (a != 'Id') {
        this.form.value[a] == this.NewData[a]
      }
    })
  }


  save() {

    if (this.SaveMode == 'New') {

      this.NewData = this.form.value;
      let MaxId = 0;
      if (this.formListDate.length != 0) {
        MaxId = Math.max.apply(Math, this.formListDate.map(o => {
          return o.Id;
        }));
      }
      this.NewData.Id = MaxId + 1;
      this.formListDate.push(this.NewData);

    } else if (this.SaveMode == 'Edit') {
      const selectedId = this.NewData.Id;
      this.NewData = this.form.value;
      this.NewData.Id = selectedId;

      this.formListDate = this.formListDate.map(a => {
        if (a.Id !== +this.NewData.Id) {
          return a;
        } else {
          return this.NewData;
        }
      });
    }

    this.back();
    this.SaveMode = 'New';
    this.NewData = [];

    this.sharedService.message(messageTypeEnum.Success, 'Operation Success Completed','Success');
  }

}
