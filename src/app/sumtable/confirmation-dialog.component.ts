import { Component, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FileuploadService } from '../config/fileupload.service';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {
  message: string = "ต้องการลบใช่หรือไม่?"
  confirmButtonText = "ใช่"
  cancelButtonText = "ยกเลิก"
  uploadResponse = '';
  uploadDocResponse = '';
  uploadOPSAResponse='';
  wbs:string;
  choice:number;
  newWbs:string;
  newJobName:string;
  newMv:number;
  newLv:number;
  newTr:number;
  newPeaTr:string;
  newKva:number;
  newVin:number;
  newVdrop:number;
  newLoadTr:number;
  newTrTap:string;
  newIa:number;
  newIb:number;
  newIc:number;
  newLen:number;
  newNday:number;
  newPm:string;
  uploadFileDocname='';
  uploadFilename='';
  uploadFileOpsa='';
  constructor(private uploadService: FileuploadService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialog>) {
    if(data){
    
    this.message = "ต้องการลบ "+data.wbs.wbs || this.message;
    this.wbs=data.wbs;
    this.choice=data.choice;
    this.newWbs=data.wbs.wbs;
    this.newJobName=data.wbs.jobName;
    this.newMv=data.wbs.mv;
    this.newLv=data.wbs.lv;
    this.newTr=data.wbs.tr;
    this.newNday=data.wbs.nday;
    this.newPm=data.wbs.pm;
    this.newPeaTr=data.wbs.peatr;
    this.newKva=data.wbs.kva;
    this.newVin=data.wbs.vin;
    this.newVdrop=data.wbs.vdrop;
    this.newLoadTr=data.wbs.loadTr;
    this.newTrTap=data.wbs.trTap;
    this.newIa=data.wbs.ia;
    this.newIb=data.wbs.ib;
    this.newIc=data.wbs.ic;
    this.newLen=data.wbs.len;



      }
  }

  onConfirmClick(): void {
    this.wbs["newWbs"]=this.newWbs;
    this.wbs["newJobName"]=this.newJobName;
    this.wbs["newMv"]=this.newMv;
    this.wbs["newLv"]=this.newLv;
    this.wbs["newTr"]=this.newTr;
    this.wbs["newNday"]=this.newNday;
    this.wbs["newPm"]=this.newPm;
    this.wbs["newPeaTr"]=this.newPeaTr;
    this.wbs["newKva"]=this.newKva;
    this.wbs["newVin"]=this.newVin;
    this.wbs["newVdrop"]=this.newVdrop;
    this.wbs["newLoadTr"]=this.newLoadTr;
    this.wbs["newTrTap"]=this.newTrTap;
    this.wbs["newIa"]=this.newIa;
    this.wbs["newIb"]=this.newIb;
    this.wbs["newIc"]=this.newIc;
    this.wbs["newLen"]=this.newLen;
    this.wbs["filename"]=this.uploadFilename;
    this.wbs["fileDocname"]=this.uploadFileDocname;
    this.wbs["opsafile"]=this.uploadFileOpsa;

    this.dialogRef.close(this.wbs);
  }
  handleFileInput(event) {
    //console.log(event.target.files[0]);
    this.uploadFilename=event.target.files[0]["name"];
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    formData.append('wbs', this.newWbs);
    this.uploadService.upload2(formData).subscribe(
      (res) => {
        // this.uploadFilename=true;
        this.uploadResponse = res.status;
        //console.log(res);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  handleFileDoc(event) {
    // console.log(event.target.files[0]["name"]);
    this.uploadFileDocname=event.target.files[0]["name"];
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    formData.append('wbs', this.newWbs);
    console.log(formData);
    this.uploadService.uploadDoc2(formData).subscribe(
      (res) => {
        // this.uploadFileDocname=true;
        this.uploadDocResponse = res.status;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleFileOPSA(event) {
    //console.log(event.target.files[0]);
    this.uploadFileOpsa=event.target.files[0]["name"];
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    formData.append('wbs', this.newWbs);
    this.uploadService.uploadFac(formData).subscribe(
      (res) => {
        // this.uploadFileOpsa=true;
        this.uploadOPSAResponse = res.status;
        //console.log(res);
      },
      (err) => {
        //console.log(err);
      }
    );
  }
}