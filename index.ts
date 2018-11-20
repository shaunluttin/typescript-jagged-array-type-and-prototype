type JaggedArrayItem<T> = T | JaggedArray<T>;

interface JaggedArray<T> extends Array<JaggedArrayItem<T>> { }

type FlatArray<T> = T extends JaggedArrayItem<infer U> ? U[] : T;

interface Array<T> {
  flat(this: JaggedArray<T>): FlatArray<T>;
}

Array.prototype.flat = function () {
  return this.reduce(
    (arr, val) => Array.isArray(val)
      ? arr.concat(val.flat())
      : arr.concat(val),
    []);
};

// Test

const myRecursiveArray: JaggedArray<number> = [
  10,
  [9],
  [
    [8],
    [
      [7],
    ]
  ],
];

const flattened: number[] = myRecursiveArray.flat();

// TODO surface an error for union type array items.
const flattenedToo: (string | number)[] = [1, 'two'].flat();
