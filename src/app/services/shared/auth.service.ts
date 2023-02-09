import {Injectable} from "@angular/core";
import {userModel} from "../../models/user-model";
import {roleModel} from "../../models/role-model";
import {roleEnum} from "../../enum/roleEnum";
import {userLogin} from "../../mockData/userloginMockData";


@Injectable({
  providedIn: 'root',
})
export class AuthService  {
  userLoginDefault!: any;
  userLoginModel!: userModel;
  RoleList!: roleModel[];

  constructor() {
  }

  getRolesList(): roleModel[]{
    this.RoleList = [
      { roleName: 'admin', id: roleEnum.Admin },
      { roleName: 'user', id: roleEnum.User },
    ];
     return this.RoleList;
  }
  getUserLogin(): userModel{
    this.userLoginDefault = userLogin;
    this.userLoginModel = this.userLoginDefault;
  return this.userLoginModel;
  }

}
