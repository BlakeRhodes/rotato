import { DevService } from './dev.service';
import * as faker from 'faker';
import { shuffle } from '../utillity/lulz';

describe('DevService', () => {

    const localStorageService = {
        getDevs: jest.fn(),
        getDisabled: jest.fn(),
        getCarriers: jest.fn(),
        getPairs: jest.fn(),
        getSticking: jest.fn(),

        setDevs: jest.fn(),
        setDisabled: jest.fn(),
        setCarriers: jest.fn(),
        setPairs: jest.fn(),
        setSticking: jest.fn(),
    };

    const devService = new DevService(localStorageService as any);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('update', () => {
        const oldDevName = faker.unique(faker.name.firstName);
        const updatedDevName = faker.unique(faker.name.firstName);

        const firstOtherDevName = faker.unique(faker.name.firstName);
        const secondOtherDevName = faker.unique(faker.name.firstName);
        const thirdOtherDevName = faker.unique(faker.name.firstName);
        const fourthOtherDevName = faker.unique(faker.name.firstName);

        it('should update dev name in every list that contains the dev name', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                oldDevName,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([oldDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([oldDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.update(oldDevName, updatedDevName);

            expect(localStorageService.setDevs).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                updatedDevName,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            expect(localStorageService.setDisabled).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                updatedDevName,
                firstOtherDevName
            ]));

            expect(localStorageService.setCarriers).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                updatedDevName,
                secondOtherDevName
            ]));

            expect(localStorageService.setPairs).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                {devs: expect.toIncludeSameMembers([updatedDevName, firstOtherDevName])},
                {devs: expect.toIncludeSameMembers([secondOtherDevName, thirdOtherDevName])},
            ]));

            expect(localStorageService.setSticking).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                {devs: expect.toIncludeSameMembers([updatedDevName, firstOtherDevName])},
                {devs: expect.toIncludeSameMembers([secondOtherDevName, thirdOtherDevName])},
            ]));
        });

        it('should not update disabled devs when dev is not disabled', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                fourthOtherDevName,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                oldDevName,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([oldDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([oldDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.update(oldDevName, updatedDevName);

            expect(localStorageService.setDisabled).not.toHaveBeenCalled();
        });

        it('should not update carrying devs when dev is not carrying', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                fourthOtherDevName,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([oldDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([oldDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.update(oldDevName, updatedDevName);

            expect(localStorageService.setCarriers).not.toHaveBeenCalled();
        });

        it('should not update pairs when dev is not paired', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                firstOtherDevName,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([fourthOtherDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([oldDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.update(oldDevName, updatedDevName);

            expect(localStorageService.setPairs).not.toHaveBeenCalled();
        });

        it('should not update sticking pairs when dev is not sticking', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                oldDevName,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                firstOtherDevName,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([oldDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([fourthOtherDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.update(oldDevName, updatedDevName);

            expect(localStorageService.setSticking).not.toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        const devToDelete = faker.unique(faker.name.firstName);

        const firstOtherDevName = faker.unique(faker.name.firstName);
        const secondOtherDevName = faker.unique(faker.name.firstName);
        const thirdOtherDevName = faker.unique(faker.name.firstName);
        const fourthOtherDevName = faker.unique(faker.name.firstName);

        it('should remove dev name in every list that contains the dev name', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                devToDelete,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([devToDelete, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([devToDelete, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.delete(devToDelete);

            expect(localStorageService.setDevs).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            expect(localStorageService.setDisabled).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                firstOtherDevName
            ]));

            expect(localStorageService.setCarriers).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                secondOtherDevName
            ]));

            expect(localStorageService.setPairs).toHaveBeenCalledWith(expect.toIncludeSameMembers([
                {devs: expect.toIncludeSameMembers([firstOtherDevName])},
                {devs: expect.toIncludeSameMembers([secondOtherDevName, thirdOtherDevName])},
            ]));

            expect(localStorageService.setSticking).toHaveBeenCalledWith(expect.arrayContaining([
                {devs: expect.toIncludeSameMembers([firstOtherDevName])},
                {devs: expect.toIncludeSameMembers([secondOtherDevName, thirdOtherDevName])},
            ]));
        });

        it('should not update disabled devs when dev is not disabled', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                fourthOtherDevName,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                devToDelete,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([devToDelete, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([devToDelete, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.delete(devToDelete);

            expect(localStorageService.setDisabled).not.toHaveBeenCalled();
        });

        it('should not update carrying devs when dev is not carrying', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                fourthOtherDevName,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([devToDelete, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([devToDelete, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.delete(devToDelete);

            expect(localStorageService.setCarriers).not.toHaveBeenCalled();
        });

        it('should not update pairs when dev is not paired', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                firstOtherDevName,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([fourthOtherDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([devToDelete, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.delete(devToDelete);

            expect(localStorageService.setPairs).not.toHaveBeenCalled();
        });

        it('should not update sticking pairs when dev is not sticking', () => {

            localStorageService.getDevs.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName,
                secondOtherDevName,
                thirdOtherDevName,
                fourthOtherDevName
            ]));

            localStorageService.getDisabled.mockReturnValue(shuffle([
                devToDelete,
                firstOtherDevName
            ]));

            localStorageService.getCarriers.mockReturnValue(shuffle([
                firstOtherDevName,
                secondOtherDevName
            ]));

            localStorageService.getPairs.mockReturnValue(shuffle([
                {devs: shuffle([devToDelete, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            localStorageService.getSticking.mockReturnValue(shuffle([
                {devs: shuffle([fourthOtherDevName, firstOtherDevName])},
                {devs: shuffle([secondOtherDevName, thirdOtherDevName])}
            ]));

            devService.delete(devToDelete);

            expect(localStorageService.setSticking).not.toHaveBeenCalled();
        });
    });
});
