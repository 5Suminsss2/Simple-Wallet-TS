// 알람 데이터 타입
export interface AlarmDataInfo {
  id: string;
  accountType: string;
  year: string;
  month: string;
  date: string;
  alarmContents: string;
  price: number;
}

export type AlarmProps = {
  data: AlarmDataInfo;
};


// 목표 데이터 타입
export interface GoalDataInfo {
  startYear: string;
  startMonth: string;
  startDate: string;
  endYear: string;
  endMonth: string;
  endDate: string;
  goalContents: string;
  price: string;
  id: string;
}


// 거래 내역 데이터 타입
export interface AccountHistoryInfo {
  accountType: string;
  year: string;
  month: string;
  date: string;
  accountContents: string;
  price: number;
  id: number;
  category: string;
}

export type AccountHistoryProps = {
  dataset: AccountHistoryInfo[];
};