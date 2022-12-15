import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { alarmDatasetState, goalDatasetState } from "../../store/atom";
import GoalCard from "./GoalCard";
import AlarmCard from "./AlarmCard";
import { AlarmDataInfo, GoalDataInfo } from "../../type/type";



function Alarm() {
  // 목표 데이터 가져오기
  const goalDataset = useRecoilValue(goalDatasetState);

  const goalCard = (data: GoalDataInfo) => {
    return <GoalCard data={data} />;
  };

  // 알람 데이터 가져오기
  const alarmDataset = useRecoilValue(alarmDatasetState);

  const alarmCard = (data: AlarmDataInfo) => {
    return <AlarmCard data={data} />;
  };

  return (
    <AlarmContainer>
      {goalDataset.map(goalCard)}
      {alarmDataset.map(alarmCard)}
    </AlarmContainer>
  );
}

// CSS
const AlarmContainer = styled.section`
  margin-top: 10px;
  @media screen and (min-width: 1200px) {
    display: flex;
    width: 100%;
  }
`;

export default Alarm;
