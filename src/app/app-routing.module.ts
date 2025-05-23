import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import {SumtableComponent} from './sumtable/sumtable.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard'
import {UploadComponent} from'./upload/upload.component';
import {UploadopsaComponent} from'./uploadopsa/uploadopsa.component';
import {Uploadopsa2Component} from './uploadopsa2/uploadopsa2.component';
import {Uploadopsa3Component} from './uploadopsa3/uploadopsa3.component';
import {Uploadopsa4Component} from './uploadopsa4/uploadopsa4.component';
import {JobapproveComponent} from './jobapprove/jobapprove.component';
// import {LVProComponent} from'./lvpro/lvpro.component';
import {OPSAComponent} from'./opsa/opsa.component';
import {OPSA66Component} from'./opsa66/opsa66.component';
import {OPSA67Component} from'./opsa67/opsa67.component';
import {OPSA68Component} from'./opsa68/opsa68.component';
import {PsimdashboardComponent} from './psimdashboard/psimdashboard.component';
import {PhasechkComponent} from './phasechk/phasechk.component';
import {RoicComponent} from './roic/roic.component';
import {EzxComponent} from './ezx/ezx.component'
//,canActivate:[AuthGuard]
const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  { path: 'forms', component: FormsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordions', component: AccordionsComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'progressbar', component: ProgressbarComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'dropdowns', component: DropdownComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'jobreq', component: SumtableComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'uploadopsa', component: UploadopsaComponent },
  { path: 'uploadopsa2', component: Uploadopsa2Component },
  { path: 'uploadopsa3', component: Uploadopsa3Component },
  { path: 'uploadopsa4', component: Uploadopsa4Component },
  { path: 'jobapprove', component: JobapproveComponent,canActivate:[AuthGuard] },
  // { path: 'ldcad', component: LVProComponent,canActivate:[AuthGuard]},
  { path: 'opsa', component: OPSAComponent,canActivate:[AuthGuard]},
  { path: 'opsa66', component: OPSA66Component,canActivate:[AuthGuard]},
  { path: 'opsa67', component: OPSA67Component,canActivate:[AuthGuard]},
  { path: 'opsa68', component: OPSA68Component,canActivate:[AuthGuard]},
  { path: 'psim', component: PsimdashboardComponent,canActivate:[AuthGuard] },
  { path: 'phasecheck', component: PhasechkComponent,canActivate:[AuthGuard] },
  { path: 'roic', component: RoicComponent,canActivate:[AuthGuard] },
  { path: 'ezx', component: EzxComponent,canActivate:[AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
