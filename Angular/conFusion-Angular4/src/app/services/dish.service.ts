import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DishService {

  dish: Dish;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getDish(id: string): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes/' + id)
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
                    .map(dishes => dishes[0])
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getDishIds(): Observable<String[] | any> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish._id)})
      .catch(error => { return error; });
  }

  postComment(dishId: string, comment: any) {
    return this.http.post(baseURL + 'dishes/' + dishId + '/comments', comment)
      .catch(error => { return this.processHTTPMsgService.handleError(error); });

  }
}
