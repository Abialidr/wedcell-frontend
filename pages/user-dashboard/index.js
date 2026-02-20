import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { useRouter } from "next/router";
import PlanningTools from "./PlanningTools";

const UserDashboard = () => {
  const router = useRouter();
  const globleuser = useSelector(selectUser);
  const direction = router.query.direction;
  useEffect(() => {
    globleuser && !globleuser.success && router.push("/");
  }, []);
  return <PlanningTools direction={direction}></PlanningTools>;
};

export default UserDashboard;
