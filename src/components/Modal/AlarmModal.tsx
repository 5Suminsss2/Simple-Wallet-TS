import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { alarmDatasetState, alarmModalState } from "../../store/atom";
import GlobalModal from "./GlobalModal";


function AlarmModal() {
  const [deposit, setDeposit] = useState(true); // 입출금 버튼
  const [alarmOpen, setAlarmOpen] = useRecoilState(alarmModalState); // 알람 모달 상태값 가져오기
  const [dataset, setDataset] = useRecoilState(alarmDatasetState); // 기존 거래 내역

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
    accountType: string;
    year: string;
    month: string;
    date: string;
    alarmContents: string;
    price: number;
    id: string;
  }

  // 새 거래 내역
  const [inputs, setInputs] = useState<InputsInfo>({
    accountType: "deposit",
    year: "",
    month: "",
    date: "",
    alarmContents: "",
    price: 0,
    id: uuidv4(),
  });

  const { year, month, date, alarmContents, price } = inputs;


  // input 값 변화 시 동작하는 함수
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 입출금 버튼 눌렀을 때
  const handleDeposit = () => {
    setDeposit(!deposit);
  };

  // 새 거래내역 등록 버튼 눌렀을 때
  const handleSubmit = async () => {
    if (year.length < 1) {
      return alert("연도를 입력하세요");
    } else if (month.length < 1) {
      return alert("월을 입력하세요");
    } else if (date.length < 1) {
      return alert("일을 입력하세요");
    } else if (alarmContents.length < 1) {
      return alert("내용을 입력하세요");
    } else if (price < 1) {
      return alert("금액을 입력하세요");
    }

    // 데이터 2개까지만 입력 제한
    if (dataset.length < 2) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/alarmData`, inputs)
        .then((res) => {
          // 등록 즉시 화면에 반영될 수 있도록 설정
          setDataset([inputs, ...dataset]);

          // input 값 초기화
          setInputs({
            accountType: "Deposit",
            year: "",
            month: "",
            date: "",
            alarmContents: "",
            price: 0,
            id: "",
          });
          setDeposit(true);
          setAlarmOpen(false);
        });
    } else {
      alert("알람 설정은 2개까지 가능합니다.");
    }
  };

  // 새 거래내역 닫기 버튼 눌렀을 때
  const handleCancel = () => {
    if (alarmOpen === true) {
      setAlarmOpen(false);
    }
  };

  useEffect(() => {
    // 출입금 버튼 눌렀을 때 거래내역 업데이트
    if (deposit === true) {
      setInputs({
        ...inputs,
        ["accountType"]: "Deposit",
      });
    } else {
      setInputs({
        ...inputs,
        ["accountType"]: "Withdraw",
      });
    }
  }, [deposit]);

  return (
    <GlobalModal title="알람 설정" icon="alarm">
      <form onSubmit={handleSubmit}>
        <Label>날짜</Label>
        <DateInputBox>
          <DateInput
            placeholder="2023"
            name="year"
            value={year}
            onChange={onChange}
            type="number"
            min="2015"
            max="2100"
          />
          <DateInput
            placeholder="1"
            name="month"
            value={month}
            onChange={onChange}
            type="number"
            min="1"
            max="12"
          />
          <DateInput
            placeholder="1"
            name="date"
            value={date}
            onChange={onChange}
            type="number"
            min="1"
            max="31"
          />
        </DateInputBox>
        <Label>내용</Label>
        {deposit === true ? (
          <ContentButtonBox>
            <ContentButton onClick={handleDeposit} color="#D9D9D9" disabled>
              입금
            </ContentButton>
            <ContentButton onClick={handleDeposit}>출금</ContentButton>
          </ContentButtonBox>
        ) : (
          <ContentButtonBox>
            <ContentButton onClick={handleDeposit}>입금</ContentButton>
            <ContentButton onClick={handleDeposit} color="#D9D9D9" disabled>
              출금
            </ContentButton>
          </ContentButtonBox>
        )}
        <Input
          placeholder="페퍼로니 피자 1판"
          marginBottom="10px"
          name="alarmContents"
          value={alarmContents}
          onChange={onChange}
        />
        <br />
        <Label>금액</Label>
        <Input
          type="number"
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
const ContentButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 40px;
  margin: 5px 0 10px 0;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  background-color: ${(props: {color: string}) => props.color || "#fff"};
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
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
const ModalButton = styled.button`
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

export default AlarmModal;
