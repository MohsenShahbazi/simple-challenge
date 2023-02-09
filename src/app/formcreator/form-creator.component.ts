import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormService} from '../services/form/form.service';
import {AuthService} from '../services/shared/auth.service';
import {formModel} from "../models/form-model";
import {userModel} from "../models/user-model";
import {roleModel} from "../models/role-model";
import {BaseService} from "../services/shared/base.service";
import {messageTypeEnum} from "../enum/messageTypeEnum";


@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.css'],
})
export class FormCreatorComponent {
  title = 'Form';
  SaveMode = 'New';
  pnlBackForms = false;
  pnlFirstPage = true;
  pnlCreateEditForm = false;
  pnlElements = false;
  pnlFormView = false;
  displayedColumns: string[] = ['formName', 'description', 'Actions'];
  newFormModel!: formModel;
  userLogin!: userModel;
  roleList!: roleModel[];
  formList!: formModel[];
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private sharedService: BaseService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getRoleList();
    this.getFormList();
    this.getUserLogin();
  }

  getRoleList() {
    this.roleList = this.authService.getRolesList();
  }

  getFormList() {
    this.formList = this.formService.getList();
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
  }

  openFormPanel() {
    this.pnlFirstPage = false;
    this.pnlCreateEditForm = true;
    this.pnlBackForms = true;
    this.pnlElements = false;
    this.newFormModel = new formModel;
  }

  back() {
    this.pnlFirstPage = true;
    this.pnlBackForms = false;
    this.pnlCreateEditForm = false;
    this.pnlElements = false;
    this.pnlFormView = false;
  }

  view(selectedRow: formModel) {
    this.pnlFirstPage = false;
    this.pnlBackForms = true;
    this.pnlCreateEditForm = false;
    this.pnlFormView = true;
    this.newFormModel = selectedRow;
  }

  edit(selectedRow: formModel) {
    this.SaveMode = 'Edit';
    this.openFormPanel();
    this.newFormModel = selectedRow;
  }

  onDelete(selectedRow: formModel) {

    if (confirm('Are you sure?')) {
      this.formList = this.formList.filter(f => f.id != selectedRow.id);
      this.formService.save(this.formList);

      this.sharedService.message(messageTypeEnum.Success, 'Operation Success Completed','Success');
    }

  }

  open(selectedRow: formModel) {
    this.pnlFirstPage = false;
    this.pnlBackForms = true;
    this.pnlCreateEditForm = false;
    this.pnlElements = true;
    this.newFormModel = selectedRow;
  }

  save() {

    if (this.SaveMode == 'New') {
      const MaxId = Math.max.apply(Math, this.formList.map(o => {
        return o.id;
      }));
      this.newFormModel.id = MaxId + 1;
      this.formList.push(this.newFormModel);
    } else if (this.SaveMode == 'Edit') {
      this.formList = this.formList.map(a => {
        if (a.id !== this.newFormModel?.id) {
          return a;
        } else {
          return this.newFormModel;
        }
      });
    }

    this.formService.save(this.formList);

    this.back();
    this.SaveMode = 'New';
    this.newFormModel = new formModel;

    this.sharedService.message(messageTypeEnum.Success, 'Operation Success Completed','Success');
  }
}
