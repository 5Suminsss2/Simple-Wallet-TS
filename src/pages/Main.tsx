import { useRecoilValue } from "recoil";
import { alarmModalState, categoryModalState, datasetState, goalModalState } from "../store/atom";
import styled from "styled-components";
import Title from "../components/Title";
import Alarm from "../components/Alarm/Alarm";
import Total from "../components/Total";
import GraphAccount from "../components/Chart/GraphAccount";
import AccountHistory from "../components/AccountHistory/AccountHistory";
import CreateAccountHistory from "../components/CreateAccountHistory";
import AlarmModal from "../components/Modal/AlarmModal";
import GoalModal from "../components/Modal/GoalModal";

function Main () {
  // 알람 모달, 목표 모달, 카테고리 추가 모달 현재 상태값 가져오기
  const currentAlarmState = useRecoilValue(alarmModalState); // 읽기 전용
  const currentGoalState = useRecoilValue(goalModalState); // 읽기 전용
  const currentCategoryState = useRecoilValue(categoryModalState); // 읽기 전용

  // 데이터
  const dataset = useRecoilValue(datasetState);

  // CSS
  const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 380px;
    margin: 30px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

    @media screen and (min-width: 1200px) {
      width: 80vw;
      height: 83vh;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 40px;
    }

    @media screen and (min-width: 1600px) {
      width: 1200px;
      height: 83vh;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 40px;
    }
  `;

  const ToatalAndGraph = styled.section`
    @media screen and (min-width: 1200px) {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  `;

  const AccountHistoryContainer = styled.section`
    @media screen and (min-width: 1200px) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;


  return (
    <Wrapper>
      <Title />
      <Alarm />
      <ToatalAndGraph>
        <Total dataset={dataset} />
        <GraphAccount dataset={dataset} />
        {/* <NewsContainer /> */}
      </ToatalAndGraph>
      <AccountHistoryContainer>
        <AccountHistory dataset={dataset} />
        <CreateAccountHistory />
      </AccountHistoryContainer>
      {currentAlarmState ? <AlarmModal /> : null}
      {currentGoalState ? <GoalModal /> : null}
      {/* {currentCategoryState ? <CategoryModal /> : null} */}
    </Wrapper>
  );
}

export default Main;