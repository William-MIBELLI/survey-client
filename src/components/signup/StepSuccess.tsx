import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const StepSuccess = () => {

  const [timer, setTimer] = useState<number>(5)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(previous => previous - 1)
    }, 1000)
    if (timer <= 0) {
      navigate('/')
    }
    return () => clearInterval(interval)
  },[timer])
  return (
    <div className="w-full my-auto flex flex-col items-center justify-center">
      <div className="flex font-semibold items-center">
        Congrats ! You' re now register on
        <p className="text-orange-500 text-lg font-bold mx-2">Qrafter</p>
      </div>
      <p className="text-xs text-gray-400">
        You will be redirect on {timer}
      </p>
    </div>
  );
};

export default StepSuccess