import { AiFillStar, AiFillBell } from "react-icons/ai";
import styled from "styled-components";
import { alarmModalState, goalModalState } from "../store/atom";
import { useSetRecoilState } from "recoil";

function Title() {
  // 알람 모달 창
  const openAlarmModalHandler = useSetRecoilState(alarmModalState); // 값만 변경 시키기
  const openAlarmModal = () => {
    openAlarmModalHandler(true);
  };

  // 목표 모달 창
  const openGoalModalHandler = useSetRecoilState(goalModalState); // 값만 변경 시키기
  const openGoalModal = () => {
    openGoalModalHandler(true);
  };

  return (
    <TitleContainer>
      <TitlePart>Simple Wallet</TitlePart>
      <IconPart>
        <IconItem onClick={openGoalModal}>
          <AiFillStar size="15" color="#98A8F0" />
        </IconItem>
        <IconItem onClick={openAlarmModal}>
          <AiFillBell size="15" color="#98A8F0" />
        </IconItem>
      </IconPart>
    </TitleContainer>
  );
}

// CSS
const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const TitlePart = styled.div`
  margin-left: 130px;
  font-size: 20px;
  font-family: "Abril Fatface", cursive;
  @media screen and (min-width: 1200px) {
    margin-left: 0px;
    font-size: 20px;
    font-family: "Abril Fatface", cursive;
  }
`;

const IconPart = styled.div`
  display: flex;
`;

const IconItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  &:hover {
    border: 1px solid #d9d9d9;
    box-shadow: none;
  }
`;

export default Title;
