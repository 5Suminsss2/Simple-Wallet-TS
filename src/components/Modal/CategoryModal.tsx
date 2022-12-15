import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryDatasetState, categoryModalState } from "../../store/atom";
import { Header, HeaderTitle, Modal, ModalContainer, ModalContents } from "./GlobalModal";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { ModalButton } from "./GoalModal";

function CategoryModal() {
  const [categoryOpen, setCategoryOpen] = useRecoilState(categoryModalState); // 카테고리 모달 상태값 가져오기
  const [dataset, setDataset] = useRecoilState(categoryDatasetState); // 기존 거래 내역

  // 새 거래 내역
  const [inputs, setInputs] = useState({});

  // 카테고리 추가 버튼 클릭 시
  const addCategory = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/categoryData`, inputs)
      .then((res) => {
        // 등록 즉시 화면에 반영될 수 있도록 설정
        setDataset([inputs, ...dataset]);
        setCategoryOpen(false);
      });
  };

  // 카테고리 input 창 값 변화 시
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ [name]: value });
  };

  // 카테고리 모달 닫기
  const handleCancel = () => {
    setCategoryOpen(false);
  };

  return (
    <Modal display={categoryOpen ? "flex" : "none"}>
      <ModalContainer height="150px">
        <Header>
          <HeaderTitle>카테고리 추가</HeaderTitle>
        </Header>
        <ModalContents>
          <Input
            name="label"
            onChange={onChange}
            placeholder="추가하고 싶은 카테고리를 입력하세요"
          ></Input>
        </ModalContents>
        <ButtonContainer>
          <ModalButton backgroundColor="#fff" onClick={addCategory}>
            추가
          </ModalButton>
          <ModalButton backgroundColor="#d9d9d9" onClick={handleCancel}>
            닫기
          </ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
}

const Input = styled.input`
    width: 95%;
    height: 30px;
    border: none;
    border-radius: 5px;
    padding-left: 15px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 15px;

    // 추가 버튼
    button {
        margin-right: 10px;
    }
`

export default CategoryModal;