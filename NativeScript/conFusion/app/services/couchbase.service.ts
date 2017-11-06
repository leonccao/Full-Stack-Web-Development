import { Injectable } from "@angular/core";
import { Couchbase } from 'nativescript-couchbase';

@Injectable()
export class CouchbaseService {

    private database: any;

    public constructor() {
        this.database = new Couchbase("confusion");
    }

    public getDatabase() {
        return this.database;
    }

    public getDocument(docId: string) {
        return this.database.getDocument(docId);
    }

    public createDocument(data: any, docId: string) {
        return this.database.createDocument(data, docId);
    }

    public updateDocument(docId: string, data: any) {
        return this.database.updateDocument(docId, data);
    }

    public deleteDocument(docId: string) {
        return this.database.deleteDocument(docId);
    }
}