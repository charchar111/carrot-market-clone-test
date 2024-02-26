# Carrot Market

## Link
https://carrot-market-clone-test.vercel.app/

## 컨셉

이 프로젝트는 next js(page-router)를 이용한 풀스택 앱 제작 연습이 목적입니다.
주요 기술 스택은 다음과 같습니다.

- 스타일링

  - tailwind
  - JSX

- 데이터베이스

  - planet scale, prisma
    - SQL, 서버리스

- 지원 툴

  - typescript

- 기타
  - React 18버전 hook
    - server-side-streaming
    - server-components

프로젝트의 진행은 노마드 코더 \[풀스택\]캐럿마켓 클론코딩 2022버전에 기반하였습니다.

## 목차

[tailwind](#tailwind)

## 기능 구현

### tailwind ✅

- 각 페이지 구현
- 재사용 컴포넌트를 별도로 분할

### db ✅

- prisma, planetscale 사용

### authentication ✅

- 1차 인증

  - email, phone 선택

- 2차 인증
  - 1차 인증 주소로 토큰 발송, 입력
  - email: nodemailer
  - phone: twilio

### authorize ✅



- 유저의 로그인 성공 시, 세션에 유저 id 저장

  - iron- session 사용

- 유저의 로그인 여부 확인
  - SWR : 데이터 패치, 업데이트 기능, 리엑트 쿼리보다 가벼움
