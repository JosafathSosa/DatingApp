import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';

import {ComponentMetricsService, WebVitalsService} from "ngx-metrics-web"

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit, AfterViewInit, OnDestroy {
  membersService = inject(MembersService);
  private webVitalService = inject(WebVitalsService)
  private componentMetricsService = inject(ComponentMetricsService);

  ngOnInit(): void {
    this.webVitalService.startWebVitalsCollection()
    this.componentMetricsService.startRender()
    this.componentMetricsService.startSession()

    this.componentMetricsService.configureVisitCounter("members_visit_ccounter", "Member visit counter")
    this.componentMetricsService.trackVisit("Member-list")

    this.componentMetricsService.configureMemoryUsage("members_memory_usage", "Members Component Memory Usage")

    if (this.membersService.members().length === 0) {
      this.loadMembers();
    }
  }
  
  ngAfterViewInit(): void {
    this.componentMetricsService.endRender("members_render_time", "Render time for members-list component")
  }

  ngOnDestroy(): void {
    this.componentMetricsService.endSession("members_user_session", "User Session Duration")
    this.componentMetricsService.trackMemoryUsage()
  }
  

  loadMembers() {
    this.membersService.getMembers();
  }
}
