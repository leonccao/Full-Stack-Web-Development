import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable()
export class FeedbackService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post(baseURL + 'feedback', feedback)
    .catch(error => { return this.processHTTPMsgService.handleError(error); });

  }
}