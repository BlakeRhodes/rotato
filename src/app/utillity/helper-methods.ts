export function replaceIfExists<T>(array: T[], oldValue: T, newValue: T): T[] {
    const arrayIndex = array.indexOf(oldValue);

    if (arrayIndex < 0) {
        return null;
    }

    array[array.indexOf(oldValue)] = newValue;
    return array;
}

export function removeIfExists<T>(array: T[], value: T): T[] {
    const arrayIndex = array.indexOf(value);

    if (arrayIndex < 0) {
        return null;
    }

    const splicedArray = [...array];
    splicedArray.splice(array.indexOf(value), 1);
    return splicedArray;
}
