import { Header } from "../componets/Header";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { Loader } from "../componets/Loader";

export function RootPage() {
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === "loading" && <Loader />}

      <div className="">
        <Header />
        <main className="app-root flex items-center justify-center py-10">
          <Outlet />
        </main>
      </div>
    </>
  );
}
