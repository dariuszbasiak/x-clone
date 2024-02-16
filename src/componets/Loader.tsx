export function Loader() {
  return (
    <>
      <div className="loader absolute flex items-center justify-center w-screen h-screen bg-slate-400 bg-opacity-50 ">
        <span className="animate-spin w-24 h-24 rounded-full border-2 border-b-gray-500 block"></span>
      </div>
    </>
  );
}
