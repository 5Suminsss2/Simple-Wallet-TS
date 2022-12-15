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

export type GoalProps = {
  data: GoalDataInfo;
};

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

export type AccountHistoryCardProps = {
  data: AccountHistoryInfo;
};


// 카테고리 데이터 타입
export interface CategoryInfo {
  id: number;
  label: string;
}

export interface CategoryChartDataInfo{
  id: number;
  category: string;
  total: number;
}