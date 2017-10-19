import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/delay';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).delay(2000);
  }

  getLeader(id: number): Observable<Leader> {
    return of(LEADERS.filter(leader => leader.id === id)[0]).delay(2000);
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter(leader => leader.featured)[0]).delay(2000);
  }
}
