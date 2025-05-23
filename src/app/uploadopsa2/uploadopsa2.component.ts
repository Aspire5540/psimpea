import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../config/config.service';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { wbsdata } from '../model/user.model';
import { AuthService } from '../config/auth.service';
import { HttpClient } from '@angular/common/http';
import { FileuploadService } from '../config/fileupload.service';
import{ GlobalConstants } from '../common/global-constants';
import { GetCookie } from '../common/cookies';

@Component({
  selector: 'app-uploadopsa2',
  templateUrl: './uploadopsa2.component.html',
  styleUrls: ['./uploadopsa2.component.scss']
})
export class Uploadopsa2Component implements OnInit {

  @ViewChild('f', { static: false }) registerForm: NgForm;
  @ViewChild('pm', { static: false }) pmForm: NgForm;
  @ViewChild('opsa', { static: false }) opsaForm: NgForm;

  // URL = "http://127.0.0.1/psisservice/uploadssap/";
  uploadDocResponse = '';
  uploadDocResponse2 = '';
  uploadDocResponse3 = '';
  uploadDocResponse4 = '';
  uploadDocResponse5 = '';
  uploadDocResponse6 = '';
  uploadDocResponse7 = '';
  uploadDocResponse8 = '';
  autoPeaCod = '';
  constructor(private configService: ConfigService, public authService: AuthService, private http: HttpClient, private uploadService: FileuploadService) { }
  peaCode = "";


  ngOnInit() {
    this.peaCode = GetCookie('peaCode'); 
    // this.peaCode = 'D00000'; 
  }
  checkAutho() {
    // return true;
    this.autoPeaCod=GlobalConstants.regionLetter[GlobalConstants.region]+"00000";
    if (this.peaCode == this.autoPeaCod) {
      return true;
    } else {
      return false;
    }

  }

  handleFile048(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadZap048OPSA(formData).subscribe(res => {
      this.uploadDocResponse = res.status;
      //console.log(res);   
    }
    );
  }
  handleFileOPSA(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadOPSA(formData).subscribe(res => {
      this.uploadDocResponse2 = res.status;
      console.log(this.uploadDocResponse2);
    }
    );
  }
  handleFilePEANAME(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadPEANAME(formData).subscribe(res => {
      this.uploadDocResponse3 = res.status;
      //console.log(res);   
    }
    );
  }
  handleFilePEANAME2(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadPEANAME2(formData).subscribe(res => {
      this.uploadDocResponse5 = res.status;
      //console.log(res);   
    }
    );
  }
  handleFilePM(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadPMOPSA(formData).subscribe(res => {
      this.uploadDocResponse4 = res.status;
      //console.log(res);   
    }
    );
  }
  handleFilemb52(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadmb52(formData).subscribe(res => {
      this.uploadDocResponse6 = res.status;
      //console.log(res);   
    }
    );
  }
  handleFilecn52n(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadcn52n(formData).subscribe(res => {
      this.uploadDocResponse7 = res.status;
      //console.log(res);   
    }
    );
  }

  handleFilezcn52n(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadzcn52n(formData).subscribe(res => {
      this.uploadDocResponse8 = res.status;
      //console.log(res);   
    }
    );
  }

  onSubmit() {

    this.configService.postdata2('uploadsql/w048OPSA2tosql.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.registerForm.resetForm();
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }

  uploadOPSA() {
    this.configService.postdata2('uploadsql/opsa2tosql.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.opsaForm.resetForm();
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }

  uploadPEANAME() {
    this.configService.postdata2('uploadsql/peanametosql.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.opsaForm.resetForm();
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }
  uploadPEANAME2() {
    this.configService.postdata2('uploadsql/peaname2tosql.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.opsaForm.resetForm();
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }
  uploadPM() {
    this.configService.postdata2('uploadsql/PMOPSA2tosql.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.pmForm.resetForm();
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }
  uploadmb52() {
    this.configService.postdata2('uploadsql/mb52OPSA2tosql.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.pmForm.resetForm();
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }
  uploadcn52n() {
    this.configService.postdata2('uploadsql/cn52nOPSA2tosql.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.pmForm.resetForm();
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }
  uploadzcn52n() {
    this.configService.postdata2('uploadsql/zcn52nOPSA2tosql.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.pmForm.resetForm();
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }
}

