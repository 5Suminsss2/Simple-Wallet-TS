import styled from "styled-components";
import { articleDataInfo } from "../../type/type";

type ArticleProps = {
  article: articleDataInfo; // 부모 컴포넌트에서 import 해온 타입을 재사용
};

function NewsItems({ article }: ArticleProps) {
  const { title, url, urlToImage } = article;
  return (
    <Container href={url}>
      <img src={urlToImage} />
      <NewsContents>
        <div>{title}</div>
      </NewsContents>
    </Container>
  );
}

const Container = styled.a`
  display: flex;
  justify-content: center;
  height: 60px;
  width: 90%;
  padding: 10px 20px 10px 10px;
  margin-top: 10px;
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px,
    rgb(60 64 67 / 15%) 0px 2px 6px 2px;
  text-decoration: none;
  color: #000;
  overflow: hidden;
`;

const NewsContents = styled.div`
  margin-left: 20px;
  font-size: 13px;
  overflow: hidden;
  line-height: 130%;
`;

export default NewsItems;
