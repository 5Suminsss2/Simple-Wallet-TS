import styled from "styled-components";
import { AiFillStar, AiFillBell } from "react-icons/ai";
import { alarmModalState, goalModalState } from "../../store/atom";
import { useRecoilValue } from "recoil";

// props 타입 설정
interface GlobalModalProps {
  title: string;
  children: React.ReactNode;
  icon: string;
}

function GlobalModal({ title, children, icon }: GlobalModalProps) {
  // 알람 모달, 목표 모달 각각 상태값 가져오기
  const alarmOpen = useRecoilValue(alarmModalState);
  const goalOpen = useRecoilValue(goalModalState);

  return (
    <Modal display={alarmOpen || goalOpen ? "flex" : "none"}>
      <ModalContainer>
        <Header>
          {icon === "alarm" ? (
            <AiFillBell size="15" color="#AFBBF3" />
          ) : (
            <AiFillStar size="15" color="#AFBBF3" />
          )}
          <HeaderTitle>{title}</HeaderTitle>
        </Header>
        <ModalContents>{children}</ModalContents>
      </ModalContainer>
    </Modal>
  );
}

//CSS
export const Modal = styled.div`
  display: ${(props: { display: string }) => props.display};
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`

export const ModalContainer = styled.section`
  width: 360px;
  height: ${(props: { height: string }) => props.height || "45%" };
  margin: 0 auto;
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
  animation: modal-show 0.3s;
`
export const Header = styled.header`
    display: flex;
    align-items: center;
    margin: 10px 0;
`

export const HeaderTitle = styled.div`
    font-weight: 700;
    margin-left: 5px;
`

export const ModalContents = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  background: linear-gradient(45deg, #98a8f0, #b09bf0);
`
export default GlobalModal;
