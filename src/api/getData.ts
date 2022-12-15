import axios from "axios";

export const getAccountHistory = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/accountHistoryData`
  );
  return response.data;
};

export const getGoalData = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/goalData`);
  return response.data;
};

export const getAlarmData = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/alarmData`
  );
  return response.data;
};

export const getCategoryData = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/categoryData`
  );
  return response.data;
};

export const getCategoryChartData = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/categoryChartData`
  );
  return response.data;
};
