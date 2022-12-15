// atom.js
import { atom } from "recoil";
import {
  getAccountHistory,
  getAlarmData,
  getCategoryChartData,
  getCategoryData,
  getGoalData,
} from "../api/getData";

//데이터 내역 불러오기
const accountHistoryData = getAccountHistory();
const goalData = getGoalData();
const alarmData = getAlarmData();
const categoryData = getCategoryData();
const categoryChartData = getCategoryChartData();

// 알람 모달
let alarmModalState = atom({
  key: "alarmModal",
  default: false,
});

// 목표 모달
let goalModalState = atom({
  key: "goalModal",
  default: false,
});

// 카테고리 추가 모달
let categoryModalState = atom({
  key: "categoryModal",
  default: false,
});

//입출금 내역
let datasetState = atom({
  key: "dataset",
  default: accountHistoryData,
});

// 목표 데이터
let goalDatasetState = atom({
  key: "goalDataset",
  default: goalData,
});

// 알람 데이터
let alarmDatasetState = atom({
  key: "alarmDataset",
  default: alarmData,
});

// 총 금액 데이터
let totalState = atom({
  key: "totalState",
  default: 0,
});

// 카테고리 데이터
let categoryDatasetState = atom({
  key: "categoryDataset",
  default: categoryData,
});

// 카테고리 chart 데이터
let categoryChartDatasetState = atom({
  key: "categoryChartDataset",
  default: categoryChartData,
});

export {
  alarmModalState,
  goalModalState,
  categoryModalState,
  datasetState,
  goalDatasetState,
  alarmDatasetState,
  totalState,
  categoryDatasetState,
  categoryChartDatasetState,
};
