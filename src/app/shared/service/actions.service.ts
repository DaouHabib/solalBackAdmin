import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APIS } from "../../config";
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class Actionservice {
    constructor(private http: HttpClient) { }
    AddProject(action: any): Observable<any> {
        return this.http.post<any>(
            `${APIS.ACTION}`,
            action
        );
    }
    getAll(): Observable<any> {
        return this.http.get<any[]>(`${APIS.ACTION}`);
    }

    edit(action: any, id: any): Observable<any> {
        return this.http.put<any>(`${APIS.ACTION}/${id}`, action);
    }

    getactionByid(id: number): Observable<any> {
        return this.http.get<any[]>(`${APIS.ACTION}/${id}`);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${APIS.ACTION}/${id}`);
    }


}

