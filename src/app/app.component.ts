import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app';
  numbers = [1, 5, 7, 8];

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
    let produceValue = () => {
      observer.next(this.numbers[index++]);
      if (index < this.numbers.length) {
        setTimeout(produceValue, 2000);
      } else {
        observer.complete();
      }
    };
    produceValue();
  }).map(n => n * 2).filter(n => n > 11);

  ngOnInit(): void {

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

    // using Observable.create
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