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
 
  //region='n3';

  constructor(private http: HttpClient) { }

  public upload(data) {
    let uploadURL = `${this.SERVER_URL}/upload.php`;
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }
  public upload2(data) {
    let uploadURL = `${this.SERVER_URL}/upload2.php`;
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }
  public uploadDoc(data) {
    let uploadURL = `${this.SERVER_URL}/uploadDoc.php`;
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }
  public uploadDoc2(data) {
    let uploadURL = `${this.SERVER_URL}/uploadDoc2.php`;
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }
  public uploadZap048(data) {
    let uploadURL = `${this.SERVER_URL}/uploadZap048.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  } 
  public uploadZap048OPSA(data) {
    let uploadURL = `${this.SERVER_URL}/opsa/uploadZap048.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  } 
  public uploadLDCAD(data) {
    let uploadURL = `${this.SERVER_URL}/uploadLDCAD.php`; 
    // console.log(data.append('region',this.region));
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  } 
  public uploadOPSA(data) {
    let uploadURL = `${this.SERVER_URL}/uploadOPSA.php`; 
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
  public uploadPMOPSA(data) {
    let uploadURL = `${this.SERVER_URL}/opsa/uploadPM.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }
  public uploadmb52(data) {
    let uploadURL = `${this.SERVER_URL}/uploadmb52.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }
  public uploadcn52n(data) {
    let uploadURL = `${this.SERVER_URL}/uploadcn52n.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  } 
  public uploadzcn52n(data) {
    let uploadURL = `${this.SERVER_URL}/uploadzcn52n.php`; 
    data.append('region',GlobalConstants.region);
    return this.http.post<any>(uploadURL, data);
  }       
}

