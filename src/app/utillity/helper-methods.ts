export function replaceIfExists<T>(array: T[], oldValue: T, newValue: T): T[] {
    const arrayIndex = array.indexOf(oldValue);

    if (arrayIndex < 0) {
        return null;
    }

    array[array.indexOf(oldValue)] = newValue;
    return array;
}
