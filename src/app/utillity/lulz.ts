export function shuffle(array): any[] {
  let j;
  let x;
  let i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}

export function notFound(index: number): boolean{
  return index === -1;
}

export function delay(ms: number): Promise<unknown> {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

export function arraysAreEqual(a: any[], b: any[] ): boolean
{
  if (a.length !== b.length) {
    return false;
  }
  else
  {
    for (const value of a) {
      if (!b.includes(value)) {
        return false;
      }
    }
    return true;
  }
}
