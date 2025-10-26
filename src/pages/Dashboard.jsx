// Dashboard.jsx
import React from "react";
import { motion } from "framer-motion"; // <-- Import Framer Motion
import "../stylesheets/dashboard.css";
import WarningIcon from "@mui/icons-material/WarningAmber";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowUpwardIcon from "@mui/icons-material/Moving";
import MonthlyReportTrendChart from '../components/MonthlyReportTrendChart';
import UserDetailsTable from "../components/UserDetailsTable";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.2 
    } 
  },
};

const Dashboard = () => {
  return (
    <motion.div 
      className="overall-dashboard"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.p 
        className="dashboard-hello-title"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
      >
        Good Morning, Bharanidharan R
      </motion.p>

      <motion.p 
        className="dashboard-hello-desc"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }}
      >
        Dashboard Overview - Real-time infrastructure anomaly monitoring for Coimbatore.
      </motion.p>

      <motion.div className="cards-container" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="dashboard-card-container" variants={cardVariants}>
          <p className="dashboard-card-header">Active<br/> Anomalies</p>
          <div className="dashboard-card-content">
            <WarningIcon style={{ color: "#1A73E8", fontSize: "48px" }} />
            <p className="dashboard-card-content-desc">3</p>
          </div>
        </motion.div>

        <motion.div className="dashboard-card-container" variants={cardVariants}>
          <p className="dashboard-card-header">In <br />Progress</p>
          <div className="dashboard-card-content">
            <ScheduleIcon style={{ color: "#1A73E8", fontSize: "48px" }} />
            <p className="dashboard-card-content-desc">1</p>
          </div>
        </motion.div>

        <motion.div className="dashboard-card-container" variants={cardVariants}>
          <p className="dashboard-card-header">Resolved this month</p>
          <div className="dashboard-card-content">
            <CheckCircleOutlineIcon style={{ color: "#1A73E8", fontSize: "48px" }} />
            <p className="dashboard-card-content-desc">2</p>
          </div>
        </motion.div>

        <motion.div className="dashboard-card-container" variants={cardVariants}>
          <p className="dashboard-card-header">Total<br />Reports</p>
          <div className="dashboard-card-content">
            <ArrowUpwardIcon style={{ color: "#1A73E8", fontSize: "48px" }} />
            <p className="dashboard-card-content-desc">5</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.8 } }}
      >
        <MonthlyReportTrendChart/>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, delay: 1 } }}
      >
        <UserDetailsTable/>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
