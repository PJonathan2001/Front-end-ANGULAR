import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComputer } from '../models/IComputer';
import { IResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor(private http: HttpClient){

  }
  getComputers() : Observable<IResponse> {
    return this.http.get<IResponse>('http://localhost:3000/computers');
  }
  getComputer(id: string) : Observable<IResponse> {
    return this.http.get<IResponse>('http://localhost:3000/computers/' + id);
  }
  saveComputer(computer: IComputer) : Observable<IResponse> {
    return this.http.post<IResponse>('http://localhost:3000/computers', computer);
  }
  updateComputer(computer: IComputer) : Observable<IResponse> {
    console.log(computer);
    return this.http.put<IResponse>('http://localhost:3000/computers/' + computer._id, computer);
  }
  deleteComputer(id: string) : Observable<IResponse> {
    return this.http.delete<IResponse>('http://localhost:3000/computers/' + id);
  }

}
