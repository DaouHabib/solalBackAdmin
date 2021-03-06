import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APIS } from "../../config";
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class Projectservice {
    constructor(private http: HttpClient) { }
    AddmarkertoProject(marker: any, id: any): Observable<any> {
        return this.http.post<any>(
            `${APIS.PROJET}/marker/${id}`,
            marker
        );
    }
    getmarkerbyProjetByid(id: any): Observable<any> {
        return this.http.get<any[]>(`${APIS.PROJET}/marker/${id}`);
    }
    AddProject(Project: any): Observable<any> {
        return this.http.post<any>(
            `${APIS.PROJET}`,
            Project
        );
    }
    getAll(): Observable<any> {
        return this.http.get<any[]>(`${APIS.PROJET}`);
    }

    edit(Project: any, id: any): Observable<any> {
        return this.http.put<any>(`${APIS.PROJET}/${id}`, Project);
    }

    getProjetByid(id: any): Observable<any> {
        return this.http.get<any[]>(`${APIS.PROJET}/${id}`);
    }
    getProjetByiduser(id: number): Observable<any> {
        return this.http.get<any[]>(`${APIS.PROJET}/user/${id}`);
    }
    delete(id: any): Observable<any> {
        return this.http.delete(`${APIS.PROJET}/${id}`);
    }


}

