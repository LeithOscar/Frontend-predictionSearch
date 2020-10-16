import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'advances-search-app';
  linearModel: string[];
  predictions: string[] = [];
  predictValue: string;
  searchedText = '';

  private _jsonURL = './assets/model.json';

  constructor(private _httpClient: HttpClient) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.train();
  }

  train(): void {
    // Define a model for linear regression.
    this._httpClient.get(this._jsonURL).subscribe((data: Array<string>) => {
      this.linearModel = data;
    });
  }

  predict(val: string) {

    this.predictValue = val;
    this.contains(val);

  }

  addPredict(val: string): void {

    val = val.toLowerCase();
    if (!this.linearModel.includes(val)) {
      this.linearModel.push(val);
    }
  }

  showPredictions(): boolean {
    return this.searchedText.length > 0;
  }

  contains(obj: string): string[] {
    this.predictions = [];
    for (let i = 0; i < this.linearModel.length; i++) {

      if (this.linearModel[i].includes(obj)) {
        this.predictions.push(this.linearModel[i]);
      }
    }
    return this.predictions;
  }
}
