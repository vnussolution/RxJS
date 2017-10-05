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
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component implements OnInit {

  numbers = [1, 5, 7, 8];
  style = {};

  source = Observable.from(this.numbers);

  source2 = Observable.create(observer => {
    console.log(` source2 : started`);
    for (const n of this.numbers) {
      //if (n === 5) observer.error(`something wrong`);
      observer.next(n);
    }

    observer.complete();
  });

  source3 = Observable.create(observer => {
    let index = 0;
    const produceValue = () => {
      observer.next(this.numbers[index++]);
      if (index < this.numbers.length) {
        setTimeout(produceValue, 200);
      } else {
        observer.complete();
      }
    };
    produceValue();
  }).map(n => n * 2).filter(n => n > 11);


  constructor() {

  }

  ngOnInit(): void {
    this.part1();
  }

  // Observers and Observables
  part1() {
    // explicitely create Observer class
    this.source.subscribe(new MyObserver());

    // using Observable.from
    this.source.subscribe(
      value => console.log(` simple value: ${value}`),
      e => console.log(`error: ${e}`),
      () => console.log(`simple complete`)
    );

    // using Observable.create
    this.source2.subscribe(
      value => console.log(` source2 value: ${value}`),
      e => console.log(`error: ${e}`),
      () => console.log(`source2 complete`)
    );

    //using Observable.create
    this.source3.subscribe(
      value => console.log(` source2 value: ${value}`),
      e => console.log(`error: ${e}`),
      () => console.log(`source2 complete`)
    );
  }
}

class MyObserver implements Observer<number> {
  next(value: number) {
    console.log(` value: ${value}`);
  }

  error(e: any) {
    console.log(e);
  }

  complete() {
    console.log('complete MyObserver');
  }

}