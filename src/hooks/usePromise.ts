// react를 다루는 기술 참조
// 코드 해석 : https://velog.io/@soonmac/React-News-API%EB%A5%BC-%EC%97%B0%EB%8F%99%ED%95%98%EC%97%AC-%EB%89%B4%EC%8A%A4-%EB%B7%B0%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0

import { useState, useEffect } from "react";

// promiseCreator : promise를 만들어주는 함수, 데이터를 가져오는 함수(axios,fetch)가 들어가야한다.
// deps: 의존배열 (이 코드에선 틀을 잡기 위해 임시로 사용)

export default function usePromise(promiseCreator: () => Promise<any>, deps: any[]) {
  // 로딩중 / 완료 / 실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e: any) {
        setError(e);
      }
      setLoading(false);
    };
    process();
  }, deps);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return [loading, resolved, error];
}
