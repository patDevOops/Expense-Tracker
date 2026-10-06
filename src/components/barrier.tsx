export function Barrier({ a, b, c }) {
  return (
    <>
      {a && (
        <div
          className={b}
          onClick={() => {
            c(false);
          }}
        ></div>
      )}
    </>
  );
}
