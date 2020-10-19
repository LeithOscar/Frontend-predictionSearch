import { Injectable } from '@angular/core';
import { DepthwiseConv2dNativeBackpropInput } from '@tensorflow/tfjs';
import { element } from 'protractor';

@Injectable()
export class BoyerMoorePatternService {
    d1: [] = [];

    boyerMooreSearch(text: string, pattern: string): number {


        if (pattern.length === 0) {
            return -1;
        }

        this.tableD1(pattern);
    }

    tableD1(pattern: string): void {

        const items = Array.from(pattern.replace(/(.)(?=.*\1)/g, '')); // distinct
        items.forEach((element) => {
            this.d1[element] = this.getPositionOnPattern(element, pattern);
        });
    }

    getPositionOnPattern(char: string, pattern: string): number {
        const iterator = Array.from(pattern);
        for (let index = pattern.length; index <= iterator.length; index--) { // read to right to left
            if (char === iterator[index]) {
                return pattern.indexOf(iterator[index]);  // return first element found
            }
        }
        return 0;
    }

}
