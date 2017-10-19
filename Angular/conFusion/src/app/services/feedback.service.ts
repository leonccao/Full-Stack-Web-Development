import { Injectable } from '@angular/core';

import { Feedback, ContactType } from '../shared/feedback';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular ) { }

  submitFeedback(feedback: Feedback): Observable<Feedback>{
    return this.restangular.all('feedback').post(feedback);
  }
}
