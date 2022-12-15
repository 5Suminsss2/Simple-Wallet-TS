import styled from "styled-components";
import { AiFillBell, AiOutlineClose } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { alarmDatasetState } from "../../store/atom";
import axios from "axios";
import { AlarmDataInfo, AlarmProps } from "../../type/type";



function AlarmCard({ data }: AlarmProps) {
  const [dataset, setDataset] = useRecoilState(alarmDatasetState); // 기존 알람 내역

  // 목표 알림 제거하기
  const handleRemove = async (id: number) => {
    let filtered = dataset.filter((element: object) => element !== data);

    await axios.delete(`${process.env.REACT_APP_API_URL}/alarmData/${id}`).then(
      (res) => {
        // 삭제 버튼 누르는 즉시 새로고침 없이 등록
        setDataset(filtered);
      }
    );
  };

  // 디데이 계산기
  const dDay = (data: AlarmDataInfo) => {
    let today = new Date();
    let dday = new Date(
      Number(data.year),
      Number(data.month) - 1,
      Number(data.date)
    );
    let gap = dday.getTime() - today.getTime();
    let result = Math.ceil(gap / (1000 * 60 * 60 * 24));
    return result;
  };

  return (
    <AlarmItems>
      <AlarmItemsContents>
        <AiFillBell size="15" color="#98a8f0" />
        {dDay(data) === 0 ? (
          <AlarmText>'{data.alarmContents}' 당일 입니다!</AlarmText>
        ) : dDay(data) > 0 ? (
          <AlarmText>
            '{data.alarmContents}'까지 {dDay(data)}일 남았습니다.
          </AlarmText>
        ) : (
          <AlarmText>
            '{data.alarmContents}' 알림은 지난지 오래입니다.
          </AlarmText>
        )}
      </AlarmItemsContents>
      <AlarmItemsclose
        type="button"
        onClick={() => {
          handleRemove(Number(data.id));
        }}
      >
        <AiOutlineClose />
      </AlarmItemsclose>
    </AlarmItems>
  );
}

// CSS
const AlarmItemsclose = styled.div`
  display: flex;
  position: relative;
  right: -20px;
  width: 10px;
  transition: 0.3s;
  cursor: pointer;
`;
const AlarmItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 350px;
  padding: 3px 8px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  overflow: hidden;
  &:hover ${AlarmItemsclose} {
    transition: 0.3s;
    right: 10px;
  }
  @media screen and (min-width: 1200px) {
    margin-right: 10px;
    flex-wrap: wrap;
    padding: 5px 8px;
  }
`;

const AlarmItemsContents = styled.div`
  display: flex;
  @media screen and (min-width: 1200px) {
    width: 90%;
  }
`;

const AlarmText = styled.div`
  margin-left: 5px;
  font-size: 13px;
`;

export default AlarmCard;
