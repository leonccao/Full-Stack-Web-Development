import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import 'rxjs/add/operator/delay';

@Injectable()
export class PromotionService {

  constructor(private afs: AngularFirestore) { }

  getPromotions(): Observable<Promotion[]> {
    return this.afs.collection<Promotion>('promotions').snapshotChanges()
    .map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Promotion;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      });
    });
  }

  getPromotion(id: String): Observable<Promotion> {
    return this.afs.doc<Promotion>('promotions/'+ id).snapshotChanges()
    .map(action => {
        const data = action.payload.data() as Promotion;
        const _id = action.payload.id;
        return { _id, ...data };
      });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.afs.collection<Promotion>('promotions', ref => ref.where('featured', '==', true)).snapshotChanges()
    .map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Promotion;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      })[0];
    }); 
  }
}