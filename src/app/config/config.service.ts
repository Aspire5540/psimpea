import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable ,  BehaviorSubject }   from 'rxjs';

import { wbsdata,jobreq,trdata,appJob,jobprogress,meterdata,meterdata2,
  trphase,meterdata3,jobRemain,jobRemain2,ezxdevice,matreq,trmatch} from '../model/user.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  [x: string]: any;

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  //private serviceUrl = 'https://jsonplaceholder.typicode.com/users';

  hostUrl = 'http://172.30.212.189/psisservice/';
  //hostUrl = 'http://172.30.212.148/psisservice/';
  // hostUrl = 'http://127.0.0.1/psisservice/';
  
  //headers = new Headers();
  //options = new RequestOptions()
  subdomain = "";
  constructor(private http: HttpClient) {
    //this.headers.append('Content-Type','application/x-www-form-urlencoded');
    //this.options.headers = this.headers;
    this.subdomain = "n2";
   }
   getData(endpoint){
     return this.http.get(this.hostUrl+endpoint+"&region="+this.subdomain);
   }
   getWbs(endpoint): Observable<wbsdata[]> {
    return this.http.get<wbsdata[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getezxdevice(endpoint): Observable<ezxdevice[]> {
    return this.http.get<ezxdevice[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getJobRemain(endpoint): Observable<jobRemain[]> {
    return this.http.get<jobRemain[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getBYRemain(endpoint): Observable<jobRemain[]> {
    return this.http.get<jobRemain2[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getJob(endpoint): Observable<jobreq[]> {
    return this.http.get<jobreq[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }

  getMatReq(endpoint): Observable<matreq[]> {
    return this.http.get<matreq[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getTr(endpoint): Observable<trdata[]> {
    return this.http.get<trdata[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getTr2(endpoint): Observable<trphase[]> {
    return this.http.get<trphase[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getmeterdata2(endpoint): Observable<meterdata2[]> {
    return this.http.get<meterdata2[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getmeterdata3(endpoint): Observable<meterdata3[]> {
    return this.http.get<meterdata3[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getMeter(endpoint): Observable<meterdata[]> {
    return this.http.get<meterdata[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getTrMatch(endpoint): Observable<trmatch[]> {
    return this.http.get<trmatch[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getAppJob(endpoint): Observable<appJob[]> {
    return this.http.get<appJob[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getJobProgress(endpoint): Observable<jobprogress[]> {
    return this.http.get<jobprogress[]>(this.hostUrl+endpoint+"&region="+this.subdomain);
  }
  getStatus(endpoint,params){
    params["region"] = this.subdomain;
    return this.http.post(this.hostUrl+endpoint,JSON.stringify(params));
  }
  /*
  postdata (endpoint,params){
    return this.http2.post(this.hostUrl+endpoint,JSON.stringify(params),this.options).pipe(map(res=>res.json()));
  }
  */
  postdata2 (endpoint,params){
    params["region"] = this.subdomain;
    return this.http.post(this.hostUrl+endpoint,JSON.stringify(params));
  }
  /*
  postdata2 (endpoint,params){
    return this.http2.post(this.hostUrl+endpoint,JSON.stringify(params),this.options).map((response: Response) => response.json());
  }
  getdata(endpoint){
    return this.http2.get(this.hostUrl+endpoint,this.options).map(res=>res.json());
  }
  */
  changeMessage() {
    this.messageSource.next(localStorage.getItem('name'))
  }
  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }


}

