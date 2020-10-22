import { Injectable } from '@angular/core';
import { math, Max } from '@tensorflow/tfjs';


@Injectable()
export class BoyerMoorePatternService {
    private d1: [] = [];
    private SPACE = ' ';
    patternLength: number;
    pattern: string;
    text: string;

    bruteForce(text: string, pattern: string): number {
        if (pattern.length === 0) {
            return -1;
        }

        this.patternLength = pattern.length;
        this.pattern = pattern;
        this.text = text;
        return this.search();
    }

    search(): number {

        // remember, read from right to left
        const lengthOfPattern = this.patternLength;
        const lengthOfText = this.text.length;


        for (let i = 0; i <= lengthOfText - lengthOfPattern; i++) {
            let j = 0;

            for (j = 0; j < lengthOfPattern; j++) {
                if (this.text.charAt(i + j) !== this.pattern.charAt(j)) {
                    break;
                }
            }

            if (j === lengthOfPattern) {
                // return i; position of word
                return 1;
            }

        }

        return 0;

    }


    badMatchTable(text: string, pattern: string): number {
        if (pattern.length === 0) {
            return -1;
        }

        this.patternLength = pattern.length;
        this.pattern = pattern;
        this.text = text;
        this.tableD1(); // bad macht table
        return this.searchBadTable();
    }

    searchBadTable(): number {

        let numOfskips = 0;

        for (let i = 0; i <= this.text.length - this.patternLength; i += numOfskips) {

            numOfskips = 0;

            for (let j = this.patternLength - 1; j >= 0; j--) {

                if (this.pattern.charAt(j) !== this.text.charAt(i + j)) {

                    if (this.d1[this.pattern.charAt(i + j)]) {

                        numOfskips = this.d1[this.pattern.charAt(i + j)];
                        break;

                    } else {
                        numOfskips = j + 1;
                    }

                }
                if (numOfskips === 0) {
                    // return i;
                    return 1;
                }
            }
            // return 0;
        }
        return 0;
    }


    // create table wrong prefix 'prefijo malo'
    tableD1(): void {

        for (let index = 0; index < this.patternLength; index++) {
            const actualCharacter = this.pattern.charAt(index);
            const maxShift = Math.max(1, this.patternLength - index - 1);
            this.d1[actualCharacter] = maxShift;
        }
        this.d1[this.SPACE] = this.patternLength; // other block
    }
}
