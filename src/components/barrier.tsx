export function Barrier({ a, b, c }:{a:boolean|null;b:string;c:(a:boolean)=>void}) {
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
