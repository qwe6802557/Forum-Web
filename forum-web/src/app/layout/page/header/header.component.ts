import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  isCollapsed = true

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.router.url, '?###');
  }

  jump (url: string) {
    this.router.navigate([url]);
  }

}
