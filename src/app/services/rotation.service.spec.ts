import { RotationService } from './rotation.service';
import * as faker from 'faker';
import { Pair } from '../utillity/pair';
import { arraysAreEqual } from '../utillity/lulz';

describe('RotationService', () => {
    const localStorageService = {
        getCarriers: jest.fn(),
        getDevs: jest.fn(),
        getBoards: jest.fn(),
        getDisabled: jest.fn(),
        getDisabledBoards: jest.fn(),
        getSticking: jest.fn(),
        getAllowSolo: jest.fn()
    };

    const rotationService = new RotationService(localStorageService as any);

    beforeEach(() => {
        localStorageService.getCarriers.mockReturnValue([]);
        localStorageService.getDisabled.mockReturnValue([]);
        localStorageService.getDisabledBoards.mockReturnValue([]);
        localStorageService.getSticking.mockReturnValue([]);
        localStorageService.getAllowSolo.mockReturnValue(false);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('makeItRotato', () => {
        it('should return list of randomized pairs', () => {
            const devs = getDevs(6);
            const boards = getBoards(3);

            localStorageService.getDevs.mockReturnValue(devs);
            localStorageService.getBoards.mockReturnValue(boards);

            rotatoValidato((results: Pair[]) => {
                expect(results).toHaveLength(3);
                expect(results[0].devs).toHaveLength(2);
                expect(results[1].devs).toHaveLength(2);
                expect(results[2].devs).toHaveLength(2);

                const boardsFromResults = [results[0].board, results[1].board, results[2].board];
                const devsFromResults = [...results[0].devs, ...results[1].devs, ...results[2].devs];

                expect(boardsFromResults).toIncludeSameMembers(boards);
                expect(devsFromResults).toIncludeSameMembers(devs);
            }, (allResults: Pair[][]) => verifyAllPairsAreUnique(allResults));
        });

        it('should not pair carrying devs together when there are carrying devs', () => {
            const carryingDevs = [getNthDev(1), getNthDev(2), getNthDev(3)];
            const cleanDevs = [getNthDev(4), getNthDev(5), getNthDev(6)];

            const devs = [...carryingDevs, ...cleanDevs];

            const boards = getBoards(3);

            localStorageService.getDevs.mockReturnValue(devs);
            localStorageService.getBoards.mockReturnValue(boards);
            localStorageService.getCarriers.mockReturnValue(carryingDevs);

            rotatoValidato((results: Pair[]) => {
                const pairHasOneCarryingAndOneClean = (pair: Pair) =>
                    (carryingDevs.includes(pair.devs[0]) && cleanDevs.includes(pair.devs[1])) ||
                    (carryingDevs.includes(pair.devs[1]) && cleanDevs.includes(pair.devs[0]));

                expect(results).toSatisfyAll(pairHasOneCarryingAndOneClean);
            }, (allResults: Pair[][]) => verifyAllPairsAreUnique(allResults));
        });

        it('should not use disabled devs', () => {
            const disabledDevs = [getNthDev(1), getNthDev(2)];
            const enabledDevs = [getNthDev(3), getNthDev(4)];

            const devs = [...disabledDevs, ...enabledDevs];

            localStorageService.getDevs.mockReturnValue(devs);
            localStorageService.getBoards.mockReturnValue([]);
            localStorageService.getDisabled.mockReturnValue(disabledDevs);

            const results = rotationService.makeItRotato();

            expect(results).toHaveLength(1);
            expect(results[0].devs).toIncludeSameMembers(enabledDevs);
        });

        it('should not use disabled boards', () => {
            const disabledBoards = [getNthBoard(1), getNthBoard(2)];
            const enabledBoard = getNthBoard(3);

            const devs = getDevs(6);
            const boards = [...disabledBoards, enabledBoard];

            localStorageService.getDevs.mockReturnValue(devs);
            localStorageService.getBoards.mockReturnValue(boards);
            localStorageService.getDisabledBoards.mockReturnValue(disabledBoards);

            const results = rotationService.makeItRotato();

            expect(results).toHaveLength(3);
            expect(results[0].devs).toHaveLength(2);
            expect(results[1].devs).toHaveLength(2);
            expect(results[2].devs).toHaveLength(2);

            const boardsFromResult = [results[0].board, results[1].board, results[2].board];

            expect(boardsFromResult).toIncludeSameMembers([enabledBoard, undefined, undefined]);
        });

        it('should make pair without board when not enough boards exist', () => {
            const devs = getDevs(4);
            const board = getNthBoard(1);

            localStorageService.getDevs.mockReturnValue(devs);
            localStorageService.getBoards.mockReturnValue([board]);

            const results = rotationService.makeItRotato();

            const boardsFromResult = [results[0].board, results[1].board];
            expect(boardsFromResult).toIncludeSameMembers([board, undefined]);
        });

        it('should keep sticking pairs in the rotated pairs', () => {
            const firstStickingPair: Pair = {
                board: getNthBoard(1),
                devs: [getNthDev(1), getNthDev(2)]
            };

            const secondStickingPair: Pair = {
                board: getNthBoard(2),
                devs: [getNthDev(3), getNthDev(4)]
            };

            const devs = getDevs(10);
            const boards = getBoards(5);

            localStorageService.getDevs.mockReturnValue(devs);
            localStorageService.getBoards.mockReturnValue(boards);
            localStorageService.getSticking.mockReturnValue([firstStickingPair, secondStickingPair]);

            rotatoValidato((results: Pair[]) => {
                expect(results).toIncludeAllMembers([firstStickingPair, secondStickingPair]);
            }, (allResults: Pair[][]) => {
                const allResultsWithoutStickingPairs = allResults.map(results =>
                    results.filter(x => x !== firstStickingPair && x !== secondStickingPair)
                );

                verifyAllPairsAreUnique(allResultsWithoutStickingPairs);
            });
        });

        it('should not create empty pairs when there are more boards than devs', () => {
            const devs = getDevs(2);
            const boards = getBoards(3);

            localStorageService.getDevs.mockReturnValue(devs);
            localStorageService.getBoards.mockReturnValue(boards);

            rotatoValidato((results: Pair[]) => {
                expect(results).toHaveLength(1);
                expect(results[0].board).toBeOneOf(boards);
            }, (allResults: Pair[][]) => {
                const distinctBoards = new Set(allResults.map(results => results[0].board));
                expect(distinctBoards.size).toBeGreaterThan(1);
            });
        });

        describe('when there is an odd number of devs', () => {
            it('should make a pair of three devs when soloing is not enabled', () => {
                const devs = getDevs(5);
                const boards = getBoards(2);

                localStorageService.getDevs.mockReturnValue(devs);
                localStorageService.getBoards.mockReturnValue(boards);

                rotatoValidato((results: Pair[]) => {
                    const hasATriplePairAndDoublePair = (pairs: Pair[]) =>
                        (pairs[0].devs.length === 3 && pairs[1].devs.length === 2) ||
                        (pairs[0].devs.length === 2 && pairs[1].devs.length === 3);

                    expect(results).toSatisfy(hasATriplePairAndDoublePair);
                }, (allResults: Pair[][]) => verifyAllPairsAreUnique(allResults));
            });

            it('should make a pair of one dev when soloing is enabled', () => {
                const devs = getDevs(5);
                const boards = getBoards(3);

                localStorageService.getDevs.mockReturnValue(devs);
                localStorageService.getBoards.mockReturnValue(boards);
                localStorageService.getAllowSolo.mockReturnValue(true);

                rotatoValidato((results: Pair[]) => {
                    const pairSizes = results.map(x => x.devs.length);

                    expect(pairSizes).toIncludeSameMembers([2, 2, 1]);
                }, (allResults: Pair[][]) => verifyAllPairsAreUnique(allResults));
            });
        });
    });

    const testDevData = [];
    const testBoardData = [];

    function getNthDev(index: number): string {
        while (testDevData.length < index) {
            testDevData.push(faker.unique(faker.name.firstName));
        }
        return testDevData[index - 1];
    }

    function getNthBoard(index: number): string {
        while (testBoardData.length < index) {
            testBoardData.push(faker.unique(faker.name.firstName));
        }
        return testBoardData[index - 1];
    }

    function getDevs(size: number): string[] {
        while (testDevData.length < size) {
            testDevData.push(faker.unique(faker.name.firstName));
        }
        return testDevData.slice(0, size);
    }

    function getBoards(size: number): string[] {
        while (testBoardData.length < size) {
            testBoardData.push(faker.unique(faker.name.firstName));
        }
        return testBoardData.slice(0, size);
    }

    function rotatoValidato(
        expectations: {(results: Pair[])},
        afterAllExpectations?: {(allResults: Pair[][])}
    ): void {
        const numberOfTestRuns = 10;

        const allResults: Pair[][] = [];

        for (let x = 0; x < numberOfTestRuns; x++) {
            const results = rotationService.makeItRotato();
            expectations(results);
            allResults.push(results);
        }

        if (!!afterAllExpectations) {
            afterAllExpectations(allResults);
        }
    }
});

function verifyAllPairsAreUnique(allPairs: Pair[][]): void {
    const allDevPairings = allPairs.map(results => results.map(pair => pair.devs));
    const repeatedDevPairsInEveryRotation = allDevPairings.reduce((x, y) => getIntersectionOfArrays(x, y));

    expect(repeatedDevPairsInEveryRotation).toHaveLength(0);

    const allDevAndBoardCombos = allPairs.map(results => results.flatMap(pair => pair.devs.map(dev => [dev, pair.board])));
    const repeatedDevAndBoardCombosInEveryRotation = allDevAndBoardCombos.reduce((x, y) => getIntersectionOfArrays(x, y));

    expect(repeatedDevAndBoardCombosInEveryRotation).toHaveLength(0);
}

function getIntersectionOfArrays(firstArrays: any[][], secondArrays: any[][]): any[][] {
    return firstArrays.filter(firstArray =>
        secondArrays.find(secondArray =>
            arraysAreEqual(firstArray, secondArray)
        )
    );
}
