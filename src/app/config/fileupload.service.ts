import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import{ GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  SERVER_URL: string = "http://172.30.212.189/psisservice/";
  //SERVER_URL: string = "http://172.30.212.148/psisservice/";
  //SERVER_URL: string = "http://127.0.0.1/psisservice/";
 
  region='n3';

  constructor(private http: HttpClient) { }

  public upload(data) {
    let uploadURL = `${this.SERVER_URL}/upload.php`;
  
    return this.http.post<any>(uploadURL, data);
  }
  public upload2(data) {
    let uploadURL = `${this.SERVER_URL}/upload2.php`;
  
    return this.http.post<any>(uploadURL, data);
  }
  public uploadDoc(data) {
    let uploadURL = `${this.SERVER_URL}/uploadDoc.php`;
    
    return this.http.post<any>(uploadURL, data);
  }
  public uploadDoc2(data) {
    let uploadURL = `${this.SERVER_URL}/uploadDoc2.php`;
    
    return this.http.post<any>(uploadURL, data);
  }
  public uploadZap048(data) {
    let uploadURL = `${this.SERVER_URL}/uploadZap048.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  } 
  public uploadLDCAD(data) {
    let uploadURL = `${this.SERVER_URL}/uploadLDCAD.php`; 
    // console.log(data.append('region',this.region));
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  } 
  public uploadPEANAME(data) {
    let uploadURL = `${this.SERVER_URL}/uploadPEANAME.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }
  public uploadPEANAME2(data) {
    let uploadURL = `${this.SERVER_URL}/uploadPEANAME2.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }
  public uploadPM(data) {
    let uploadURL = `${this.SERVER_URL}/uploadPM.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }  
}

