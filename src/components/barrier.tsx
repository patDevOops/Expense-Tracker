// Generic props let each caller keep its own state type (boolean, ID, or category).
export function Barrier<T>({ a, b, c }: { a: T; b: string; c: (value: T) => void }) {
  return (
    <>
      {a && (
        <div
          className={b}
          onClick={() => {
            // false is the existing close value for every Barrier use; this cast is type-only.
            c(false as T);
          }}
        ></div>
      )}
    </>
  );
}
