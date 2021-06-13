import { BoardService } from './board.service';
import * as faker from 'faker';
import { shuffle } from '../utillity/lulz';

describe('BoardService', () => {

    const localStorageService = {
        getBoards: jest.fn(),
        getDisabledBoards: jest.fn(),
        getPairs: jest.fn(),
        getSticking: jest.fn(),

        setBoards: jest.fn(),
        setDisabledBoards: jest.fn(),
        setPairs: jest.fn(),
        setSticking: jest.fn()
    };

    const boardService = new BoardService(localStorageService as any);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('update', () => {
        const oldBoardName = faker.unique(faker.address.country);
        const updatedBoardName = faker.unique(faker.address.country);

        const firstOtherBoardName = faker.unique(faker.address.country);
        const secondOtherBoardName = faker.unique(faker.address.country);

        const firstPairDevs = [faker.name.firstName(), faker.name.firstName()];
        const secondPairDevs = [faker.name.firstName(), faker.name.firstName()];

        it('should update board name in every list that contains the board name', () => {

            localStorageService.getBoards.mockReturnValue(shuffle([
                oldBoardName,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            localStorageService.getDisabledBoards.mockReturnValue(shuffle([
                oldBoardName,
                firstOtherBoardName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {board: oldBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {board: oldBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            boardService.update(oldBoardName, updatedBoardName);

            expect(localStorageService.setBoards).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                updatedBoardName,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            expect(localStorageService.setDisabledBoards).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                updatedBoardName,
                firstOtherBoardName
            ]));

            expect(localStorageService.setPairs).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                {board: updatedBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            expect(localStorageService.setSticking).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                {board: updatedBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));
        });

        it('should not update disabled boards when board is not disabled', () => {

            localStorageService.getBoards.mockReturnValue(shuffle([
                oldBoardName,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            localStorageService.getDisabledBoards.mockReturnValue(shuffle([
                secondOtherBoardName,
                firstOtherBoardName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {board: oldBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {board: oldBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            boardService.update(oldBoardName, updatedBoardName);

            expect(localStorageService.setDisabledBoards).not.toHaveBeenCalled();
        });

        it('should not update pairs when board is not in a pair', () => {

            localStorageService.getBoards.mockReturnValue(shuffle([
                oldBoardName,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            localStorageService.getDisabledBoards.mockReturnValue(shuffle([
                oldBoardName,
                firstOtherBoardName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {board: firstOtherBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {board: oldBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            boardService.update(oldBoardName, updatedBoardName);

            expect(localStorageService.setPairs).not.toHaveBeenCalled();
        });

        it('should not update sticking pairs when board is not in a sticking pair', () => {

            localStorageService.getBoards.mockReturnValue(shuffle([
                oldBoardName,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            localStorageService.getDisabledBoards.mockReturnValue(shuffle([
                oldBoardName,
                firstOtherBoardName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {board: oldBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {board: firstOtherBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            boardService.update(oldBoardName, updatedBoardName);

            expect(localStorageService.setSticking).not.toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        const boardToDelete = faker.unique(faker.address.country);

        const firstOtherBoardName = faker.unique(faker.address.country);
        const secondOtherBoardName = faker.unique(faker.address.country);

        const firstPairDevs = [faker.name.firstName(), faker.name.firstName()];
        const secondPairDevs = [faker.name.firstName(), faker.name.firstName()];

        it('should remove board name in every list that contains the board name', () => {

            localStorageService.getBoards.mockReturnValue(shuffle([
                boardToDelete,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            localStorageService.getDisabledBoards.mockReturnValue(shuffle([
                boardToDelete,
                firstOtherBoardName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {board: boardToDelete, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {board: boardToDelete, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            boardService.delete(boardToDelete);

            expect(localStorageService.setBoards).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            expect(localStorageService.setDisabledBoards).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                firstOtherBoardName
            ]));

            expect(localStorageService.setPairs).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                {devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            expect(localStorageService.setSticking).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                {devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));
        });

        it('should not update disabled boards when board is not disabled', () => {

            localStorageService.getBoards.mockReturnValue(shuffle([
                boardToDelete,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            localStorageService.getDisabledBoards.mockReturnValue(shuffle([
                secondOtherBoardName,
                firstOtherBoardName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {board: boardToDelete, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {board: boardToDelete, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            boardService.delete(boardToDelete);

            expect(localStorageService.setDisabledBoards).not.toHaveBeenCalled();
        });

        it('should not update pairs when board is not in a pair', () => {

            localStorageService.getBoards.mockReturnValue(shuffle([
                boardToDelete,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            localStorageService.getDisabledBoards.mockReturnValue(shuffle([
                boardToDelete,
                firstOtherBoardName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {board: firstOtherBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {board: boardToDelete, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            boardService.delete(boardToDelete);

            expect(localStorageService.setPairs).not.toHaveBeenCalled();
        });

        it('should not update sticking pairs when board is not in a sticking pair', () => {

            localStorageService.getBoards.mockReturnValue(shuffle([
                boardToDelete,
                firstOtherBoardName,
                secondOtherBoardName
            ]));

            localStorageService.getDisabledBoards.mockReturnValue(shuffle([
                boardToDelete,
                firstOtherBoardName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {board: boardToDelete, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {board: firstOtherBoardName, devs: firstPairDevs},
                {board: secondOtherBoardName, devs: secondPairDevs}
            ]));

            boardService.delete(boardToDelete);

            expect(localStorageService.setSticking).not.toHaveBeenCalled();
        });
    });
});
