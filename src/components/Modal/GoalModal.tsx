import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import GlobalModal from "./GlobalModal";
import { goalModalState, goalDatasetState } from "../../store/atom";
import axios from "axios";


function GoalModal() {
  // 목표 모달 각각 상태값 가져오기
  const [goalOpen, setGoalOpen] = useRecoilState(goalModalState);
  // 기존 거래 내역
  const [dataset, setDataset] = useRecoilState(goalDatasetState);

  // 무작위 id 생성
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  // inputsInfo 타입 설정
  interface InputsInfo {
    startYear: string;
    startMonth: string;
    startDate: string;
    endYear: string;
    endMonth: string;
    endDate: string;
    goalContents: string,
    price: number,
    id: string,
  }

  // 새 거래 내역
  const [inputs, setInputs] = useState<InputsInfo>({
    startYear: "",
    startMonth: "",
    startDate: "",
    endYear: "",
    endMonth: "",
    endDate: "",
    goalContents: "",
    price: 0,
    id: uuidv4(),
  });

  const {
    startYear,
    startMonth,
    startDate,
    endYear,
    endMonth,
    endDate,
    goalContents,
    price,
  } = inputs;

  // 닫기 버튼 눌렀을 때
  const handleCancel = () => {
    if (goalOpen === true) {
      setGoalOpen(false);
    }
  };

  // input 값 변화했을 때 동작하는 함수
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 새 거래내역 등록 버튼 눌렀을 때
  const handleSubmit = async () => {
    // 입력값 확인
    if (startYear.length < 1) {
      return alert("시작 연도를 입력하세요");
    } else if (startMonth.length < 1) {
      return alert("시작 월을 입력하세요");
    } else if (startDate.length < 1) {
      return alert("시작 일을 입력하세요");
    } else if (endYear.length < 1) {
      return alert("종료 연도를 입력하세요");
    } else if (endMonth.length < 1) {
      return alert("종료 월을 입력하세요");
    } else if (endDate.length < 1) {
      return alert("종료 일을 입력하세요");
    } else if (goalContents.length < 1) {
      return alert("내용을 입력하세요");
    } else if (price < 1) {
      return alert("금액을 입력하세요");
    }

    if (dataset.length < 2) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/goalData`, inputs)
        .then((res) => {
          // 등록 즉시 화면에 반영될 수 있도록 설정
          setDataset([inputs, ...dataset]);

          // input 값 초기화
          setInputs({
            startYear: "",
            startMonth: "",
            startDate: "",
            endYear: "",
            endMonth: "",
            endDate: "",
            goalContents: "",
            price: 0,
            id:""
          });
          setGoalOpen(false);
        });
    } else {
      alert("목표 알림 설정은 2개까지 가능합니다.");
    }
  };

  return (
    <GlobalModal title="목표 설정" icon="goal">
      <form onSubmit={handleSubmit}>
        <Label>시작 날짜</Label>
        <DateInputBox>
          <DateInput
            placeholder="2023"
            name="startYear"
            value={startYear}
            onChange={onChange}
            type="number"
            min="2015"
            max="2100"
          />
          <DateInput
            placeholder="1"
            name="startMonth"
            value={startMonth}
            onChange={onChange}
            type="number"
            min="1"
            max="12"
          />
          <DateInput
            placeholder="1"
            name="startDate"
            value={startDate}
            onChange={onChange}
            type="number"
            min="1"
            max="31"
          />
        </DateInputBox>
        <Label>목표 날짜</Label>
        <DateInputBox>
          <DateInput
            placeholder="2023"
            name="endYear"
            value={endYear}
            onChange={onChange}
            type="number"
            min="2015"
            max="2100"
          />
          <DateInput
            placeholder="2"
            name="endMonth"
            value={endMonth}
            onChange={onChange}
            type="number"
            min="1"
            max="12"
          />
          <DateInput
            placeholder="1"
            name="endDate"
            value={endDate}
            onChange={onChange}
            type="number"
            min="1"
            max="31"
          />
        </DateInputBox>
        <Label>목표 내용</Label>
        <Input
          placeholder="페퍼로니 피자 1판"
          marginTop="5px"
          marginBottom="10px"
          name="goalContents"
          value={goalContents}
          onChange={onChange}
        />
        <br />
        <Label>금액</Label>
        <Input
          placeholder="15,000"
          marginTop="5px"
          name="price"
          value={price === 0 ? null : price}
          onChange={onChange}
        />
      </form>
      <ModalButtonContainer>
        <ModalButton
          marginRight="10px"
          backgroundColor="#fff"
          onClick={handleSubmit}
        >
          등록
        </ModalButton>
        <ModalButton
          marginRight="10px"
          backgroundColor="#d9d9d9"
          onClick={handleCancel}
        >
          닫기
        </ModalButton>
      </ModalButtonContainer>
    </GlobalModal>
  );
}


// CSS
const Label = styled.label`
  color: #fff;
  font-weight: 700;
  font-size: 14px;
`;
const DateInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 340px;
  margin: 5px 0 10px 0;
`;
const DateInput = styled.input`
  width: 28%;
  height: 30px;
  border-radius: 10px;
  border: none;
  padding-left: 10px;
`;
const Input = styled.input`
  width: 330px;
  height: 40px;
  border-radius: 10px;
  border: none;
  padding-left: 10px;
  margin-top: ${(props: {marginTop: string}) => props.marginTop || 0};
  margin-bottom: ${(props: {marginBottom: string}) => props.marginBottom || 0};
`;
const ModalButtonContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;
export const ModalButton = styled.button`
  width: 80px;
  height: 35px;
  margin-right: ${(props: {marginRight: string}) => props.marginRight};
  background-color: ${(props: {backgroundColor: string}) => props.backgroundColor};
  border: none;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;

export default GoalModal;
