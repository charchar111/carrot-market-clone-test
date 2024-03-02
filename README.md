# Carrot Market

## Link
https://carrot-market-clone-test.vercel.app/

## 컨셉
당근 마켓에서 영감을 받은 이 프로젝트는 유저가 
- 개인 중고 상품의 거래
- 게시판 기반의 지역 커뮤니티
- 라이브 커머스
를 통합하여 할 수 있도록 하였습니다.

특히 지역 기반의 유저 간 상호작용을 위해 유저의 지역 정보를 이용합니다.

## 기능
- [2차 인증(email, 휴대폰 메시지) 기반의 로그인](#인증)
- 


## 기술 스택

nextJS
<details>
<summary> 왜 CRA(create-react-app)가 아닌 nextJS인가 </summary>

sfsfsf
  </details>





### tailwind









### 데이터베이스
planet scale, prisma
    - SQL, 서버리스

- typescript


## 기능 세부사항

### authentication ✅
- 유저가 인증 수단으로 email, phone 중 선택
- 1차 인증 주소로 발송된 토큰을 입력하여 인증
  - email 인증 기술 스택: nodemailer
  - phone 인증 기술 스택: twilio

### authorize ✅



- 유저의 로그인 성공 시, 세션에 유저 id 저장

  - iron- session 사용

- 유저의 로그인 여부 확인
  - SWR : 데이터 패치, 업데이트 기능, 리엑트 쿼리보다 가벼움
