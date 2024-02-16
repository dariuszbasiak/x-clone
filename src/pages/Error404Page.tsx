import { Header } from "../componets/Header";

export function Error404Page() {
  return (
    <div className="column is-centered">
      <Header />
      <div className="error-sign size-full h-dvh flex items-center justify-center flex-wrap flex-col">
        <h1 className="text-8xl">404</h1>
        <h4 className="text-2xl">Page not exist!</h4>
      </div>
    </div>
  );
}
