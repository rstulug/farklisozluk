import { useNavigate } from "react-router-dom";
import Button from "./Button";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-xl font-bold">
      <h1>Böyle bir şey bulamadık. İstersen geri dön</h1>
      <Button
        type="alternative"
        size="regular"
        btnName="Geri git"
        onClick={() => navigate(-1)}
      ></Button>
    </div>
  );
}

export default PageNotFound;
