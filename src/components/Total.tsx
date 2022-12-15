import styled from "styled-components";
import { useRecoilState } from "recoil";
import { totalState } from "../store/atom";
import { AccountHistoryInfo, AccountHistoryProps } from "../type/type";

function Total({ dataset }: AccountHistoryProps) {
  const [total, setTotal] = useRecoilState(totalState);
  let deposit = 0;
  let withDraw = 0;

  // 입출금 내역 데이터 계산
  dataset.map(function (element: AccountHistoryInfo) {
    if (element.accountType === "Deposit") {
      deposit += Number(element.price);
    } else {
      withDraw += Number(element.price);
    }
  });

  setTotal(deposit - withDraw);

  return (
    <TotalContainer>
      <TotalItem>
        <TotalTitle>Total</TotalTitle>
        <TotalAccount>{total.toLocaleString("ko-KR")} 원</TotalAccount>
      </TotalItem>
      <SeperateTotalContainer>
        <SeperateTotalItems>
          <SeperateTotalTitle>총 지출</SeperateTotalTitle>
          <SeperateTotalAccount>
            - {withDraw.toLocaleString("ko-KR")} 원
          </SeperateTotalAccount>
        </SeperateTotalItems>
        <SeperateTotalItems>
          <SeperateTotalTitle>총 입금</SeperateTotalTitle>
          <SeperateTotalAccount>
            + {deposit.toLocaleString("ko-KR")} 원
          </SeperateTotalAccount>
        </SeperateTotalItems>
      </SeperateTotalContainer>
    </TotalContainer>
  );
}

// CSS
const TotalContainer = styled.section`
  margin: 15px 0 0 0;
`;

const TotalItem = styled.div`
  width: 310px;
  height: 130px;
  margin-top: 20px;
  padding: 5px 30px;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(45deg, #98a8f0, #b09bf0);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  @media screen and (min-width: 1200px) {
    width: 17vw;
  }

  @media screen and (min-width: 1600px) {
    width: 250px;
  }
`;

const TotalTitle = styled.div`
  margin-top: 25px;
  font-size: 20px;
  font-weight: 700;
`;

const TotalAccount = styled.div`
  margin-top: 15px;
  font-size: 32px;
  font-weight: 700;
`;

const SeperateTotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`;

const SeperateTotalItems = styled.div`
  width: 42%;
  height: 60px;
  padding: 12px;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(45deg, #98a8f0, #b09bf0);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  @media screen and (min-width: 1200px) {
    &:first-child {
      margin-right: 15px;
    }
  }
`;

const SeperateTotalTitle = styled.div`
  font-size: 14px;
  margin: 3px 3px 7px 3px;
`;

const SeperateTotalAccount = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: 900;
`;

export default Total;
