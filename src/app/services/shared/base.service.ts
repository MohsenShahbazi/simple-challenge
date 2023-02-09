import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private toastr: ToastrService) {
  }

  message(type: any, message: string, title: string) {
    this.toastr.show(message, title, undefined, 'success');
  }
}
