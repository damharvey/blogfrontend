import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "../_env/env";

@Injectable({ providedIn: 'root' })
export class PatientService implements OnInit {
    constructor(private http: HttpClient) { }
    ngOnInit() {
        this.getAll();
    }
    async getAll() {
        try {
            const response = await this.http.get<any>(`${environment.apiUrl}Patient`).toPromise();
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async addPatient(patientData: { status: number }[]) {
        try {

            let dataArray: { status: number }[];

            if (Array.isArray(patientData)) {
                dataArray = patientData;
            } else {
                dataArray = [patientData];
            }

            const updatedData = dataArray.map(x => ({ ...x, status: true }));
            const response = await this.http.post<any>(`${environment.apiUrl}Patient`, updatedData[0]).toPromise();
            this.getAll();
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }


    async deletePatient(id: number) {
        try {
            const response = await this.http.delete<any>(`${environment.apiUrl}Patient/${id}`, {}).toPromise();
            this.getAll();
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async updatePatient(id: number, patientData: any) {
        let dataArray: { status: number }[];

        if (Array.isArray(patientData)) {
            dataArray = patientData;
        } else {
            dataArray = [patientData];
        }

        const updatedData = dataArray.map(x => ({ ...x, id: id }));
        try {
            const response = await this.http.put<any>(`${environment.apiUrl}Patient/${id}`, updatedData[0]).toPromise();
            this.getAll();
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }


    async getPagePatient(data: any) {
       try {
        const filtered = `pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&filterFirst=${data.filterFirst}&filterLast=${data.filterLast}&filterCity=${data.filterCity}&filterActive=${data.filterActive}`;
        const apiUrl = `${environment.apiUrl}Patient/GetPaged?${filtered}`;
        const response = await this.http.get<any>(apiUrl).toPromise();
        return response;
        } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
        }
    }

    



}
