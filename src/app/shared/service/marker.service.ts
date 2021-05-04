import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APIS } from "../../config";
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class Markerservice {
    constructor(private http: HttpClient) { }
    AddactionstoMarker(marker: any,id:any): Observable<any> {
        return this.http.post<any>(
            `${APIS.MARKER}/action/${id}`,
            marker
        );
    }
    AddMarker(marker: any): Observable<any> {
        return this.http.post<any>(
            `${APIS.MARKER}`,
            marker
        );
    }
    getAll(): Observable<any> {
        return this.http.get<any[]>(`${APIS.MARKER}`);
    }
    getmarkerbyprojet(id: any): Observable<any> {
        return this.http.get<any[]>(`${APIS.MARKER}/projet/${id}`);
    }
    edit(marker: any, id: any): Observable<any> {
        return this.http.put<any>(`${APIS.MARKER}/${id}`, marker);
    }

    getmarkerByid(id: number): Observable<any> {
        return this.http.get<any[]>(`${APIS.MARKER}/${id}`);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${APIS.MARKER}/${id}`);
    }


}

