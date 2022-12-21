// react를 다루는 기술 참조

import axios from "axios";
import styled from "styled-components";
import usePromise from "../../hooks/usePromise";
import { articleDataInfo } from "../../type/type";
import NewsItems from "./NewsItems";

function NewsContainer() {
  // promise로 response 되기에 데이터를 받아오려면 비동기로 처리해야함 -> usePromise 사용
  const [loading, response, error]: any = usePromise(() => {
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );
  }, []);

  // 대기중일 때
  if (loading) {
    return <Container>Loading...</Container>;
  }
  // 아직 response 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }

  // 에러가 발생했을 때
  if (error) {
    return <Container>에러 발생!</Container>;
  }

  // response 값이 유효할 때
  const { articles } = response.data;

  return (
    <Container>
      <Title>오늘의 경제 뉴스</Title>
      <Contents>
        {articles.map((article: articleDataInfo) => (
          <NewsItems key={article.url} article={article} />
        ))}
      </Contents>
    </Container>
  );
}

//CSS
const Container = styled.div`
  height: 200px;
  width: 340px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px,
    rgb(60 64 67 / 15%) 0px 2px 6px 2px;
  margin-top: 30px;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ab9df0;
    border-radius: 10px;
    box-shadow: inset 0px 0px 1px white;
  }
  @media screen and (min-width: 1200px) {
    margin-top: 35px;
    margin-left: 30px;
    height: 222px;
    width: 30%;
    padding: 15px 5px 15px 15px;
  }
`;

const Title = styled.div`
  color: #2b2b2b;
  font-weight: 700;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default NewsContainer;
