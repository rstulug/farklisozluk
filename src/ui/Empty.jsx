import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Empty({ message }) {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-xl font-bold">
      <span>{message}</span>
      <Button
        type="alternative"
        size="regular"
        btnName="Geri git"
        onClick={() => navigate(-1)}
      ></Button>
    </div>
  );
}

export default Empty;
