import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  /**
   * Image url of person
   */
  imageUrl: string;
  /**
   * Index of tab selected
   */
  tabSelectIndex: number;
  /**
   * Width of a single tab
   */
  tabWidth: number = 33;
  /**
   * left property of tab select line
   */
  left: number = 0;

  constructor() { }

  ngOnInit() {
    this.selectTab(2);
  }

  /**
   * Tab is selected
   */
  selectTab(index: number) {
    this.tabSelectIndex = index;
    this.left = (this.tabSelectIndex - 1) * this.tabWidth;
  }

}
