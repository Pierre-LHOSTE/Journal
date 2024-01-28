import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";

function DashboardPage() {
  const isLogged = useAppSelector((state) => state.auth.isLogged);

  return (
    <div>
      {isLogged ? (
        <>
          <Link to={"./articles"}>Articles</Link>
          <br />
          <Link to={"./authors"}>Auteurs</Link>
        </>
      ) : (
        <>No connected</>
      )}
    </div>
  );
}

export default DashboardPage;
