import "../styles/UserDashboard.css";
import "../styles/BrandFonts.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  activityData,
  activityOptions,
  stadisticsData,
  stadisticsOptions,
} from "../utils/Data";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { Bubble, PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

function UserDashboard() {
  let { userData } = useContext(UserContext);
  return (
    <div className="user-dashboard">
      <div className="header">
        <h2 className="brand-font">
          {userData.name} {userData.surname}
        </h2>
        <p>
          {userData.read.length === 1
            ? ` ${userData.read.length} book read`
            : ` ${userData.read.length} books read`}
        </p>
        <div className="img"></div>
        <span className="avatar brand-font">{userData.name[0]}</span>
      </div>
      <div className="content">
        <section className="activity">
          <h3 className="title">Recent activity</h3>
          <div className="chart">
            <Bubble
              id="activityChart"
              data={activityData(userData)}
              options={activityOptions()}
            />
          </div>
        </section>
        {
          <section className="bookmark">
            <h3 className="title">My stadistics</h3>
            <div className="chart">
              <PolarArea
                id="stadisticsChart"
                data={stadisticsData(userData)}
                options={stadisticsOptions}
              />
            </div>
          </section>
        }
      </div>
    </div>
  );
}
export default UserDashboard;
