import { arraysAreEqual } from "./lulz";

export function replaceIfExists<T>(array: T[], oldValue: T, newValue: T): T[] {
    const arrayIndex = array.indexOf(oldValue);

    if (arrayIndex < 0) {
        return null;
    }

    array[array.indexOf(oldValue)] = newValue;
    return array;
}

export function removeIfExists<T>(array: T[], value: T) {
    let splicedArray = [...array];
    splicedArray.splice(array.indexOf(value), 1);

    if (splicedArray.length === array.length) {
        return null;
    }

    return splicedArray;
}