import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import {
  Router, Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { trdata, meterdata, meterdata2, matreq, trmatch, vcare } from '../model/user.model';
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
import { GetCookie} from '../common/cookies';
// import { ConsoleReporter } from 'jasmine';
// import { Console } from 'console';




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
  selector: 'app-opsa',
  templateUrl: './opsa67.component.html',
  styleUrls: ['./opsa67.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class OPSA67Component implements OnInit, AfterViewInit {
  public showOverlay = true;
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
  option = "7";
  vcaredate=""
  displayedColumns1 = ['PEANAME', 'PEA_TR', 'kva', 'FEEDERID', 'Location', 'PLoadTOT','PLoadTOTnow', 'minV', 'minVnow', 'Ub','Ubnow', 'wbs', 'jobStatus', 'Status', 'loadResult', 'loadMea', 'plancat'];

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
  problemPEA1 = [];
  problemPEA2 = [];
  problemPEA3 = [];
  displayedColumns3 = ['matCode', 'matName', 'nMat', 'peaName'];
  displayedColumns4 = ['pea', 'PEANO_TR', 'PEANO_METER', 'Location', 'pload', 'voltage', 'wbs', 'JOB_STATUS', 'NOTE', 'jobprogress'];
  // public dataSource = new MatTableDataSource<trdata>();
  // public dataSource = new MatTableDataSource<trdata>();
  public dataSource1 = new MatTableDataSource<trdata>();
  public dataSource2 = new MatTableDataSource<trmatch>();
  public dataSource3 = new MatTableDataSource<matreq>();
  public dataSource4 = new MatTableDataSource();
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

  @ViewChild('paginator4', { static: true }) paginator4: MatPaginator;
  @ViewChild('sort4', { static: true }) sort4: MatSort;

  @ViewChild('chartPEA', { static: true }) chartPEA: ChartComponent;
  @ViewChild('chartPEA2', { static: true }) chartPEA2: ChartComponent;
  tab = 0;
  condition = 0;
  peaCode = "";
  nDate = "15";
  choice = '1';
  showTR = false;
  chartResult: Chart;
  chartVcare: Chart;
  chartMat: Chart;
  chartTR: Chart;
  chartReqMat: Chart;
  updateDate: string;
  regionOption = 1;
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
  currentReggion = GlobalConstants.region;
  regionThai = GlobalConstants.regionThai[GlobalConstants.region];
  selAoj = 'xx';
  currentMatherPea = "";
  currentPea = "";
  TrGIS = 0;
  TrGIS2 = 0;
  TrNo = 0;
  TrTotal = 0;
  TrPlnTal = 0;
  TrClsd = 0;
  TrTotalClsd = 0;
  TrTotalProblem = 0;
  TrTotalPln = 0;
  TrTotalDone = 0;
  TrTotalHavePln = 0;
  TrWBS = 0;
  groupselect = 0;
  groupP1Select = '';
  Statuss = [
    { value: 'จัดทำแผนงานแล้ว' },
    { value: 'อยู่ระหว่างตรวจสอบ' },
    { value: 'ใช้หม้อแปลงในการปรับปรุง' },
    { value: 'ไม่ใช้หม้อแปลงในการปรับปรุง' },
    { value: 'อยู่ระหว่างสำรวจประมาณการ' },
    { value: 'อนุมัติงานแล้ว' },
    { value: 'อยู่ระหว่างก่อสร้าง' },
    { value: 'ขาดแคลนพัสดุ' },
    { value: 'ก่อสร้างแล้วเสร็จ' },
    { value: 'อยู่ระหว่างแก้ไขข้อมูล GIS' },
    { value: 'แก้ไขข้อมูล GIS แล้ว' },
    { value: 'ไม่พบปัญหา' },
    { value: 'อื่นๆ โปรดระบุ' },
    { value: 'แก้ไขปัญหาแล้ว' },
  ];
  groupName = [
    { value: '', viewvalue: 'ทั้งหมด' },
    { value: '1', viewvalue: 'กลุ่มที่ 1' },
    { value: '2', viewvalue: 'กลุ่มที่ 2' },
    { value: '3', viewvalue: 'กลุ่มที่ 3' },
  ];
  dataDashboard = {};

  bat = '3';
  batName = 'N และ R';
  regionData = {};
  Conditions = [

    { value: 13, viewvalue: 'V <200 or Load>100' },

    // { value: 2, viewvalue: 'แรงดัน<200 Volt' },
    // { value: 7, viewvalue: 'แรงดัน 200-210 Volt' },
    // { value: 1, viewvalue: 'โหลด>100%' },
    { value: 9, viewvalue: 'โหลด 80-100%' },
    // { value: 8, viewvalue: 'โหลด 80-90%' },
    { value: 11, viewvalue: '%UB>50% (%Load 50-80)' },
    { value: 4, viewvalue: 'โหลด<30%' },
    { value: 12, viewvalue: 'V <200 or Load>80 or %UB>50%' },
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

  batSelect = [
    { value: 1, viewvalue: 'N' },
    { value: 2, viewvalue: 'R' },
    { value: 3, viewvalue: 'N+R' },

  ];
  checked = false;

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private router: Router, private configService: ConfigService, public authService: AuthService, private http: HttpClient, private uploadService: FileuploadService) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
    this.getpeaList();
    this.getpeaList2();
    this.getDataRegion();
    // this.getDataRegionByProblem2();
  }
  ngAfterViewInit(): void {
    this.dashboradPEA2();
  }
  // AfterViewInit(){
  //   this.getJobProgressPea2();
  // }

  ngOnInit() {
    this.getDataRegionByProblem();
    // this.getDataRegionByProblem2();
    this.getinfo();
    this.getJobProgressPea2();

    this.peaCode = GetCookie('peaCode');
    // this.peaCode='C06101';
    this.selPeapeaCode = this.peaCode.substr(0, 4);
  }
  chkPSIM(data) {
    if (data.wbs.length == 0) {
      return '';
    }

    if (data.wbs.substring(0, 1) != '4') {
      if ((data.wbs.substring(0, 1) == '2' || data.wbs.substring(0, 1) == '1') && (data.JOB_STATUS == 'TECO' || data.JOB_STATUS == 'CLSD')) {
        return "ปิดงาน";
      }
      else if (data.JOB_STATUS.search("D1") > -1 || data.JOB_STATUS.search("TECO") > -1 || data.JOB_STATUS.search("CLSD") > -1) {
        return "ปิดงาน"
      }
    }
  }

  navigationInterceptor(event: RouterEvent): void {
    // console.log("showoverlay");
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    // if (event instanceof NavigationEnd) {
    //   this.showOverlay = false;
    // }

    // // Set loading state to false in both of the below events to hide the spinner in case a request fails
    // if (event instanceof NavigationCancel) {
    //   this.showOverlay = false;
    // }
    // if (event instanceof NavigationError) {
    //   this.showOverlay = false;
    // }
  }
  onGroupChange(val) {
    if (val == '1') {
      this.groupselect = 0;
    } else if (val == '2') {
      this.groupselect = 1;
    } else if (val == '3') {
      this.groupselect = 2;
    } else if (val == '4') {
      this.groupselect = 3;
    }
    this.dashboradPEA();
  }
  selectBAT(event) {
    if (event.value[0] == 1) {
      this.batName = 'N';
    } else if (event.value[0] == 2) {
      this.batName = 'R';
    } if (event.value[0] == 3) {
      this.batName = 'N และ R';
    }
    this.bat = event.value[0];

    this.getMat(this.choice);
  }
  selectRegion(event) {
    this.regionOption = event.value[0];

    this.dashboradPEA();

  }
  getTRload(trdata) {
    this.configService.postdata2('opsa67/gettrload.php', { PEA_TR: trdata.PEA_TR }).subscribe((data => {
      if (data['status'] == 1) {
        var data = data['data'];
        this.openDialog(data);
        //--------------------------------
        //this.roicdate="31 พ.ค. 2563";
      } else {
        alert(data['data']);
      }

    }));

  }
  openDialog(trdata): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
      width: '800px',
      data: { trdata }
    });

    dialogRef.afterClosed().subscribe(wbsdata => {
      if (wbsdata) {
        // console.log(wbsdata);
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
    this.configService.postdata2('opsa67/rdInfo.php', { data: 'roicdate' }).subscribe((data => {
      if (data['status'] == 1) {
        this.updateDate = data['data'][0].info;
        //--------------------------------
        //this.roicdate="31 พ.ค. 2563";
      } else {
        alert(data['data']);
      }

    }));

  }
  getvcaredate() {
    this.configService.postdata2('opsa67/rdvcaredate.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.vcaredate = data['data'][0].updatedate;
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
    this.configService.postdata2('opsa67/wriDate.php', { TRNumber: trdata, rundate: date }).subscribe((data => {
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
    this.configService.postdata2('opsa67/wriNote.php', { TRNumber: trdata, note: value }).subscribe((data => {
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
    return 0;
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
    } else if (this.peaCode.includes("Z00000")) {
      return false;
    } else if (this.peaCode.substr(1, 3).includes("000")) {
      return true;
    } else if (Aoj.substring(2, 7) == this.peaCode.substring(1, 6)) {
      return true;
    } else {
      return false;
    }

  }
  getpeaList() {
    this.configService.postdata2('opsa67/rdpeaall2.php', {}).subscribe((data => {


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
    this.configService.postdata2('opsa67/rdpeaall.php', {}).subscribe((data => {
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
    this.configService.postdata2('opsa67/rdLoad100.php', { nDay: this.nDate }).subscribe((data => {
      if (data['status'] == 1) {
        // console.log(data['data']);
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
  selectGroup(event) {
    // console.log(event);
    this.groupP1Select = event.value[0];
    this.getJobProgressPea2();
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
    this.configService.postdata2('opsa67/rdTRAll.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        this.trAllReg = data;
        //console.log('trall',data);
      } else {
        alert(data['data']);
      }

    }));
    this.regionData = [];
    regions.forEach(region => {
      this.configService.postdata('opsa67/rdProblemAll4.php', { region: region }).subscribe((data => {
        if (data['status'] == 1) {
          this.regionData[region] = data["data"][0];
          this.dataDashboard[region] = (Number(data["data"][0].nTR) - Number(data["data"][0].nCLSD) - Number(data["data"][0].nGIS) - Number(data["data"][0].nNo));
          dataCnt++;
          if (dataCnt == 12) {
            // console.log(this.dataDashboard, 'this.dataDashboard');
            this.getJobProgressPea();
          }

        } else {
          alert(data['data']);
        }

      }));
    });

  }
  getDataRegionByProblem2() {
    var dataCnt = 0;
    this.problemPEA1 = [];
    this.problemPEA2 = [];
    this.problemPEA3 = [];
    var regions = Object.keys(GlobalConstants.regionLetter);
    regions.forEach(region => {
      this.configService.postdata('opsa67/rdLoadRegion2.php', { region: region }).subscribe((data => {
        if (data['status'] == 1) {
          this.problemPEA1[region] = data["data1"][0];
          this.problemPEA2[region] = data["data2"][0];
          this.problemPEA3[region] = data["data3"][0];
          dataCnt++;
          if (dataCnt == 12) {
            // this.dashboradPEA2();
          }

        } else {
          alert(data['data']);
        }

      }));
    });

  }
  dashboradPEA2() {
    // console.log("dashboradPEA2");
    var regions = Object.keys(GlobalConstants.regionLetter);
    var regionsLabel = [];
    var jobPln = []
    var jobDone = [];

    var data = [];
    var inprogressList = [];
    var jobDoneList = [];
    var jobRemainList = [];

    var inprogress = [];

    var jobRemain = [];
    jobDone[0] = 0;
    inprogress[0] = 0;
    jobRemain[0] = 0;
    jobDone[1] = 0;
    inprogress[1] = 0;
    jobRemain[1] = 0;
    jobDone[2] = 0;
    inprogress[2] = 0;
    jobRemain[2] = 0;
    this.TrTotalProblem = 0;
    this.TrTotalPln = 0;
    this.TrTotalDone = 0;
    var totalTR = 0;
    // for (var i = 0; i < regions.length; i++) {

    //   data = this.problemPEA1[regions[i]];
    //   console.log(data);
    //   jobDone[0] = jobDone[0] + Number(data['nNo']) + Number(data['nGIS']) + Number(data['nCLSD']);
    //   inprogress[0] = inprogress[0] + Number(data['nWBS']) - Number(data['nCLSD']) + Number(data['nSerway']) + Number(data['nEst']);
    //   // jobRemain[0] = jobRemain[0] + Number(data['nTR']) - Number(data['nNo']) - Number(data['nGIS']) - Number(data['nWBS'])-Number(data['nSerway']) - Number(data['nEst']);
    //   totalTR = totalTR + Number(data['nTR']);
    // }
    for (var i = 0; i < 3; i++) {
      jobDone[i] = Math.round(this.problemPEA[i]['nCLSD'] / this.problemPEA[i]['nTR'] * 100);
      jobPln[i] = Math.round(this.problemPEA[i]['nPlan'] / this.problemPEA[i]['nTR'] * 100);
      this.TrTotalDone = this.TrTotalDone + this.problemPEA[i]['nCLSD'];
      this.TrTotalPln = this.TrTotalPln + this.problemPEA[i]['nPlan'];
      this.TrTotalProblem = this.TrTotalProblem + this.problemPEA[i]['nTR'];
    }

    regionsLabel = ['วัดโหลด/จัดทำแผน', 'ปรับปรุงแล้วในปี 66', 'ผลการรันผิดปกติ'];

    var chartData = {};
    chartData = {
      labels: regionsLabel,
      // segmentShowStroke: false,
      datasets: [
        {
          label: 'จัดทำแผนงานแล้ว',
          data: jobPln,
          backgroundColor: '#B05CBA',
        },
        {
          label: 'ปรับปรุงแล้วเสร็จ',
          data: jobDone,
          backgroundColor: '#D9D9D9',
        }
      ]
    };


    if (this.chartPEA2) this.chartPEA2.destroy();
    this.chartPEA2 = new Chart('chartPEA2', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          position: 'nearest',
          mode: 'single',
          // callbacks: {
          //   label: function (tooltipItem, data, jobDoneArg = jobDoneList, inprogressArg = inprogressList, jobRemainArg = jobRemainList) {
          //     if (tooltipItem.datasetIndex == 0) {
          //       return jobDoneArg[tooltipItem.index] + ' เครื่อง, ' + tooltipItem.value + '%'
          //     } else if (tooltipItem.datasetIndex == 1) {
          //       return inprogressArg[tooltipItem.index] + ' เครื่อง, ' + tooltipItem.value + '%'
          //     } else if (tooltipItem.datasetIndex == 2) {
          //       return jobRemainArg[tooltipItem.index] + ' เครื่อง, ' + tooltipItem.value + '%'
          //     }
          //   }
          // },
        },
        legend: {
          position: 'right',
          labels: {
            display: true,
            fontSize: 16,
            fontColor: 'white'
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 16,
              fontColor: "white",
            }
          }],
          yAxes: [{
            gridLines: { color: "white", },
            ticks: {
              beginAtZero: true,
              fontSize: 16,
              fontColor: "white",
              callback: function (value, index, values) {
                return value + '%';
              }
            },
          }]
        },
      }
    });




  }
  getDataRegionByProblem() {
    var dataCnt = 0;
    this.problemPEA = [
      {
        plancat: "1.วัดโหลดจัดทำแผน",
        nTR: 0,
        nPlan: 0,
        nCLSD: 0
      },
      {
        plancat: "2.ชี้เป้าซ้ำ",
        nTR: 0,
        nPlan: 0,
        nCLSD: 0
      },
      {
        plancat: "3.ผลรันผิดปกติ",
        nTR: 0,
        nPlan: 0,
        nCLSD: 0
      }
    ];
    this.problemPEA1 = [];
    this.problemPEA2 = [];
    this.problemPEA3 = [];
    var regions = Object.keys(GlobalConstants.regionLetter);
    regions.forEach(region => {
      this.configService.postdata('opsa67/rdLoadRegion4.php', { region: region }).subscribe((data => {
        if (data['status'] == 1) {
          // this.problemPEA1[region]=data["data"];
          this.problemPEA1[region] = [];
          data["data"].forEach(element => {
            // this.problemPEA1[region].push(element);
            if (element['plancat'] == '1.วัดโหลดจัดทำแผน') {
              this.problemPEA1[region][0] = element;
              this.problemPEA[0]['nTR'] = this.problemPEA[0]['nTR'] + Number(element['nTR']);
              this.problemPEA[0]['nPlan'] = this.problemPEA[0]['nPlan'] + Number(element['nPlan']);
              this.problemPEA[0]['nCLSD'] = this.problemPEA[0]['nCLSD'] + Number(element['nCLSD']);
            } else if (element['plancat'] == '2.ชี้เป้าซ้ำ') {
              this.problemPEA1[region][1] = element;
              this.problemPEA[1]['nTR'] = this.problemPEA[1]['nTR'] + Number(element['nTR']);
              this.problemPEA[1]['nPlan'] = this.problemPEA[1]['nPlan'] + Number(element['nPlan']);
              this.problemPEA[1]['nCLSD'] = this.problemPEA[1]['nCLSD'] + Number(element['nCLSD']);
            } else if (element['plancat'] == '3.ผลรันผิดปกติ') {
              this.problemPEA1[region][2] = element;
              this.problemPEA[2]['nTR'] = this.problemPEA[2]['nTR'] + Number(element['nTR']);
              this.problemPEA[2]['nPlan'] = this.problemPEA[2]['nPlan'] + Number(element['nPlan']);
              this.problemPEA[2]['nCLSD'] = this.problemPEA[2]['nCLSD'] + Number(element['nCLSD']);
            }
          });

          dataCnt++;
          if (dataCnt == 12) {

            // console.log(this.problemPEA);
            console.log(this.problemPEA1);

            // this.problemPEA = this.problemPEA1;
          }

        } else {
          alert(data['data']);
        }

      }));
    });
    // regions.forEach(region => {
    //   this.configService.postdata('opsa/rdLoadRegion.php', { region: region, option: "2" }).subscribe((data => {
    //     if (data['status'] == 1) {
    //       this.problemPEA2[region] = data["data"][0];

    //     } else {
    //       alert(data['data']);
    //     }

    //   }));
    // }); regions.forEach(region => {
    //   this.configService.postdata('opsa/rdLoadRegion.php', { region: region, option: "3" }).subscribe((data => {
    //     if (data['status'] == 1) {
    //       this.problemPEA3[region] = data["data"][0];

    //     } else {
    //       alert(data['data']);
    //     }

    //   }));
    // });

  }
  dashboradPEA() {

    var regions = Object.keys(GlobalConstants.regionLetter);
    var regionsLabel = [];
    var inprogress = [];
    var jobDone = [];
    var inprogressList = [];
    var jobDoneList = [];

    if (this.regionOption == 1) {
      regions = regions.slice(0, 3);
    } else if (this.regionOption == 2) {
      regions = regions.slice(3, 6);
    } else if (this.regionOption == 3) {
      regions = regions.slice(6, 9);
    } else if (this.regionOption == 4) {
      regions = regions.slice(9, 12);
    }
    if (this.regionOption == 6) {
      if (this.groupselect < 3) {
        jobDone[0] = this.problemPEA[this.groupselect]['nCLSD'];
        inprogress[0] = this.problemPEA[this.groupselect]['nPlan'];

        var totalTR = this.problemPEA[this.groupselect]['nTR'];
      }
      // for (var i = 0; i < regions.length; i++) {


      //   // jobDone[i]=Math.round(this.problemPEA[i]['nCLSD']/this.problemPEA[i]['nTR']*100);
      //   // jobPln[i]=Math.round(this.problemPEA[i]['nPlan']/this.problemPEA[i]['nTR']*100);
      //   // this.TrTotalDone = this.TrTotalDone + this.problemPEA[i]['nCLSD'];
      //   // this.TrTotalPln = this.TrTotalPln + this.problemPEA[i]['nPlan'];
      //   // this.TrTotalProblem = this.TrTotalProblem + this.problemPEA[i]['nTR'];


      //   data = this.problemPEA[regions[i]];
      //   jobDone[0] = jobDone[0] + Number(data['nNo']) + Number(data['nGIS']) + Number(data['nCLSD']);
      //   inprogress[0] = inprogress[0] + Number(data['nWBS']) - Number(data['nCLSD']) + Number(data['nSerway']) + Number(data['nEst']);
      //   // jobRemain[0] = jobRemain[0] + Number(data['nTR']) - Number(data['nNo']) - Number(data['nGIS']) - Number(data['nWBS'])-Number(data['nSerway']) - Number(data['nEst']);
      //   totalTR = totalTR + Number(data['nTR']);
      // }
      regionsLabel.push('กฟภ.');
      jobDoneList[0] = jobDone[0];
      jobDone[0] = (jobDone[0] / totalTR * 100).toFixed(2);
      inprogressList[0] = inprogress[0];
      inprogress[0] = (inprogress[0] / totalTR * 100).toFixed(2);
      // jobRemainList[0] = totalTR - jobDoneList[0] - inprogressList[0];
      // jobRemain[0] = (jobRemainList[0] / totalTR * 100).toFixed(2);

    } else {
      for (var i = 0; i < regions.length; i++) {
        regionsLabel.push(regions[i].toUpperCase());

        jobDone.push((this.problemPEA1[regions[i]][this.groupselect]['nCLSD'] / this.problemPEA1[regions[i]][this.groupselect]['nTR'] * 100).toFixed(2));
        jobDoneList.push(this.problemPEA1[regions[i]][this.groupselect]['nCLSD']);
        inprogress.push((this.problemPEA1[regions[i]][this.groupselect]['nPlan'] / this.problemPEA1[regions[i]][this.groupselect]['nTR'] * 100).toFixed(2));
        inprogressList.push(this.problemPEA1[regions[i]][this.groupselect]['nPlan']);
        // console.log(jobDone,inprogress);
        // jobRemain.push(100 - Math.round((Number(data['nNo']) + Number(data['nGIS']) + Number(data['nCLSD'])) / Number(data['nTR']) * 100) - Math.round((Number(data['nWBS']) - Number(data['nCLSD'])) / Number(data['nTR']) * 100)-Math.round((Number(data['nSerway']) + Number(data['nEst'])) / Number(data['nTR']) * 100));
        // jobRemain.push((100 - jobDone[i] - inprogress[i]).toFixed(2));
        // jobRemainList.push(data['nTR'] - jobDoneList[i] - inprogressList[i]);
      }

    }

    // console.log('plotdata',regionsLabel, jobDone, inprogress, jobRemain);
    // jobDone[1]=35.52;
    // inprogress[1]=21.87;
    // jobRemain[1]=42.61;
    var chartData = {};
    chartData = {
      labels: regionsLabel,
      // segmentShowStroke: false,
      datasets: [
        {
          label: 'จัดทำแผนงานแล้ว',
          data: inprogress,
          backgroundColor: '#B05CBA',
        },
        {
          label: 'ปรับปรุงแล้วเสร็จ',
          data: jobDone,
          backgroundColor: '#D9D9D9',
        },
      ]
    };


    if (this.chartPEA) this.chartPEA.destroy();
    this.chartPEA = new Chart('chartPEA', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          position: 'nearest',
          mode: 'single',
          callbacks: {
            label: function (tooltipItem, data, jobDoneArg = jobDoneList, inprogressArg = inprogressList) {
              if (tooltipItem.datasetIndex == 1) {
                return jobDoneArg[tooltipItem.index] + ' เครื่อง, ' + tooltipItem.value + '%'
              } else if (tooltipItem.datasetIndex == 0) {
                return inprogressArg[tooltipItem.index] + ' เครื่อง, ' + tooltipItem.value + '%'
              }
            }
          },
        },
        legend: {
          position: 'right',
          labels: {
            display: true,
            fontSize: 16,
            fontColor: 'white'
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 16,
              fontColor: "white",
            }
          }],
          yAxes: [{
            gridLines: { color: "white", },
            ticks: {
              beginAtZero: true,
              fontSize: 16,
              fontColor: "white",
              callback: function (value, index, values) {
                return value + '%';
              }
            },
          }]
        },
      }
    });




  }
  getJobProgressPea() {
    var region = 'n1';
    this.chartn1 = {
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#842D73",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#842D73",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#842D73",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#EE316B",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#EE316B",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#EE316B",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#FFA109",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#FFA109",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#FFA109",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#7030A0",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#7030A0",
              fontSize: '16px',
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
      series: [Math.round((Number(this.regionData[region].nTR) - Number(this.regionData[region].nCLSD) - Number(this.regionData[region].nGIS) - Number(this.regionData[region].nNo)) / Number(this.trAllReg[region]) * 100)],
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
              label: Math.round(this.dataDashboard[region] / 1000) + 'k/' + Math.round(Number(this.trAllReg[region]) / 1000) + 'k',
              color: "#7030A0",
              fontSize: '16px',
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
  getVcareChart() {
    var labels = ['พล.', 'สท.'];
    // var nVcare = [10, 20];
    var nOpsa = [];
    var nClose = [];
    var peaInd = [];
    var pea = [];
    var nVcare = [];
    this.configService.postdata2('opsa67/rdVcare.php', { peaCode: this.selPeapeaCode }).subscribe((data => {
      if (data['status'] == 1) {
        // get data
        console.log(this.peaname,)
        data['total'].forEach(element => {
          console.log(GlobalConstants.regionLetter[GlobalConstants.region] + element.Pea)
          pea.push(this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + element.Pea]);
          peaInd.push(element.Pea);
          nVcare.push(element.nTR);
          nOpsa.push(0);
          nClose.push(0);
        });

        data['data'].forEach(element => {
          // console.log('inddex=',peaInd.findIndex((pea)=>pea=element.Pea));
          nOpsa[peaInd.findIndex((pea) => pea = element.Pea)] = element.nTR;
          nClose[peaInd.findIndex((pea) => pea = element.Pea)] = element.nCLSD;
        });
        // console.log(pea,peaInd);
        // console.log(this.peaname);

        var dataset = {
          labels: pea,
          datasets: [
            {
              label: 'VCARE',
              data: nVcare,
              backgroundColor: '#06d6a0',
              stack: 'Stack 0',
            },
            {
              label: 'OPSA',
              data: nOpsa,
              backgroundColor: '#118ab2',
              stack: 'Stack 1',
            },
            {
              label: 'ปิดงาน',
              data: nClose,
              backgroundColor: '#cc8400',
              stack: 'Stack 2',
            },
          ]
        };

        if (this.chartVcare) this.chartVcare.destroy();
        this.chartVcare = new Chart('chartVcare', {
          type: 'bar',
          data: dataset,
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
              },
            },
            color: '#fff',
            responsive: true,
            interaction: {
              intersect: false,
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
            }
            // scales: {
            //   x: {
            //     stacked: true,
            //   },
            //   y: {
            //     stacked: true
            //   }
            // }
          }
        });
      } else {
        alert(data['data']);
      }

    }));
  }
  getJobProgressPea2() {

    this.configService.postdata2('opsa67/rdLoad5.php', { peaCode: this.selPeapeaCode, option: this.option, group: this.groupP1Select }).subscribe((data => {
      if (data['status'] == 1) {

        var Pea = [];
        var kva = [];
        var GIS = [];
        var GIS2 = [];
        var CLSD = [];
        var No = [];
        var Volt = [];
        this.TrTotal = 0;
        var kvaPln = [];
        var havePln = [];
        this.TrPlnTal = 0;
        var VoltObj = [];
        this.TrTotalClsd = 0;
        var kvaByPeaObj = [];
        var firstLoop = true;
        var lastPea = '';
        var total = 0;
        this.TrGIS = 0;
        this.TrGIS2 = 0;
        this.TrNo = 0;
        this.TrClsd = 0;
        this.TrTotalHavePln = 0;

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
        var totalGIS2 = 0;
        var totalNO = 0;
        var totalCLSD = 0;
        var peaInd = [];
        var totalHavePln = 0;
        // var kvaPln=[];
        kvaByPeaObj['plan'] = [];
        kvaByPeaObj['wbs'] = [];
        kvaByPeaObj['gis'] = [];
        kvaByPeaObj['gis2'] = [];
        kvaByPeaObj['no'] = [];
        kvaByPeaObj['clsd'] = [];
        kvaByPeaObj['havePlan'] = [];
        for (var i = 0; i < data['data'].length; i++) {
          if (kvaByPeaObj['plan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]]) {
            kvaByPeaObj['plan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nTR)]);
            kvaByPeaObj['wbs'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nWBS)]);
            kvaByPeaObj['gis'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nGIS)]);
            kvaByPeaObj['gis2'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nGIS2)]);
            kvaByPeaObj['no'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nNo)]);
            kvaByPeaObj['clsd'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nCLSD)]);
            kvaByPeaObj['havePlan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nPln) - Number(data['data'][i].nNo) - Number(data['data'][i].nWBS) - Number(data['data'][i].nGIS2)]);
          } else {
            kvaByPeaObj['plan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['plan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nTR)]);
            kvaByPeaObj['wbs'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['wbs'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nWBS)]);
            kvaByPeaObj['gis'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['gis'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nGIS)]);
            kvaByPeaObj['gis2'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['gis2'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nGIS2)]);
            kvaByPeaObj['no'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['no'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nNo)]);
            kvaByPeaObj['clsd'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['clsd'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nCLSD)]);
            kvaByPeaObj['havePlan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]] = [];
            kvaByPeaObj['havePlan'][this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]].push([data['data'][i].kva, Number(data['data'][i].nPln) - Number(data['data'][i].nNo) - Number(data['data'][i].nWBS) - Number(data['data'][i].nGIS2)]);

          }

          // console.log(data['data'][i],data['data'][i].Pea!=lastPea && !firstLoop);
          // console.log(kvaByPeaObj['havePlan']);
          if (data['data'][i].Pea != lastPea && !firstLoop) {
            Pea.push(this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i - 1].Pea]);
            peaInd.push(data['data'][i - 1].Pea);
            kvaPln.push(totalTR);
            kva.push(totalWBS);
            GIS.push(totalGIS);
            GIS2.push(totalGIS2);
            No.push(totalNO);
            CLSD.push(totalCLSD);
            havePln.push(totalHavePln);
            totalTR = Number(data['data'][i].nTR);
            totalWBS = Number(data['data'][i].nWBS);
            totalGIS = Number(data['data'][i].nGIS);
            totalGIS2 = Number(data['data'][i].nGIS2);
            totalNO = Number(data['data'][i].nNo);
            totalCLSD = Number(data['data'][i].nCLSD);
            totalHavePln = Number(data['data'][i].nPln) - Number(data['data'][i].nNo) - Number(data['data'][i].nWBS) - Number(data['data'][i].nGIS2);
          } else {
            totalTR = totalTR + Number(data['data'][i].nTR);
            totalWBS = totalWBS + Number(data['data'][i].nWBS);
            totalGIS = totalGIS + Number(data['data'][i].nGIS);
            totalGIS2 = totalGIS2 + Number(data['data'][i].nGIS2);
            totalNO = totalNO + Number(data['data'][i].nNo);
            totalCLSD = totalCLSD + Number(data['data'][i].nCLSD);
            totalHavePln = totalHavePln + Number(data['data'][i].nPln) - Number(data['data'][i].nNo) - Number(data['data'][i].nWBS) - Number(data['data'][i].nGIS2);
          }

          if (i == data['data'].length - 1) {
            Pea.push(this.peaname[GlobalConstants.regionLetter[GlobalConstants.region] + data['data'][i].Pea]);
            kvaPln.push(totalTR);
            kva.push(totalWBS);
            GIS.push(totalGIS);
            GIS2.push(totalGIS2);
            No.push(totalNO);
            CLSD.push(totalCLSD);
            havePln.push(totalHavePln);
            peaInd.push(data['data'][i].Pea);
          }
          this.TrPlnTal = this.TrPlnTal + Number(data['data'][i].nTR);
          lastPea = data['data'][i].Pea;
          firstLoop = false;
          this.TrTotal = this.TrTotal + Number(data['data'][i].nWBS) + Number(data['data'][i].nGIS2) + Number(data['data'][i].nNo);
          this.TrTotalClsd = this.TrTotalClsd + Number(data['data'][i].nCLSD) + Number(data['data'][i].nGIS) + Number(data['data'][i].nNo);
          this.TrTotalHavePln = this.TrTotalHavePln + Number(data['data'][i].nPln);
        }
        // console.log(havePln);
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
        // console.log(GIS,GIS2);
        // var sum = GIS.reduce((sum, p) => sum + p);
        this.TrGIS = GIS.reduce((a, b) => a + b, 0);
        this.TrGIS2 = GIS2.reduce((a, b) => a + b, 0);
        this.TrNo = No.reduce((a, b) => a + b, 0);
        this.TrClsd = CLSD.reduce((a, b) => a + b, 0);
        this.TrWBS = kva.reduce((a, b) => a + b, 0);
        //this.kvaTotal=505;
        //APEX CHART
        this.chartOptions1 = {
          series: [Math.round(this.TrTotalHavePln / this.TrPlnTal * 100), Math.round(this.TrTotalClsd / this.TrPlnTal * 100)],
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
                  label: 'มีแผนงาน : ปิดงาน',
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
                data: GIS2,
                backgroundColor: '#ffd166',
              },
              {
                label: 'ไม่พบปัญหา',
                stack: 'Stack 2',
                data: No,
                backgroundColor: '#ffd166',
              },
              {
                label: 'อยู่ระหว่างตรวจสอบ',
                stack: 'Stack 2',
                data: havePln,
                backgroundColor: '#f2f4f4',
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
                  data: GIS2,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'ไม่พบปัญหา',
                  stack: 'Stack 2',
                  data: No,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'อยู่ระหว่างตรวจสอบ',
                  stack: 'Stack 2',
                  data: havePln,
                  backgroundColor: '#f2f4f4',
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
                  data: GIS2,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'ไม่พบปัญหา',
                  stack: 'Stack 2',
                  data: No,
                  backgroundColor: '#ffd166',
                },
                {
                  label: 'อยู่ระหว่างตรวจสอบ',
                  stack: 'Stack 2',
                  data: havePln,
                  backgroundColor: '#f2f4f4',
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
                  // console.log(data,tooltipItem.datasetIndex);
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
                  } else if (data.datasets[tooltipItem.datasetIndex].label.includes('อยู่ระหว่างตรวจสอบ')) {
                    kvaObj = myData["havePlan"][tooltipItem.label];
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
                    if (tooltipItem.datasetIndex == 1 || tooltipItem.datasetIndex == 2) {
                      gisObj = myData["gis"][tooltipItem.label] ? myData["gis"][tooltipItem.label] : [];
                    } else {
                      gisObj = myData["gis2"][tooltipItem.label] ? myData["gis2"][tooltipItem.label] : [];
                    }

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
                  if (ind == 1 || ind == 2) {

                    arryLabel.push(data.datasets[1].label + " : " + data.datasets[1].data[tooltipItem.index] + " เครื่อง , " + data.datasets[2].label + " : " + data.datasets[2].data[tooltipItem.index] + "เครื่อง");
                    kvaObj.forEach(element => {
                      if (element[1] > 0 || element[2] > 0) {
                        arryLabel.push(element[0] + ' kVA ' + element[1] + "," + element[2] + ' เครื่อง')
                      }
                    });


                    return arryLabel;
                  } else if (ind == 4 || ind == 5) {

                    arryLabel.push(data.datasets[4].label + " : " + data.datasets[4].data[tooltipItem.index] + " เครื่อง , " + data.datasets[5].label + " : " + data.datasets[5].data[tooltipItem.index] + "เครื่อง");
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
                // console.log("dataSet",this.data.datasets);
                var sum = [];
                var sumClsd = [];
                var psum = [];
                var pclsd = [];
                var aryLen = this.data.datasets.length - 1;
                if (this.data.datasets.length == 8) {
                  for (var i = 0; i < this.data.datasets[1].data.length; i++) {
                    sum.push(this.data.datasets[4].data[i] + this.data.datasets[5].data[i] + this.data.datasets[3].data[i] + this.data.datasets[6].data[i])
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
                        } else if (model.datasetLabel.includes("อยู่ระหว่างตรวจสอบ") && dataset.stack.includes("Stack 2")) {
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
                    sum.push(this.data.datasets[4].data[i] + this.data.datasets[5].data[i] + this.data.datasets[3].data[i] + this.data.datasets[6].data[i])
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
                        } else if (model.datasetLabel.includes("อยู่ระหว่างตรวจสอบ") && dataset.stack.includes("Stack 2")) {
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
        this.showOverlay = false;
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
    // this.peaCode = "G00000";
    if (this.peaCode.includes(GlobalConstants.regionLetter[GlobalConstants.region].trim()) || this.peaCode == 'Z00000' || this.peaCode == 'B00000') {
      this.configService.getTr('opsa67/TR2.php?condition=' + this.condition + '&peaCode0=' + this.peaCode+'&checked=' + this.checked)
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
  public getVcareData = () => {
    // this.peaCode = "G00000";

    this.configService.getTr('opsa67/vcare.php?peaCode0=' + this.peaCode)
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
      .subscribe(res => {
        // this.dataSource.paginator = this.paginator1;
        // this.dataSource.sort = this.sort1;
        this.dataSource4.data = res;
        this.dataSource4.paginator = this.paginator4;
        this.dataSource4.sort = this.sort4;
      })

  }
  getTRmatch() {
    this.configService.getTrMatch('opsa/rdMatchTR.php?aoj=' + this.selAoj)
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
      .subscribe(res => {
        this.dataSource2.data = res as trmatch[];
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      })


  }

  getMatReq() {
    this.configService.getMatReq('opsa67/getmatreq.php?nDay=' + this.nDate)
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000)
      .subscribe(res => {
        this.dataSource3.data = res as matreq[];
        this.dataSource3.paginator = this.paginator3;
        this.dataSource3.sort = this.sort3;
      })


  }
  checkTab() {
    if (this.tab == 0) {
      return true;
    } else {
      return false;
    }

  }
  onTabClick(event) {
    this.tab = event.index;

    if (event.index == 1) {
      this.getJobProgressPea2();
    } else if (event.index == 2) {
      this.getMat("1");
      this.getMatReq();
    } else if (event.index == 5) {
      this.getVcareChart();
      this.getVcareData();
      this.getvcaredate();
      // this.http.get('http://n2-psim.pea.co.th/psdoc/',{responseType:'text'}).subscribe(res=>{
      //   this.KisshtHtml = this.sanitizer.bypassSecurityTrustHtml(res);
      // })
    }
  }
  getMat(choice) {
    this.choice = choice;
    this.configService.postdata2('opsa67/rdMatSAP.php', { bat: this.bat }).subscribe((data => {
      if (data['status'] == 1) {
        // console.log(data);
        var label = ["30 kVA", "50 kVA", "100  kVA", "160  kVA"];
        var trSize = ["30", "50", "100", "160"];
        var TR15 = [0, 0, 0, 0];
        var TR45 = [0, 0, 0, 0];
        var TRStock = [0, 0, 0, 0];
        var TRStock2 = [0, 0, 0, 0];
        var TR45match = [0, 0, 0, 0];
        var matReq = [];
        var matReqStock = [];
        var matReqLabel = [];
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
            matReqLabel.push(element.matNameShort);
            matReq.push(Number(element.nMat));
            matReqStock.push(Number(element.stock));

          }
          if (element.nDay == "45" && choice != "1") {
            matReqLabel.push(element.matNameShort);
            matReq.push(Number(element.nMat));
            matReqStock.push(Number(element.stock));
          }

        });

        var chartData = {
          labels: matReqLabel,
          datasets: [
            {
              label: 'พัสดุที่ต้องการใช้งาน',
              data: matReq,
              backgroundColor: '#F0BC46',
            },
            {
              label: 'พัสดุคงคลัง',
              data: matReqStock,
              backgroundColor: '#F08646',
            }
          ]
        };

        if (this.chartReqMat) this.chartReqMat.destroy();
        this.chartReqMat = new Chart('chartReqMat', {
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
        if (choice == "1") {
          this.nDate = "15";
          chartData = {
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
          chartData = {
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
          chartData = {
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
   
    this.dataSource1.filter = (filterValue).trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {

    this.dataSource2.filter = (filterValue).trim().toLowerCase();
  }
  applyWBS(event) {
    if (window.confirm('คุณต้องการแก้ไขข้อมูล WBS/หมายเลขใบสั่ง ใช่หรือไม่?')) {
      this.configService.postdata2('opsa67/wriWBS.php', { TRNumber: event[1].PEA_TR, WBS: event[0] }).subscribe((data => {
        if (data['status'] == 1) {
          this.getTrData();
          //  this.getStatus();
          this.getJobProgressPea2();
          //console.log(this.peaname);
        } else {
          alert(data['data']);
        }
      }));
    } else {
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
    // console.log(event);
    this.configService.postdata2('opsa67/wristatus.php', { TRNumber: event.value[1].PEA_TR, status: event.value[0] }).subscribe((data => {
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
    input["user"] = GetCookie('name');
    // input["peaCode"] = "B06101";
    // input["peaCode"] = "B01101";
    input["peaCode"] = GetCookie('peaCode');
    input["nDay"] = this.nDate;
    this.getMat(this.choice);
    // console.log(this.registerForm.value);
    this.configService.postdata2('opsa67/wriMat.php', this.registerForm.value).subscribe((data => {
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

    this.configService.postdata2('opsa67/reTR2.php', wbsdata).subscribe((data => {
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
export class DialogOverviewExampleDialog3 {
  RVoltage: number;
  RLoad: number;
  realUb: number
  trtab: string;

  realVminA1: number;
  realVminB1: number;
  realVminC1: number;
  realVminA2: number;
  realVminB2: number;
  realVminC2: number;
  realVminA3: number;
  realVminB3: number;
  realVminC3: number;
  realVminA4: number;
  realVminB4: number;
  realVminC4: number;

  realVinA1: number;
  realVinB1: number;
  realVinC1: number;
  realVinA2: number;
  realVinB2: number;
  realVinC2: number;
  realVinA3: number;
  realVinB3: number;
  realVinC3: number;
  realVinA4: number;
  realVinB4: number;
  realVinC4: number;

  realIa: number;
  realIb: number;
  realIc: number;

  realIa1: number;
  realIb1: number;
  realIc1: number;
  realIa2: number;
  realIb2: number;
  realIc2: number;
  realIa3: number;
  realIb3: number;
  realIc3: number;
  realIa4: number;
  realIb4: number;
  realIc4: number;
  meaDate: string;
  meaTime: string;
  modeselect = '';
  Conditions = [

    { value: 'ABC' },

    // { value: 2, viewvalue: 'แรงดัน<200 Volt' },
    // { value: 7, viewvalue: 'แรงดัน 200-210 Volt' },
    // { value: 1, viewvalue: 'โหลด>100%' },
    { value: 'AB' },
    // { value: 8, viewvalue: 'โหลด 80-90%' },
    { value: 'BC' },
    { value: 'CA' },
    { value: 'A' },
    { value: 'B' },
    { value: 'C' },

  ];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog3>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data) {
      this.meaDate = data.trdata.meaDate;
      this.meaTime = data.trdata.meaTime;
      this.modeselect = data.trdata.modeselect || '';

      this.RVoltage = data.trdata.RVoltage;
      this.RLoad = data.trdata.RLoad;
      this.trtab = data.trdata.trtab;

      this.realIa1 = data.trdata.realIa1 || 0;
      this.realIb1 = data.trdata.realIb1 || 0;
      // this.realIa1=0;
      // this.realIb1=0;
      this.realIc1 = data.trdata.realIc1 || 0;

      this.realIa2 = data.trdata.realIa2 || 0;
      this.realIb2 = data.trdata.realIb2 || 0;
      this.realIc2 = data.trdata.realIc2 || 0;

      this.realIa3 = data.trdata.realIa3 || 0;
      this.realIb3 = data.trdata.realIb3 || 0;
      this.realIc3 = data.trdata.realIc3 || 0;

      this.realIa4 = data.trdata.realIa4 || 0;
      this.realIb4 = data.trdata.realIb4 || 0;
      this.realIc4 = data.trdata.realIc4 || 0;

      this.realVminA1 = data.trdata.realVminA1 || 0;
      this.realVminB1 = data.trdata.realVminB1 || 0;
      this.realVminC1 = data.trdata.realVminC1 || 0;

      this.realVminA2 = data.trdata.realVminA2 || 0;
      this.realVminB2 = data.trdata.realVminB2 || 0;
      this.realVminC2 = data.trdata.realVminC2 || 0;

      this.realVminA3 = data.trdata.realVminA3 || 0;
      this.realVminB3 = data.trdata.realVminB3 || 0;
      this.realVminC3 = data.trdata.realVminC3 || 0;

      this.realVminA4 = data.trdata.realVminA4 || 0;
      this.realVminB4 = data.trdata.realVminB4 || 0;
      this.realVminC4 = data.trdata.realVminC4 || 0;

      this.realVinA1 = data.trdata.realVinA1 || 0;
      this.realVinB1 = data.trdata.realVinB1 || 0;
      this.realVinC1 = data.trdata.realVinC1 || 0;

      this.realVinA2 = data.trdata.realVinA2 || 0;
      this.realVinB2 = data.trdata.realVinB2 || 0;
      this.realVinC2 = data.trdata.realVinC2 || 0;

      this.realVinA3 = data.trdata.realVinA3 || 0;
      this.realVinB3 = data.trdata.realVinB3 || 0;
      this.realVinC3 = data.trdata.realVinC3 || 0;

      this.realVinA4 = data.trdata.realVinA4 || 0;
      this.realVinB4 = data.trdata.realVinB4 || 0;
      this.realVinC4 = data.trdata.realVinC4 || 0;

      this.realUb = data.trdata.realUb || 0;
      // this.realVin = data.trdata.realVin;
      this.calload();
    }


  }
  calload(): void {
    var nphase = this.modeselect.length;
    var kvaF1 = Number(this.realIa1) * Number(this.realVinA1) + Number(this.realIb1) * Number(this.realVinB1) + Number(this.realIc1) * Number(this.realVinC1);
    var kvaF2 = Number(this.realIa2) * Number(this.realVinA2) + Number(this.realIb2) * Number(this.realVinB2) + Number(this.realIc2) * Number(this.realVinC2);
    var kvaF3 = Number(this.realIa3) * Number(this.realVinA3) + Number(this.realIb3) * Number(this.realVinB3) + Number(this.realIc3) * Number(this.realVinC3);
    var kvaF4 = Number(this.realIa4) * Number(this.realVinA4) + Number(this.realIb4) * Number(this.realVinB4) + Number(this.realIc4) * Number(this.realVinC4);
    this.RLoad = Math.round((kvaF1 + kvaF2 + kvaF3 + kvaF4) / (10 * Number(this.data.trdata.kva)));

    var Ia = Number(this.realIa1) + Number(this.realIa2) + Number(this.realIa3) + Number(this.realIa4);
    var Ib = Number(this.realIb1) + Number(this.realIb2) + Number(this.realIb3) + Number(this.realIb4);
    var Ic = Number(this.realIc1) + Number(this.realIc2) + Number(this.realIc3) + Number(this.realIc4);
    this.realIa = Ia;
    this.realIb = Ib;
    this.realIc = Ic;

    if (Iavg == 0) {
      this.realUb = 0;
    } else if (nphase == 3) {
      var Iavg = (Ia + Ib + Ic) / nphase;
      var Imax = Math.max(Math.abs(Ia - Iavg), Math.abs(Ib - Iavg), Math.abs(Ic - Iavg));
      this.realUb = Math.round(Imax / Iavg * 100);
    } else if (nphase == 2) {
      if (this.modeselect == 'AB') {
        var Iavg = (Ia + Ib) / nphase;
        var Imax = Math.max(Math.abs(Ia - Iavg), Math.abs(Ib - Iavg));
      } else if (this.modeselect == 'BC') {
        var Iavg = (Ib + Ic) / nphase;
        var Imax = Math.max(Math.abs(Ib - Iavg), Math.abs(Ic - Iavg));
      } else if (this.modeselect == 'CA') {
        var Iavg = (Ia + Ic) / nphase;
        var Imax = Math.max(Math.abs(Ia - Iavg), Math.abs(Ic - Iavg));
      }
      this.realUb = Math.round(Imax / Iavg * 100);
    } else {
      this.realUb = 0;
    }
    var vArr = [this.realVminA1, this.realVminA2, this.realVminA3, this.realVminA4, this.realVminB1, this.realVminB2, this.realVminB3, this.realVminB4, this.realVminC1, this.realVminC2, this.realVminC3, this.realVminC4].filter(v => v > 0);

    if (vArr.length > 0) {
      this.RVoltage = Math.min(...vArr);
    } else {
      this.RVoltage = 0;
    }

  }
  selectCondition(event): void {
    this.modeselect = event.value[0];
    this.calload();
  }
  onConfirmClick(): void {
    var wbs = {};

    // this.wbs["newVin"]=this.newVin;
    wbs["PEA_TR"] = this.data.trdata.PEA_TR;
    wbs["aoj"] = this.data.trdata.aoj;
    wbs["meaDate"] = this.meaDate;
    wbs["meaTime"] = this.meaTime;
    wbs["RVoltage"] = this.RVoltage;
    wbs["modeselect"] = this.modeselect;

    wbs["realVminA1"] = this.realVminA1;
    wbs["realVminB1"] = this.realVminB1;
    wbs["realVminC1"] = this.realVminC1;

    wbs["realVminA2"] = this.realVminA2;
    wbs["realVminB2"] = this.realVminB2;
    wbs["realVminC2"] = this.realVminC2;

    wbs["realVminA3"] = this.realVminA3;
    wbs["realVminB3"] = this.realVminB3;
    wbs["realVminC3"] = this.realVminC3;

    wbs["realVminA4"] = this.realVminA4;
    wbs["realVminB4"] = this.realVminB4;
    wbs["realVminC4"] = this.realVminC4;

    wbs["realVinA1"] = this.realVinA1;
    wbs["realVinB1"] = this.realVinB1;
    wbs["realVinC1"] = this.realVinC1;

    wbs["realVinA2"] = this.realVinA2;
    wbs["realVinB2"] = this.realVinB2;
    wbs["realVinC2"] = this.realVinC2;

    wbs["realVinA3"] = this.realVinA3;
    wbs["realVinB3"] = this.realVinB3;
    wbs["realVinC3"] = this.realVinC3;

    wbs["realVinA4"] = this.realVinA4;
    wbs["realVinB4"] = this.realVinB4;
    wbs["realVinC4"] = this.realVinC4;

    wbs["RLoad"] = this.RLoad;
    wbs["trtab"] = this.trtab;
    wbs["realIa"] = this.realIa;
    wbs["realIb"] = this.realIb;
    wbs["realIc"] = this.realIc;
    wbs["realIa1"] = this.realIa1;
    wbs["realIb1"] = this.realIb1;
    wbs["realIc1"] = this.realIc1;
    wbs["realIa2"] = this.realIa2;
    wbs["realIb2"] = this.realIb2;
    wbs["realIc2"] = this.realIc2;
    wbs["realIa3"] = this.realIa3;
    wbs["realIb3"] = this.realIb3;
    wbs["realIc3"] = this.realIc3;
    wbs["realIa4"] = this.realIa4;
    wbs["realIb4"] = this.realIb4;
    wbs["realIc4"] = this.realIc4;
    wbs["realUb"] = this.realUb;
    wbs["realVin"] = this.realVinA1;
    this.dialogRef.close(wbs);
  }

}