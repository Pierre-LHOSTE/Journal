import { useAppSelector } from "../../store";
import { Link } from "react-router-dom";

function DashboardPage() {
  const isLogged = useAppSelector((state) => state.auth.isLogged);

  return (
    <div>
      {isLogged ? (
        <>
          Dashboard
          <br />
          <Link to={"./new"}>Add new</Link>
        </>
      ) : (
        <>No connected</>
      )}
    </div>
  );
}

export default DashboardPage;
