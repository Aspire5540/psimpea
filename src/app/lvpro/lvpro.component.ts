import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { trdata, meterdata, meterdata2, matreq, trmatch } from '../model/user.model';
import { AuthService } from '../config/auth.service';
import { HttpClient } from '@angular/common/http';
import { FileuploadService } from '../config/fileupload.service';
import { Chart } from 'chart.js';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexResponsive,
  ApexLegend,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip,
  ApexFill,
} from "ng-apexcharts";
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../format-datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from '../common/global-constants';




export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

export type ChartOptions3 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-lvpro',
  templateUrl: './lvpro.component.html',
  styleUrls: ['./lvpro.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class LVProComponent implements OnInit {

  public pClsChart: Partial<ChartOptions2>;
  public chartOptions1: Partial<ChartOptions2>;
  public chartn1: Partial<ChartOptions2>;
  public chartn2: Partial<ChartOptions2>;
  public chartn3: Partial<ChartOptions2>;
  public chartne1: Partial<ChartOptions2>;
  public chartne2: Partial<ChartOptions2>;
  public chartne3: Partial<ChartOptions2>;
  public chartc1: Partial<ChartOptions2>;
  public chartc2: Partial<ChartOptions2>;
  public chartc3: Partial<ChartOptions2>;
  public charts1: Partial<ChartOptions2>;
  public charts2: Partial<ChartOptions2>;
  public charts3: Partial<ChartOptions2>;

  // public chartOptions3: Partial<ChartOptions>;

  // myBarClsd: Chart;
  // BarMat: Chart;
  testArry = { '100': 20 };
  trAllReg: any;
  option = "2";
  displayedColumns1 = ['aoj', 'PEA_TR', 'kva', 'Location', 'PLoadTOT', 'minV', 'Ub', 'wbs', 'jobStatus', 'Status', 'loadResult', 'loadMea', 'rundate', 'expDate', 'workstatus'];

  displayedColumns2 = ['PEA_TR',
    'PEANAME',
    'kva',
    'LOCATION',
    'newTR',
    'newPEANAME',
    'newkva',
    'location2',
    'distance',
    'map'];
  problemPEA = [];
  displayedColumns3 = ['matCode', 'matName', 'nMat', 'peaName'];
  // public dataSource = new MatTableDataSource<trdata>();
  // public dataSource = new MatTableDataSource<trdata>();
  public dataSource1 = new MatTableDataSource<trdata>();
  public dataSource2 = new MatTableDataSource<trmatch>();
  public dataSource3 = new MatTableDataSource<matreq>();
  // displayedColumns1 = ['Feeder','PEA_Meter','CustName','SUBTYPECOD', 'kWh','rate','rateMeter','Voltage','Line_Type'];
  // displayedColumns2 = ['PEA_TR','Feeder','PEA_Meter','CustName','SUBTYPECOD', 'kWh','rate','rateMeter','Voltage','Line_Type'];
  //TRNo = "00-050333";
  @ViewChild('f', { static: true }) registerForm: NgForm;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('paginator1', { static: false }) paginator1: MatPaginator;
  @ViewChild('sort1', { static: false }) sort1: MatSort;

  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('sort2', { static: true }) sort2: MatSort;

  @ViewChild('paginator3', { static: true }) paginator3: MatPaginator;
  @ViewChild('sort3', { static: true }) sort3: MatSort;

  @ViewChild('chartPEA', { static: true }) chartPEA: ChartComponent;
  tab=0;
  condition = 0;
  peaCode = "";
  nDate = "15";
  choice = '1';
  showTR = false;
  // myDonut: Chart;
  // myDonut200: Chart;
  // myDonut80: Chart;
  // myDonutWBS4: Chart;
  // myDonutWBS5: Chart;
  // myDonutWBS6: Chart;
  chartResult: Chart;
  // chartPEA: Chart;
  chartMat: Chart;
  chartTR: Chart;
  updateDate: string;
  regionOption=1;
  // PEA_TR0: number;
  // PEA_TR1: number;
  // PEA_TR2: number;
  // PEA_TR3: number;
  // WBS4: number;
  // WBS5: number;
  // WBS6: number;
  // PEA_TR1perPEA_TR0: number;
  // PEA_TR2perPEA_TR0: number;
  // PEA_TR3perPEA_TR0: number;
  // WBS4perPEA_TR1: number;
  // WBS5perPEA_TR2: number;
  // WBS6perPEA_TR3: number;
  meterdata = [];
  peaname = {};
  peaname2 = [];
  selBudjet = ['', ''];
  selPea = '';
  selPeaName = 'กฟน.2';
  selMatchPeaName = 'กฟน.2';
  selPeapeaCode = 'B00000';
  selPeapeaCode2 = 'xx';
  region = 'xx';
  selAoj = 'xx';
  currentMatherPea = "";
  currentPea = "";
  TrTotal = 0;
  TrPlnTal = 0;
  TrTotalClsd = 0;
  Statuss = [
    { value: '-' },
    { value: 'อยู่ระหว่างตรวจสอบ' },
    { value: 'อยู่ระหว่างสำรวจประมาณการ' },
    { value: 'อยู่ระหว่างก่อสร้าง' },
    { value: 'ก่อสร้างแล้วเสร็จ' },
    { value: 'อยู่ระหว่างแก้ไขข้อมูล GIS' },
    { value: 'แก้ไขข้อมูล GIS แล้ว' },
    { value: 'ไม่พบปัญหา' },
    { value: 'อื่นๆ โปรดระบุ' },
  ];

  option2 = '1';
  regionData = {};
  Conditions = [
    //{value: 0,viewvalue: 'หม้อแปลงทั้งหมด'},
    { value: 2, viewvalue: 'แรงดัน<200 Volt' },
    { value: 7, viewvalue: 'แรงดัน 200-210 Volt' },
    { value: 1, viewvalue: 'โหลด>100%' },
    { value: 9, viewvalue: 'โหลด 90-100%' },
    { value: 8, viewvalue: 'โหลด 80-90%' },
    { value: 4, viewvalue: 'โหลด<30%' },
    { value: 11, viewvalue: '%UB>50%' },
    { value: 10, viewvalue: '%UB 25-50%' },
    // { value: 12, viewvalue: 'ทุกปัญหา' },
    { value: 6, viewvalue: 'ทั้งหมด' },

  ];

  regionSelect = [
    { value: 1, viewvalue: 'ภาค 1' },
    { value: 2, viewvalue: 'ภาค 2' },
    { value: 3, viewvalue: 'ภาค 3' },
    { value: 4, viewvalue: 'ภาค 4' },
    { value: 5, viewvalue: 'ทุกเขต' },
     { value: 6, viewvalue: 'กฟภ.' },
  ];



  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private router: Router, private configService: ConfigService, public authService: AuthService, private http: HttpClient, private uploadService: FileuploadService) {
    this.getpeaList();
    this.getpeaList2();
    this.getDataRegion();

  }
  // AfterViewInit(){
  //   this.getJobProgressPea2();
  // }

  ngOnInit() {
    this.getDataRegionByProblem();
    // var parts = location.hostname.split('.');
    // console.log(parts);
    // var subdomain = parts.shift();
    // console.log(subdomain);
    //this.peaCode = localStorage.getItem('peaCode');
    // this.getTrData();
    // this.getStatus();
    // this.getMat("1");
    this.getinfo();
    //this.getTRmatch();
    this.getJobProgressPea2();


    // console.log("url:", this.router.url);

    // this.getMatReq();
    //this.getMeterData();

    // this.dataSource.paginator = this.paginator;
    // this.dataSource1.paginator = this.paginator1;
    // this.dataSource2.paginator = this.paginator2;
    // this.dataSource3.paginator = this.paginator3;
    // this.dataSource.sort = this.sort;
    // this.dataSource1.sort = this.sort1;
    // this.dataSource2.sort = this.sort2;
    // this.dataSource3.sort = this.sort3;
    // this.dataSource.paginator = this.paginator1;
    // this.dataSource.sort = this.sort1;
    this.peaCode = localStorage.getItem('peaCode');
    // this.peaCode = 'B0110101';
    //this.peaNum = this.peaCode.substr(1, 5);
    this.selPeapeaCode = this.peaCode.substr(0, 4);
  }
  onGroupChange(val){
    this.option2 = val;
    this.getDataRegionByProblem();
  }

  selectRegion(event) {
    this.regionOption=event.value[0];
   
    this.dashboradPEA();
  }
  openDialog(trdata): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { trdata }
    });

    dialogRef.afterClosed().subscribe(wbsdata => {
      if (wbsdata) {
        if (this.checkAoj(wbsdata.aoj)) {
          this.reTr(wbsdata);
        } else {
          alert("ไม่มีสิทธิ์แก้ไขข้อมูล");
        }
      }
    });
  }
  setTime(time) {
    return new Date(time);
  }
  dayCheck() {
    if (this.nDate == '15') {
      return true;
    } else {
      return false;
    }
  }
  getinfo() {
    this.configService.postdata2('roic/rdInfo.php', { data: 'roicdate' }).subscribe((data => {
      if (data['status'] == 1) {
        this.updateDate = data['data'][0].info;
        //--------------------------------
        //this.roicdate="31 พ.ค. 2563";
      } else {
        alert(data['data']);
      }

    }));

  }
  onDateChange(trdata, event) {
    var day = '' + event.value.getDate();
    var month = '' + event.value.getMonth() + 1;
    var year = event.value.getFullYear();
    // console.log(month,day);
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    this.writeDate(trdata, [year, month, day].join('-'));
    // console.log([year,month,day].join('-'));
  }
  writeDate(trdata, date) {
    this.configService.postdata2('ldcad/wriDate.php', { TRNumber: trdata, rundate: date }).subscribe((data => {
      if (data['status'] == 1) {
        this.getTrData();
        //  this.getStatus();
        // this.getJobProgressPea2();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
  }
  onOther(value, trdata) {
    this.configService.postdata2('ldcad/wriNote.php', { TRNumber: trdata, note: value }).subscribe((data => {
      if (data['status'] == 1) {
        this.getTrData();
        //  this.getStatus();
        this.getJobProgressPea2();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
  }
  checkSelect(selected) {

    if (selected != undefined) {
      // console.log(selected);
      if (selected.includes("อื่นๆ")) {
        return 0;
      } else if (selected.includes("ไม่พบปัญหา")) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }
  checkwbs(wbs, Status) {

    if (Status != null) {
      //console.log(Status, Status.includes("แก้ไขข้อมูล GIS แล้ว"));
      if (Status.includes("แก้ไขข้อมูล GIS แล้ว")) {
        return false;
      } else if (Status.includes("ไม่พบปัญหา")) {
        return false;
      }
    }
    if (wbs == null) {
      return true;
    } else if (wbs.length < 2) {
      return true;
    } else {
      return false;
    }

  }
  checkexpdate(trdata) {
    var todayDate = new Date();
    var exDate = new Date(trdata.expDate);
    if (trdata.jobStatus != null && trdata.jobStatus.length > 1) {
      if (trdata.jobStatus.slice(trdata.jobStatus.length - 2)[0] == 'D' || trdata.jobStatus.slice(trdata.jobStatus.length - 2)[0] == 'F') {
        return false;
      } else if (trdata.WBS[0] !== '4' && (trdata.jobStatus.includes('CLSD') || trdata.jobStatus.includes('TECO'))) {
        return false;
      }
    }

    if (trdata.Status != null) {
      if (trdata.Status.includes('แก้ไขข้อมูล GIS แล้ว') || trdata.Status.includes('ไม่พบปัญหา')) {
        if (trdata.wbs != null) {
          if (trdata.wbs[0] != '2' && trdata.WBS[0] !== 'P' && trdata.WBS[0] !== 'I' && trdata.WBS[0] !== 'C') {
            return false;
          }
        } else {
          return false;
        }

      }
    }
    if (exDate.getTime() <= todayDate.getTime()) {

      return true;
    }
    else {
      return false;
    }
  }


  checkAoj(Aoj) {
    if (Aoj.substring(2, 5) == this.peaCode.substring(1, 4) && this.peaCode.slice(-1) == "1") {
      return true;
    } else if (this.peaCode.substr(1, 3).includes("000")) {
      return true;
    } else if (Aoj.substring(2, 7) == this.peaCode.substring(1, 6)) {
      return true;
    } else {
      return false;
    }

  }
  getpeaList() {
    this.configService.postdata2('rdpeaall2.php', {}).subscribe((data => {


      if (data["status"] == 1) {
        data["data"].forEach(element => {
          this.peaname[element.peaCode] = element.peaName;

        });
        // this.callData();
        this.currentPea = this.peaname[this.peaCode.substring(0, 6)];
        if (this.peaCode == "B00000") {
          this.currentMatherPea = this.peaname[this.peaCode.substring(0, 6)];
        } else {
          this.currentMatherPea = this.peaname[this.peaCode.substring(0, 4)];
        }

      } else {
        alert(data["data"]);
      }

    }))


  }
  getpeaList2() {
    this.configService.postdata2('roic/rdpeaall.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        //console.log(data['data']);
        this.peaname2 = data['data'];
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))

  }
  onValChange(val) {
    this.option = val;
    this.showTR = false;
    // if (val == 5) {
    //   this.showTR = true;
    //   this.getLoad100();
    // }
    this.getJobProgressPea2();

  }
  getLoad100() {
    this.configService.postdata2('ldcad/rdLoad100.php', { nDay: this.nDate }).subscribe((data => {
      if (data['status'] == 1) {
        console.log(data['data']);
        var label = ['30 kVA']
        var nTR = [0];
        data['data'].forEach(element => {
          if (Number(element.kva) <= 30) {
            nTR[0] = nTR[0] + Number(element.nTR)
          } else {
            label.push(element.kva + " kVA");
            nTR.push(element.nTR)
          }

        });
        var chartData = {
          labels: label,
          datasets: [
            {
              label: 'จำนวนหม้อแปลง',
              data: nTR,
              backgroundColor: '#FFFFF',
            },
          ]
        };

        if (this.chartTR) this.chartTR.destroy();
        this.chartTR = new Chart('chartTR', {
          type: 'horizontalBar',
          data: chartData,
          options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 2,
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: 'bottom',
              display: true,
              defaultFontSize: 30,
              labels: {
                display: true,
                defaultFontSize: 30,
                fontColor: 'white'
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontSize: 14,
                  fontColor: "white",
                }
              }],
              yAxes: [{
                ticks: {
                  fontSize: 14,
                  fontColor: "white",
                }
              }]
            },
            animation: {
              onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.fillStyle = "white";
                ctx.textAlign = 'left';
                ctx.textBaseline = 'center';
                this.data.datasets.forEach(function (dataset) {
                  for (var i = 0; i < dataset.data.length; i++) {
                    for (var key in dataset._meta) {
                      var model = dataset._meta[key].data[i]._model;
                      ctx.fillText(dataset.data[i], model.x + 10, model.y);
                    }

                  }
                });

              }
            }
          }

        });
      } else {
        alert(data['data']);
      }

    }));
  }
  selectPea(event) {
    this.selPea = event.value[0];
    this.selPeaName = event.value[2];
    this.selPeapeaCode = event.value[1];
    this.currentMatherPea = this.peaname[this.selPeapeaCode];
    this.getJobProgressPea2();
    //this.getJobClsdPea();


  }
  selectMatchPea(event) {

    this.selMatchPeaName = event.value[2];
    this.selPeapeaCode2 = event.value[1];
    this.selAoj = GlobalConstants.regionNumber[GlobalConstants.region] + this.selPeapeaCode2.substr(1, 2);
    this.region = GlobalConstants.region;
    this.getTRmatch();
    //this.getJobClsdPea();


  }
  getDataRegion() {
    var dataCnt = 0;
    var regions = Object.keys(GlobalConstants.regionLetter);
    this.configService.postdata2('ldcad/rdTRAll.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.trAllReg = data;
        //console.log('trall',data);
      } else {
        alert(data['data']);
      }

    }));
    this.regionData = [];
    regions.forEach(region => {
      this.configService.postdata('ldcad/rdProblemAll.php', { region: region }).subscribe((data => {
        if (data['status'] == 1) {
          this.regionData[region] = data["data"][0];
          dataCnt++;
          if (dataCnt == 12) {
            this.getJobProgressPea();
          }

        } else {
          alert(data['data']);
        }

      }));
    });

  }
  getDataRegionByProblem() {
    var dataCnt = 0;
    this.problemPEA = [];
    var regions = Object.keys(GlobalConstants.regionLetter);
    regions.forEach(region => {
      this.configService.postdata('ldcad/rdLoadRegion.php', { region: region, option: this.option2 }).subscribe((data => {
        if (data['status'] == 1) {
          this.problemPEA[region] = data["data"][0];
          dataCnt++;
          if (dataCnt == 12) {
            this.dashboradPEA();
          }

        } else {
          alert(data['data']);
        }

      }));
    });

  }
  dashboradPEA() {
    
    var regions = Object.keys(GlobalConstants.regionLetter);
    var regionsLabel=[];
    var inprogress = [];
    var jobDone = [];
    var jobRemain = [];
    var data = [];
    
    if(this.regionOption==1){
      regions=regions.slice(0,3);
    }else if(this.regionOption==2){
      regions=regions.slice(3,6);
    }else if(this.regionOption==3){
      regions=regions.slice(6,9);
    }else if(this.regionOption==4){
      regions=regions.slice(9,12);
    }
    console.log(this.regionOption,regions);
    if(this.regionOption==6){
      jobDone[0]=0;
      inprogress[0]=0;
      jobRemain[0]=0;
      var totalTR=0;
      for (var i = 0; i < regions.length; i++) {
        
        data = this.problemPEA[regions[i]];
        jobDone[0]=jobDone[0]+Number(data['nNo']) + Number(data['nGIS']) + Number(data['nCLSD']);
        inprogress[0]=inprogress[0]+Number(data['nWBS']) - Number(data['nCLSD']);
        jobRemain[0]=jobRemain[0]+Number(data['nTR'])-Number(data['nNo']) - Number(data['nGIS'])-Number(data['nWBS']);
        totalTR=totalTR+Number(data['nTR']);
      }
      regionsLabel.push('กฟภ.');
      jobDone[0]=Math.round(jobDone[0]/totalTR*100);
      inprogress[0]=Math.round(inprogress[0]/totalTR*100);
      jobRemain[0]=Math.round(jobRemain[0]/totalTR*100);
    }else{
      for (var i = 0; i < regions.length; i++) {
        regionsLabel.push(regions[i].toUpperCase());
        data = this.problemPEA[regions[i]];
        jobDone.push(Math.round((Number(data['nNo']) + Number(data['nGIS']) + Number(data['nCLSD'])) / Number(data['nTR']) * 100));
        inprogress.push(Math.round((Number(data['nWBS']) - Number(data['nCLSD'])) / Number(data['nTR']) * 100));
        // console.log((Number(data['nWBS']) - Number(data['nCLSD'])) / Number(data['nTR']) * 100);
        jobRemain.push(100 - Math.round((Number(data['nNo']) + Number(data['nGIS']) + Number(data['nCLSD'])) / Number(data['nTR']) * 100) - Math.round((Number(data['nWBS']) - Number(data['nCLSD'])) / Number(data['nTR']) * 100));
      }
      
    }

    // console.log('plotdata',regionsLabel, jobDone, inprogress, jobRemain);
    
    var chartData = {};
      chartData = {
        labels: regionsLabel,
        segmentShowStroke: false,
        datasets: [
          {
            label: 'ดำเนินการแล้วเสร็จ',
            stack: 'Stack 1',
            data: jobDone,
            backgroundColor: '#B05CBA',
          },
          {
            label: 'อยู่ระหว่างดำเนินการ',
            stack: 'Stack 1',
            data: inprogress,
            backgroundColor: '#D9D9D9',
          },
          {
            label: 'ยังไม่มีแผนงาน',
            stack: 'Stack 1',
            data: jobRemain,
            backgroundColor: '#ED639E',
          },
        ]
      };
    

    if (this.chartPEA) this.chartPEA.destroy();
    this.chartPEA = new Chart('chartPEA', {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        color: '#fff',
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          position: 'nearest',
          mode: 'single',
        },
        legend: {
          position: 'right',
          labels: {
            display: true,
            defaultFontSize: 40,
            fontColor: 'white'
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 14,
              fontColor: "white",
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 14,
              fontColor: "white",
            }
          }]
        },
        animation: {
          onComplete: function () {
            var ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.fillStyle = "white";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'center';
            // console.log(this.data.datasets);
            this.data.datasets.forEach(function (dataset) {
              for (var i = 0; i < dataset.data.length; i++) {
                for (var key in dataset._meta) {
                  var model = dataset._meta[key].data[i]._model;
                  if(dataset.data[i]!=0){
                  ctx.fillText(dataset.data[i], model.x-5, model.y);
                }
                }

              }
            });

          }
        },
      }
    });




  }
  getJobProgressPea() {
    // (Number(this.regionData[1].nCLSD)+Number(this.regionData[1].nGIS)+Number(this.regionData[1].nNo)) / 

    // console.log((Number(this.regionData[1].nCLSD)+Number(this.regionData[1].nGIS)+Number(this.regionData[1].nNo)));
    var region = 'n1';
    console.log('trall',this.trAllReg);
    this.chartn1 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#842D73'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#842D73",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#842D73",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#842D73",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 'n2';
    this.chartn2 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#842D73'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#842D73",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#842D73",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#842D73",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 'n3';
    this.chartn3 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#842D73'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#842D73",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#842D73",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#842D73",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 'ne1';
    this.chartne1 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#EE316B'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#EE316B",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#EE316B",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#EE316B",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 'ne2';
    this.chartne2 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#EE316B'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#EE316B",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#EE316B",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#EE316B",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 'ne3';
    this.chartne3 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#EE316B'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#EE316B",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#EE316B",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#EE316B",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 'c1';
    this.chartc1 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#FFA109'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#FFA109",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#FFA109",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#FFA109",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 'c2';
    this.chartc2 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#FFA109'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#FFA109",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#FFA109",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#FFA109",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 'c3';
    this.chartc3 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#FFA109'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#FFA109",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#FFA109",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#FFA109",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 's1';
    this.charts1 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#7030A0'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#7030A0",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#7030A0",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#7030A0",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 's2';
    this.charts2 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#7030A0'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#7030A0",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#7030A0",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#7030A0",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };

    var region = 's3';
    this.charts3 = {
      series: [(Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100],
      chart: {
        height: 310,
        type: "radialBar",
        stacked: true,
        toolbar: {
          show: false
        }
      },
      fill: {
        colors: ['#7030A0'],
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#FFFFFF",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#F0EEED",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: "#7030A0",
              fontSize: "30px",
            },
            total: {
              show: true,
              label: region.toUpperCase(),
              color: "#7030A0",
              fontSize: '30px',
              formatter: function (val) {
                // return val.config.series[0].toFixed(2).toString() + "%";
                return val.config.series[0].toFixed(0).toString() + "%";
              },
              // formatter: function () {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249
              // }
            },
            value: {
              color: "#7030A0",
              fontSize: "40px",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["งานคงเหลือ"]

    };
  }
  getJobProgressPea2() {

    this.configService.postdata2('ldcad/rdLoad2.php', { peaCode: this.selPeapeaCode, option: this.option }).subscribe((data => {
      if (data['status'] == 1) {

        var Pea = [];
        var kva = [];
        var GIS = [];
        var CLSD = [];
        var No = [];
        var Volt = [];
        this.TrTotal = 0;
        var kvaPln = [];
        this.TrPlnTal = 0;
        var VoltObj = [];
        this.TrTotalClsd = 0;
        var kvaByPeaObj = [];
        var firstLoop = true;
        var lastPea = '';
        var total = 0;




        firstLoop = true;
        lastPea = '';
        total = 0;
        if (this.option == '1' || this.option == '6' || this.option == '3') {
          kvaByPeaObj['volt'] = [];
          for (var i = 0; i < data['dataVoltage'].length; i++) {
            if (kvaByPeaObj['volt'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['dataVoltage'][i].Pea]]) {
              kvaByPeaObj['volt'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['dataVoltage'][i].Pea]].push([data['dataVoltage'][i].kva, Number(data['dataVoltage'][i].totalTr)]);
            } else {
              kvaByPeaObj['volt'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['dataVoltage'][i].Pea]] = [];
              kvaByPeaObj['volt'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['dataVoltage'][i].Pea]].push([data['dataVoltage'][i].kva, Number(data['dataVoltage'][i].totalTr)]);
            }

            // console.log(data['dataP'][i],data['dataP'][i].Pea!=lastPea && !firstLoop);
            if (data['dataVoltage'][i].Pea != lastPea && !firstLoop) {
              VoltObj[data['dataVoltage'][i - 1].Pea] = total;
              total = Number(data['dataVoltage'][i].totalTr);
            } else {
              total = total + Number(data['dataVoltage'][i].totalTr);
            }
            if (i == data['dataVoltage'].length - 1) {
              VoltObj[data['dataVoltage'][i].Pea] = total;
            }
            lastPea = data['dataVoltage'][i].Pea;
            firstLoop = false;
          }
        }


        firstLoop = true;
        lastPea = '';
        var totalTR = 0;
        var totalWBS = 0;
        var totalGIS = 0;
        var totalNO = 0;
        var totalCLSD = 0;
        var peaInd = [];

        // var kvaPln=[];
        kvaByPeaObj['plan'] = [];
        kvaByPeaObj['wbs'] = [];
        kvaByPeaObj['gis'] = [];
        kvaByPeaObj['no'] = [];
        kvaByPeaObj['clsd'] = [];
        for (var i = 0; i < data['data'].length; i++) {
          if (kvaByPeaObj['plan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]]) {
            kvaByPeaObj['plan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nTR)]);
            kvaByPeaObj['wbs'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nWBS)]);
            kvaByPeaObj['gis'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nGIS)]);
            kvaByPeaObj['no'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nNo)]);
            kvaByPeaObj['clsd'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nCLSD)]);
          } else {
            kvaByPeaObj['plan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['plan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nTR)]);
            kvaByPeaObj['wbs'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['wbs'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nWBS)]);
            kvaByPeaObj['gis'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['gis'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nGIS)]);
            kvaByPeaObj['no'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['no'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nNo)]);
            kvaByPeaObj['clsd'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['clsd'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nCLSD)]);

          }

          // console.log(data['data'][i],data['data'][i].Pea!=lastPea && !firstLoop);
          if (data['data'][i].Pea != lastPea && !firstLoop) {
            Pea.push(this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i - 1].Pea]);
            peaInd.push(data['data'][i - 1].Pea);
            kvaPln.push(totalTR);
            kva.push(totalWBS);
            GIS.push(totalGIS);
            No.push(totalNO);
            CLSD.push(totalCLSD);
            totalTR = Number(data['data'][i].nTR);
            totalWBS = Number(data['data'][i].nWBS);
            totalGIS = Number(data['data'][i].nGIS);
            totalNO = Number(data['data'][i].nNo);
            totalCLSD = Number(data['data'][i].nCLSD);
          } else {
            totalTR = totalTR + Number(data['data'][i].nTR);
            totalWBS = totalWBS + Number(data['data'][i].nWBS);
            totalGIS = totalGIS + Number(data['data'][i].nGIS);
            totalNO = totalNO + Number(data['data'][i].nNo);
            totalCLSD = totalCLSD + Number(data['data'][i].nCLSD);
          }
          if (i == data['data'].length - 1) {
            Pea.push(this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]);
            kvaPln.push(totalTR);
            kva.push(totalWBS);
            GIS.push(totalGIS);
            No.push(totalNO);
            CLSD.push(totalCLSD);
            peaInd.push(data['data'][i].Pea);
          }
          this.TrPlnTal = this.TrPlnTal + Number(data['data'][i].nTR);
          lastPea = data['data'][i].Pea;
          firstLoop = false;
          this.TrTotal = this.TrTotal + Number(data['data'][i].nWBS) + Number(data['data'][i].nGIS) + Number(data['data'][i].nNo);
          this.TrTotalClsd = this.TrTotalClsd + Number(data['data'][i].nCLSD) + Number(data['data'][i].nGIS) + Number(data['data'][i].nNo);
        }

        for (var i = 0; i < peaInd.length; i++) {

          if (this.option == '1' || this.option == '3' || this.option == '6') {
            if (VoltObj[peaInd[i]]) {
              Volt.push(VoltObj[peaInd[i]]);
              // kvaPercent.push(kvaObj[peaInd[i]] / element.totalTr * 100)
              kvaPln[i] = kvaPln[i] - Volt[i];
            } else {
              Volt.push(0);
              // kvaPercent.push(0);
            }
          }
        }
        // });

        //this.kvaTotal=505;
        //APEX CHART

        this.chartOptions1 = {
          series: [this.TrTotal / this.TrPlnTal * 100, this.TrTotalClsd / this.TrPlnTal * 100],
          chart: {
            height: 400,
            type: "radialBar",
            stacked: true,
            toolbar: {
              show: false
            }
          },
          fill: {
            colors: ['#118ab2', '#ffd166'],
          },
          plotOptions: {
            radialBar: {
              startAngle: 0,
              endAngle: 360,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#30366C",
                image: undefined,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35
                }
              },

              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#fff",
                  fontSize: "17px",
                },
                total: {
                  show: true,
                  label: 'ผลการตรวจสอบ : ผลการปิดงาน',
                  color: "white",
                  formatter: function (val) {
                    return parseInt(val.config.series[0].toString(), 10).toString() + "%" + " : " + parseInt(val.config.series[1].toString(), 10).toString() + "%";
                  }
                  // formatter: function () {
                  //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  //   return 249
                  // }
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val.toString(), 10).toString() + "%";
                  },
                  color: "#fff",
                  fontSize: "36px",
                  show: true
                }
              }
            }
          },
          stroke: {
            lineCap: "round"
          },
          labels: ["ผลการตรวจสอบ", "ผลการปิดงาน"]

        };


        // Chart JS ====================================
        var chartData = {};
        if (this.option != '1' && this.option != '3' && this.option != '6') {
          chartData = {
            labels: Pea,
            segmentShowStroke: false,
            datasets: [
              {
                label: 'ปิด WBS/ใบสั่ง แล้ว',
                stack: 'Stack 1',
                data: CLSD,
                backgroundColor: '#cc8400',
              },
              {
                label: 'แก้ไข GIS',
                stack: 'Stack 1',
                data: GIS,
                backgroundColor: '#ffd166',
              },
              {
                label: 'ไม่พบปัญหา',
                stack: 'Stack 1',
                data: No,
                backgroundColor: '#ffd166',
              },
              {
                label: 'มี WBS/ใบสั่ง แล้ว',
                stack: 'Stack 2',
                data: kva,
                backgroundColor: '#118ab2',
              },
              {
                label: 'แก้ไข GIS',
                stack: 'Stack 2',
                data: GIS,
                backgroundColor: '#ffd166',
              },
              {
                label: 'ไม่พบปัญหา',
                stack: 'Stack 2',
                data: No,
                backgroundColor: '#ffd166',
              },
              {
                label: 'หม้อแปลงทั้งหมด',
                stack: 'Stack 3',
                data: kvaPln,
                backgroundColor: '#06d6a0',
              },
            ]
          };
        } else {
          if (this.option == '6') {
            chartData = {
              labels: Pea,
              datasets: [
                {
                  label: 'ปิด WBS/ใบสั่ง แล้ว',
                  stack: 'Stack 1',
                  data: CLSD,
                  backgroundColor: '#cc8400',
                },
                {
                  label: 'แก้ไข GIS',
                  stack: 'Stack 1',
                  data: GIS,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'ไม่พบปัญหา',
                  stack: 'Stack 1',
                  data: No,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'มี WBS/ใบสั่ง แล้ว',
                  stack: 'Stack 2',
                  data: kva,
                  backgroundColor: '#118ab2',
                },
                {
                  label: 'แก้ไข GIS',
                  stack: 'Stack 2',
                  data: GIS,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'ไม่พบปัญหา',
                  stack: 'Stack 2',
                  data: No,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'แรงดัน 200-204 V',
                  stack: 'Stack 3',
                  data: Volt,
                  backgroundColor: '#ef476f',
                },
                {
                  label: 'แรงดัน 205-210 V',
                  stack: 'Stack 3',
                  data: kvaPln,
                  backgroundColor: '#06d6a0',
                },
              ]
            }
          } else if (this.option == '3') {
            chartData = {
              labels: Pea,
              datasets: [
                {
                  label: 'ปิด WBS/ใบสั่ง แล้ว',
                  stack: 'Stack 1',
                  data: CLSD,
                  backgroundColor: '#cc8400',
                },
                {
                  label: 'แก้ไข GIS',
                  stack: 'Stack 1',
                  data: GIS,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'ไม่พบปัญหา',
                  stack: 'Stack 1',
                  data: No,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'มี WBS/ใบสั่ง แล้ว',
                  stack: 'Stack 2',
                  data: kva,
                  backgroundColor: '#118ab2',
                },
                {
                  label: 'แก้ไข GIS',
                  stack: 'Stack 2',
                  data: GIS,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'ไม่พบปัญหา',
                  stack: 'Stack 2',
                  data: No,
                  backgroundColor: '#ffd166',
                },
                {
                  label: '%UB >50%',
                  stack: 'Stack 3',
                  data: kvaPln,
                  backgroundColor: '#ef476f',
                },

                {
                  label: '%UB 25-50%',
                  stack: 'Stack 3',
                  data: Volt,
                  backgroundColor: '#06d6a0',
                },
              ]
            }
          } else if (this.option == '1') {
            chartData = {
              labels: Pea,
              datasets: [
                {
                  label: 'ปิด WBS/ใบสั่ง แล้ว',
                  stack: 'Stack 1',
                  data: CLSD,
                  backgroundColor: '#cc8400',
                },
                {
                  label: 'แก้ไข GIS',
                  stack: 'Stack 1',
                  data: GIS,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'ไม่พบปัญหา',
                  stack: 'Stack 1',
                  data: No,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'มี WBS/ใบสั่ง แล้ว',
                  stack: 'Stack 2',
                  data: kva,
                  backgroundColor: '#118ab2',
                },
                {
                  label: 'แก้ไข GIS',
                  stack: 'Stack 2',
                  data: GIS,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'ไม่พบปัญหา',
                  stack: 'Stack 2',
                  data: No,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'โหลด 90-100%',
                  stack: 'Stack 3',
                  data: kvaPln,
                  backgroundColor: '#ef476f',
                },
                {
                  label: 'โหลด 80-90%',
                  stack: 'Stack 3',
                  data: Volt,
                  backgroundColor: '#06d6a0',
                },

              ]
            }
          }


        }

        if (this.chartResult) this.chartResult.destroy();
        this.chartResult = new Chart('chartResult', {
          type: 'horizontalBar',
          data: chartData,
          options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 2,
              }
            },
            color: '#fff',
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              position: 'nearest',
              mode: 'single',
              callbacks: {
                label: function (tooltipItem, data, myData = kvaByPeaObj) {
                  // console.log(myData[tooltipItem.label],tooltipItem);

                  var ind = tooltipItem.datasetIndex;
                  var arryLabel = [];
                  var kvaObj = [];
                  var voltObj = [];
                  var gisObj = [];
                  var noObj = [];
                  if (data.datasets[tooltipItem.datasetIndex].label.includes('ทั้งหมด')) {
                    kvaObj = myData["plan"][tooltipItem.label];
                  } else if (data.datasets[tooltipItem.datasetIndex].label.includes('มี WBS')) {
                    kvaObj = myData["wbs"][tooltipItem.label];
                  } else if (data.datasets[tooltipItem.datasetIndex].label.includes('ปิด WBS')) {
                    kvaObj = myData["clsd"][tooltipItem.label];
                  } else if (data.datasets[tooltipItem.datasetIndex].label.includes('แรงดัน 205-210') ||
                    data.datasets[tooltipItem.datasetIndex].label.includes('โหลด 90-100') ||
                    data.datasets[tooltipItem.datasetIndex].label.includes('%UB >50')) {
                    var plnObj = myData["plan"][tooltipItem.label];
                    voltObj = myData["volt"][tooltipItem.label];
                    for (var i = 0; i < plnObj.length; i++) {
                      kvaObj.push([plnObj[i][0], plnObj[i][1]]);
                      for (var j = 0; j < voltObj.length; j++) {
                        if (kvaObj[i][0] == voltObj[j][0]) {
                          kvaObj[i][1] = plnObj[i][1] - voltObj[j][1];
                          break
                        }
                      }
                    }
                  } else if (data.datasets[tooltipItem.datasetIndex].label.includes('แรงดัน 200-204') ||
                    data.datasets[tooltipItem.datasetIndex].label.includes('โหลด 80-90') ||
                    data.datasets[tooltipItem.datasetIndex].label.includes('%UB 25')) {
                    kvaObj = myData["volt"][tooltipItem.label];
                  } else if (data.datasets[tooltipItem.datasetIndex].label.includes('ไม่พบ') ||
                    data.datasets[tooltipItem.datasetIndex].label.includes('GIS')) {
                    noObj = myData["no"][tooltipItem.label] ? myData["no"][tooltipItem.label] : [];
                    gisObj = myData["gis"][tooltipItem.label] ? myData["gis"][tooltipItem.label] : [];
                    var kvalist = [];
                    for (var i = 0; i < gisObj.length; i++) {
                      kvaObj.push([gisObj[i][0], gisObj[i][1], 0]);
                      kvalist.push(gisObj[i][0]);
                    }
                    for (var j = 0; j < noObj.length; j++) {
                      if (kvalist.indexOf(noObj[j][0]) >= 0) {
                        kvaObj[kvalist.indexOf(noObj[j][0])][2] = noObj[j][1];
                      } else {
                        kvaObj.push([noObj[j][0], 0, noObj[j][1]]);
                      }
                      kvaObj = kvaObj.sort(function (a, b) {
                        if (Number(a[0]) < Number(b[0])) return -1;
                        if (Number(a[0]) > Number(b[0])) return 1;
                        return 0;
                      });
                    }
                  }
                  if (ind == 1 || ind == 2 || ind == 4 || ind == 5) {
                    arryLabel.push(data.datasets[1].label + " : " + data.datasets[1].data[tooltipItem.index] + " เครื่อง , " + data.datasets[2].label + " : " + data.datasets[2].data[tooltipItem.index] + "เครื่อง");
                    kvaObj.forEach(element => {
                      if (element[1] > 0 || element[2] > 0) {
                        arryLabel.push(element[0] + ' kVA ' + element[1] + "," + element[2] + ' เครื่อง')
                      }
                    });


                    return arryLabel;
                  } else {
                    arryLabel.push(data.datasets[tooltipItem.datasetIndex].label + " : " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + " เครื่อง");
                    kvaObj.forEach(element => {
                      if (element[1] > 0) {
                        arryLabel.push(element[0] + ' kVA ' + element[1] + ' เครื่อง')
                      }
                    });
                    // console.log(arryLabel);
                    return arryLabel
                  }
                }
              },
              // filter: function (tooltipItem, data) {
              //   console.log(tooltipItem, data);
              //   var label = data.datasets[tooltipItem.datasetIndex].label;
              //   if ((label.includes('GIS') || label.includes('ไม่พบปัญหา')) && tooltipItem.datasetIndex > 2) {
              //     return false;
              //   } else {
              //     return true;
              //   }
              // }
            },
            legend: {
              position: 'bottom',
              labels: {
                filter: function (item, chart) {
                  var show = true;
                  if ((item.text.includes('GIS') || item.text.includes('ไม่พบปัญหา') && item.datasetIndex > 2)) {
                    show = false;
                  }
                  return show;
                },
                display: true,
                defaultFontSize: 30,
                fontColor: 'white'
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontSize: 14,
                  fontColor: "white",
                }
              }],
              yAxes: [{
                ticks: {
                  fontSize: 14,
                  fontColor: "white",
                }
              }]
            },
            animation: {
              onComplete: function () {
                this.options.animation.onComplete = null;
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.fillStyle = "white";
                ctx.textAlign = 'left';
                ctx.textBaseline = 'center';
                // console.log(this.data.datasets);
                var sum = [];
                var sumClsd = [];
                var psum = [];
                var pclsd = [];
                var aryLen = this.data.datasets.length - 1;
                if (this.data.datasets.length == 7) {
                  for (var i = 0; i < this.data.datasets[1].data.length; i++) {
                    sum.push(this.data.datasets[1].data[i] + this.data.datasets[2].data[i] + this.data.datasets[3].data[i])
                    sumClsd.push(this.data.datasets[0].data[i] + this.data.datasets[1].data[i] + this.data.datasets[2].data[i])
                    psum.push(Math.round(sum[i] / this.data.datasets[aryLen].data[i] * 100));
                    pclsd.push(Math.round(sumClsd[i] / this.data.datasets[aryLen].data[i] * 100));
                  }

                  this.data.datasets.forEach(function (dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                      for (var key in dataset._meta) {
                        var model = dataset._meta[key].data[i]._model;
                        //console.log(i,model,dataset.stack);
                        if (model.datasetLabel.includes("หม้อแปลงทั้งหมด")) {
                          ctx.fillText(dataset.data[i] + " เครื่อง", model.x + 10, model.y);
                        } else if (model.datasetLabel.includes("ไม่พบปัญหา") && dataset.stack.includes("Stack 1")) {
                          ctx.fillText(sumClsd[i] + " เครื่อง , " + pclsd[i] + "%", model.x + 10, model.y);
                        } else if (model.datasetLabel.includes("ไม่พบปัญหา") && dataset.stack.includes("Stack 2")) {
                          ctx.fillText(sum[i] + " เครื่อง , " + psum[i] + "%", model.x + 10, model.y);
                        }
                        // else if (model.datasetLabel.includes("ปิด WBS/ใบสั่ง")) {
                        //   ctx.fillText(dataset.data[i] + " เครื่อง , " + pclsd[i] + "%", model.x + 10, model.y);
                        // }
                        // console.log(model);
                      }

                    }
                  });
                } else {
                  var total = []
                  for (var i = 0; i < this.data.datasets[1].data.length; i++) {
                    total.push(Number(this.data.datasets[aryLen - 1].data[i]) + Number(this.data.datasets[aryLen].data[i]));
                  }
                  for (var i = 0; i < this.data.datasets[1].data.length; i++) {
                    sum.push(this.data.datasets[1].data[i] + this.data.datasets[2].data[i] + this.data.datasets[3].data[i])
                    sumClsd.push(this.data.datasets[0].data[i] + this.data.datasets[1].data[i] + this.data.datasets[2].data[i])
                    psum.push(Math.round(sum[i] / total[i] * 100));
                    pclsd.push(Math.round(sumClsd[i] / total[i] * 100));
                  }

                  this.data.datasets.forEach(function (dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                      for (var key in dataset._meta) {
                        var model = dataset._meta[key].data[i]._model;
                        if (model.datasetLabel.includes("แรงดัน 205-210") || model.datasetLabel.includes("%UB 25") || model.datasetLabel.includes("โหลด 80-90")) {
                          ctx.fillText(total[i] + " เครื่อง", model.x + 10, model.y);
                        } else if (model.datasetLabel.includes("ไม่พบปัญหา") && dataset.stack.includes("Stack 1")) {
                          ctx.fillText(sumClsd[i] + " เครื่อง , " + pclsd[i] + "%", model.x + 10, model.y);
                        } else if (model.datasetLabel.includes("ไม่พบปัญหา") && dataset.stack.includes("Stack 2")) {
                          ctx.fillText(sum[i] + " เครื่อง , " + psum[i] + "%", model.x + 10, model.y);
                        }
                        // console.log(model);
                      }

                    }
                  });

                }
              }
            }
          }
        });

      } else {
        alert(data['data']);
      }

    }));

  }
  callData() {
    this.getJobProgressPea2();
    //this.getTrPea();
    //this.getBudgetPea();
    //this.getRemianData();
  }
  public getTrData = () => {
    //console.log(this.peaCode);
    //console.log(this.peaCode.includes(GlobalConstants.regionLetter[GlobalConstants.region].trim()));
    //console.log(GlobalConstants.regionLetter[GlobalConstants.region]);
    this.peaCode = "J00000";
    if (this.peaCode.includes(GlobalConstants.regionLetter[GlobalConstants.region].trim())) {
      this.configService.getTr('TR.php?condition=' + this.condition + '&peaCode0=' + this.peaCode)
        //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
        .subscribe(res => {
          // this.dataSource.paginator = this.paginator1;
          // this.dataSource.sort = this.sort1;
          this.dataSource1.data = res as trdata[];
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.sort1;
        })
    }
  }
  getTRmatch() {
    this.configService.getTrMatch('ldcad/rdMatchTR.php?aoj=' + this.selAoj)
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
      .subscribe(res => {
        this.dataSource2.data = res as trmatch[];
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      })


  }

  getMatReq() {
    this.configService.getMatReq('ldcad/getmatreq.php?nDay=' + this.nDate)
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000)
      .subscribe(res => {
        this.dataSource3.data = res as matreq[];
        this.dataSource3.paginator = this.paginator3;
        this.dataSource3.sort = this.sort3;
      })


  }
  checkTab(){
    if(this.tab==0){
      return true;
    }else{
      return false;
    }
    
  }
  onTabClick(event) {
    this.tab=event.index;
    if(event.index==1){
      this.getJobProgressPea2();
    }else if (event.index == 2) {
      this.getMat("1");
      this.getMatReq();
    } else if (event.index == 3) {
      // this.http.get('http://n2-psim.pea.co.th/psdoc/',{responseType:'text'}).subscribe(res=>{
      //   this.KisshtHtml = this.sanitizer.bypassSecurityTrustHtml(res);
      // })
    }
  }
  getMat(choice) {
    this.choice = choice;
    this.configService.postdata2('ldcad/rdMatSAP.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        // console.log(data);
        var label = ["30 kVA", "50 kVA", "100  kVA", "160  kVA"];
        var trSize = ["30", "50", "100", "160"];
        var TR15 = [0, 0, 0, 0];
        var TR45 = [0, 0, 0, 0];
        var TRStock = [0, 0, 0, 0];
        var TRStock2 = [0, 0, 0, 0];
        var TR45match = [0, 0, 0, 0];
        data['matSAP15'].forEach(element => {
          if (trSize.indexOf(element.kva) > -1) {
            TR15[trSize.indexOf(element.kva)] = Number(element.nMat);
          }
        });
        data['matSAP45'].forEach(element => {
          if (trSize.indexOf(element.kva) > -1) {
            TR45[trSize.indexOf(element.kva)] = Number(element.nMat);
          }
        });

        TR45match[0] = TR45[0];
        TR45match[1] = TR45[1];

        data['matSAP45match'].forEach(element => {
          if (trSize.indexOf(element.kva) > -1) {
            TR45match[trSize.indexOf(element.kva)] = Number(element.nMat);
          }
        });
        data['stock'].forEach(element => {
          if (trSize.indexOf(element.kva) > -1) {
            TRStock[trSize.indexOf(element.kva)] = Number(element.nMat);
          }
        });
        for (var i = 0; i < TRStock.length; i++) {
          TRStock2[i] = (TRStock[i] - TR15[i]) >= 0 ? (TRStock[i] - TR15[i]) : 0;
        }
        // var TRStock = [data["nStock"]["30"], data["nStock"]["50"], data["nStock"]["100"], data["nStock"]["160"]];
        // var TR15 = [data["nTR"]["15"]["30"], data["nTR"]["15"]["50"] - 76, data["nTR"]["15"]["100"] - 27, data["nTR"]["15"]["160"] - 18];
        // var TR45 = [data["nTR"]["45"]["30"], data["nTR"]["45"]["50"], data["nTR"]["45"]["100"], data["nTR"]["45"]["160"]];
        // var TRStock2 = [TRStock[0] - TR15[0], TRStock[1] - TR15[1], TRStock[2] - TR15[2], TRStock[3] - TR15[3]];
        data['req'].forEach(element => {
          if (element.nDay == "15" && choice == "1") {
            label.push(element.matNameShort);
            TR15.push(Number(element.nMat));
            TRStock.push(Number(element.stock));

          }
          if (element.nDay == "45" && choice != "1") {
            label.push(element.matNameShort);
            TR45.push(Number(element.nMat));
            TRStock2.push(Number(element.stock));
          }

        });
        if (choice == "1") {
          this.nDate = "15";
          var chartData = {
            labels: label,
            datasets: [
              {
                label: 'พัสดุที่ต้องการใช้งาน',
                data: TR15,
                backgroundColor: '#F0BC46',
              },
              {
                label: 'พัสดุคงคลัง',
                data: TRStock,
                backgroundColor: '#F08646',
              }
            ]
          };
        } else {
          this.nDate = "45";
          var chartData = {
            labels: label,
            datasets: [
              {
                label: 'พัสดุที่ต้องการใช้งาน',
                data: TR45,
                backgroundColor: '#F0BC46',
              },
              {
                label: 'พัสดุคงคลัง',
                data: TRStock2,
                backgroundColor: '#F08646',
              }
            ]
          };


        }
        if (this.chartMat) this.chartMat.destroy();
        this.chartMat = new Chart('chartMat', {
          type: 'horizontalBar',
          data: chartData,
          options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 2,
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: 'bottom',
              display: true,
              defaultFontSize: 30,
              labels: {
                display: true,
                defaultFontSize: 30,
                fontColor: 'white'
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontSize: 14,
                  fontColor: "white",
                }
              }],
              yAxes: [{
                ticks: {
                  fontSize: 14,
                  fontColor: "white",
                }
              }]
            },
            animation: {
              onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.fillStyle = "white";
                ctx.textAlign = 'left';
                ctx.textBaseline = 'center';
                // console.log(this.data.datasets[1].data[0])
                var mat = [];
                this.data.datasets.forEach(function (dataset,) {

                  for (var i = 0; i < dataset.data.length; i++) {
                    for (var key in dataset._meta) {
                      var model = dataset._meta[key].data[i]._model;

                      if (dataset.label.includes("พัสดุที่ต้องการใช้งาน")) {
                        mat.push(dataset.data[i]);
                        ctx.fillText(dataset.data[i], model.x + 10, model.y);
                        // console.log(mat)
                      } else {
                        if (dataset.data[i] - mat[i] > 0) {
                          ctx.fillText(dataset.data[i], model.x + 10, model.y);
                        } else {
                          ctx.fillText(dataset.data[i] + " ,ขาด " + (mat[i] - dataset.data[i]), model.x + 10, model.y);
                        }
                      }


                    }

                  }
                });

              }
            }
          }

        });
        this.getMatReq();
        if (choice != "1") {
          var chartData = {
            labels: label,
            datasets: [
              {
                label: 'พัสดุที่ต้องการใช้งาน',
                data: TR45match,
                backgroundColor: '#F0BC46',
              },
              {
                label: 'พัสดุคงคลัง',
                data: TRStock2,
                backgroundColor: '#F08646',
              }
            ]
          };
          if (this.chartTR) this.chartTR.destroy();
          this.chartTR = new Chart('chartTR', {
            type: 'horizontalBar',
            data: chartData,
            options: {
              indexAxis: 'y',
              // Elements options apply to all of the options unless overridden in a dataset
              // In this case, we are setting the border of each horizontal bar to be 2px wide
              elements: {
                bar: {
                  borderWidth: 2,
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                position: 'bottom',
                display: true,
                defaultFontSize: 30,
                labels: {
                  display: true,
                  defaultFontSize: 30,
                  fontColor: 'white'
                }
              },
              scales: {
                xAxes: [{
                  ticks: {
                    fontSize: 14,
                    fontColor: "white",
                  }
                }],
                yAxes: [{
                  ticks: {
                    fontSize: 14,
                    fontColor: "white",
                  }
                }]
              },
              animation: {
                onComplete: function () {
                  var ctx = this.chart.ctx;
                  ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                  ctx.fillStyle = "white";
                  ctx.textAlign = 'left';
                  ctx.textBaseline = 'center';
                  // console.log(this.data.datasets[1].data[0])
                  var mat = [];
                  this.data.datasets.forEach(function (dataset,) {

                    for (var i = 0; i < dataset.data.length; i++) {
                      for (var key in dataset._meta) {
                        var model = dataset._meta[key].data[i]._model;

                        if (dataset.label.includes("พัสดุที่ต้องการใช้งาน")) {
                          mat.push(dataset.data[i]);
                          ctx.fillText(dataset.data[i], model.x + 10, model.y);
                          // console.log(mat)
                        } else {
                          if (dataset.data[i] - mat[i] > 0) {
                            ctx.fillText(dataset.data[i], model.x + 10, model.y);
                          } else {
                            ctx.fillText(dataset.data[i] + " ,ขาด " + (mat[i] - dataset.data[i]), model.x + 10, model.y);
                          }
                        }


                      }

                    }
                  });

                }
              }
            }

          });
        } else {
          this.getLoad100();
        }

      } else {
        alert(data['data']);
      }

    }));

  }
  // public getMtData = (PEA_TR) => {

  //   this.configService.getMeter('Meter.php?PEA_TR=' + PEA_TR)
  //     //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
  //     .subscribe(res => {
  //       this.dataSource1.data = res as meterdata[];
  //     })
  // }
  applyFilter(filterValue: string) {
    // console.log((filterValue + " " + localStorage.getItem('peaEng')).trim().toLowerCase());
    this.dataSource1.filter = (filterValue).trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {

    this.dataSource2.filter = (filterValue).trim().toLowerCase();
  }
  applyWBS(event) {
    if(window.confirm('คุณต้องการแก้ไขข้อมูล WBS/หมายเลขใบสั่ง ใช่หรือไม่?')){
    this.configService.postdata2('wriWBS.php', { TRNumber: event[1].PEA_TR, WBS: event[0] }).subscribe((data => {
      if (data['status'] == 1) {
        this.getTrData();
        //  this.getStatus();
        this.getJobProgressPea2();
        //console.log(this.peaname);
    } else {
        alert(data['data']);
      }
    }));
  }else{
    this.getTrData();
    this.getJobProgressPea2();
  }
  }
  // applyNote(event) {
  //   this.configService.postdata2('wriNote.php', { TRNumber: event[1].PEA_TR, note: event[0] }).subscribe((data => {
  //     if (data['status'] == 1) {
  //       this.getTrData();
  //       //  this.getStatus();
  //       this.getJobProgressPea2();
  //       //console.log(this.peaname);
  //     } else {
  //       alert(data['data']);
  //     }

  //   }))
  // }
  applyRLoad(event) {
    // console.log(event);
    this.configService.postdata2('wriRLoad.php', { TRNumber: event[1].PEA_TR, RLoad: event[0] }).subscribe((data => {
      if (data['status'] == 1) {
        this.getTrData();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
  }

  applyRVoltage(event) {
    // console.log(event);
    this.configService.postdata2('wriRVoltage.php', { TRNumber: event[1].PEA_TR, RVoltage: event[0] }).subscribe((data => {
      if (data['status'] == 1) {
        // console.log(data['data']);
        this.getTrData();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
  }

  selectStatus(event) {
    console.log(event);
    this.configService.postdata2('wristatus.php', { TRNumber: event.value[1].PEA_TR, status: event.value[0] }).subscribe((data => {
      if (data['status'] == 1) {
        // console.log(data['data']);
        this.getTrData();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
  }

  selectCondition(event) {
    this.condition = event.value[0];
    this.getTrData();

  }


  onSubmit() {
    var input = this.registerForm.value;
    input["user"] = localStorage.getItem('name');
    // input["peaCode"] = "B06101";
    // input["peaCode"] = "B01101";
    input["peaCode"] = localStorage.getItem('peaCode');
    input["nDay"] = this.nDate;
    this.getMat(this.choice);
    // console.log(this.registerForm.value);
    this.configService.postdata2('ldcad/wriMat.php', this.registerForm.value).subscribe((data => {
      if (data['status'] == 1) {
        //this.getTrData();
        this.getMatReq();
        this.registerForm.resetForm();
      } else {
        alert(data['data']);
      }
    }));
  }
  reTr(wbsdata) {

    this.configService.postdata2('ldcad/reTR.php', wbsdata).subscribe((data => {
      if (data['status'] == 1) {
        // this.getData();
        this.getTrData();
        alert("แก้ไขข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }

  exportAsXLSX(): void {
    this.configService.exportAsExcelFile(this.dataSource1.data, 'TRdata');
  }
  exportAsXLSX3(): void {
    this.configService.exportAsExcelFile(this.dataSource3.data, 'Matdata');
  }
  exportAsXLSX2(): void {
    this.configService.exportAsExcelFile(this.dataSource2.data, 'MatchTR');
  }

  // exportAsXLSX2(): void {
  //   this.configService.exportAsExcelFile(this.dataSource1.data, 'MeterData');
  // }
  /*
  getTrData(){ 
    this.configService.postdata2('TR.php',{TRNumber:this.TRNo}).subscribe((data=>{
      if(data['status']==1){
         console.log(data.data);
        
        //console.log(this.peaname);
      }else{
        alert(data.data);
      }
  
    }))
    
  } 
*/
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  RVoltage: number;
  RLoad: number;
  trtab: string;
  vin: number;
  realIa: number;
  realIb: number;
  realIc: number;
  realUb: number;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      console.log(data);
      this.RVoltage = data.trdata.RVoltage;
      this.RLoad = data.trdata.RLoad;
      this.trtab = data.trdata.trtab;
      this.realIa = data.trdata.realIa;
      this.realIb = data.trdata.realIb;
      this.realIc = data.trdata.realIc;
      this.realUb = data.trdata.realUb;
      this.vin = data.trdata.vin;
    }


  }


  onConfirmClick(): void {
    var wbs = {};

    // this.wbs["newVin"]=this.newVin;
    wbs["PEA_TR"] = this.data.trdata.PEA_TR;
    wbs["aoj"] = this.data.trdata.Aoj;
    wbs["RVoltage"] = this.RVoltage;
    wbs["RLoad"] = this.RLoad;
    wbs["trtab"] = this.trtab;
    wbs["realIa"] = this.realIa;
    wbs["realIb"] = this.realIb;
    wbs["realIc"] = this.realIc;
    wbs["realUb"] = this.realUb;
    wbs["vin"] = this.vin;
    this.dialogRef.close(wbs);
  }

}