import { BoyerMoorePatternService } from './boyerMoore.service';


describe('boyerMoorePatternService', () => {

    let service: BoyerMoorePatternService = null;

    beforeEach(() => {

        service = new BoyerMoorePatternService();
    });


    describe('find the word on text', () => {

        it('find', () => {
            const searchText = 'word';
            const text = 'there would have been a time for such a word';


            const exist = service.boyerMooreSearch(text, searchText);

            expect(exist).toBe(1);
        });
    });
});
