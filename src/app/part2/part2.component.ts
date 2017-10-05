import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone, AfterViewInit, Renderer2 } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.scss']
})
export class Part2Component implements OnInit {
  randomcolor = this.getRandomColor();
  source4 = Observable.fromEvent(document, 'mousemove')
    .map((e: MouseEvent) => {
      return { x: e.clientX + 9, y: e.clientY + 9 };
    })
    .filter(value => value.x < 500).delay(200);

  @ViewChild('circle') circle: ElementRef;

  color: string;
  size: number;
  movies: any;

  myStyles = {
    'background-color': 'lime',
    'font-size': '20px',
    'font-weight': 'bold',
    'left': '50px',
    'top': '60px'
  };

  constructor(private http: HttpClient) {
    this.color = 'pink';
    this.size = 16;
  }

  ngOnInit(): void {

    this.source4.subscribe(
      (value) => {
        this.myStyles.left = value.x + 'px';
        this.myStyles.top = value.y + 'px';
        //console.log(this.myStyles, this.circle);
      },
      e => console.log('error:', e),
      () => console.log('complete')
    );
  }

  loadMovies(url: string) {
    // this.http.request('http://thecatapi.com/api/images/get?format=html&results_per_page=10').
    // .map(res => res.json())
    //   .subscribe(data => {
    //     console.log(data);
    //   })

    this.http.get('/assets/moviess.json').subscribe(data => {
      // Read the result field from the JSON response.
      console.log('data :', data);
      this.movies = data;
    });
  }

  getMovies() {
    console.log('get movives');
    this.loadMovies('movies.json'); //.subscribe(o => console.log('11: ', o));
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  //function to set a new random color
  setColor() {
    this.randomcolor = this.getRandomColor();
  }



}