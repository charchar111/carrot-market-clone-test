# Carrot Market

## Link
https://carrot-market-clone-test.vercel.app/

## 컨셉
당근 마켓에서 영감을 받은 이 프로젝트는 유저가 
- 개인 중고 상품의 거래
- 게시판 기반의 지역 커뮤니티
- 라이브 커머스
를 통합하여 할 수 있도록 하였습니다.

특히 유저의 지역 정보를 이용하여 동일 지역 유저 간의 상호작용에 중점을 둘 생각입니다.

## 기능
- [2차 인증(email, 휴대폰 메시지) 기반의 로그인](#인증)
- ISR 방식의 데이터 게시(중고상품, 게시글)
  - 수동 페이지네이션 방식의 데이터 인덱싱
 
- geolocation api를 이용해 저장한 위치 정보를 유저 간 상호 작용에 이용
 

## 기술 스택

### nextJS
<details>
<summary> 왜 CRA(create-react-app)가 아닌 nextJS인가 </summary>

#### SEO
- seo는 nextJS의 ssr을 이용하여 얻을 수 있는 분명한 이점입니다. 하지만, 그걸로는 SPA의 이점을 버리기에 합당하지 않습니다. react-helmet과 react-snap이 있다면 크롤러에게 충분히 사이트 메타 정보를 노출하면서 SPA를 사용할 수 있기 때문입니다.
  
#### pre-rendering을 통한 초기 렌더링 속도 향상, 유저 경험 개선
- nextJS를 선택한 가장 큰 이유는 초기 렌더링 속도 향상을 통해 유저의 사이트 이탈을 막을 수 있다는 점입니다.  

#### 유지보수
- nextJS는 디렉토리를 기반으로 page 라우트를 설정가능합니다. 이는 SPA에서 라우팅에 사용하는 react-router-dom에 비해 설정이 간편합니다.

  </details>

### tailwind
nextJS를 이용해서 빌드 단계나 서버 사이드 렌더링을 할 계획이라면, css-in-js는 이런 계획에 맞지 않습니다. 
왜냐하면 css-in-js는 브라우저 단계에서 렌더링되는 데 드는 속도의 문제 등으로 초기 렌더링에 좋지 못한 영향을 줄 수 있기 때문입니다.
또한 유지보수의 관점에서도 tailwind는 클래스를 이용하여 직관적인 스타일링이 가능합니다.
단, 해결해야할 문제도 있었습니다.

- [tailwindCSS 사용 중 마주쳤던 문제](#이슈\n\|\n해결방안)

### 데이터베이스
- planet scale, prisma

- 데이터 요청 라이브러리
  - SWR | 리엑트 쿼리보다 가벼워 초기 렌더링 속도 향상
 
- typescript


## 기능 세부사항

### 인증
- 유저가 인증 수단으로 email, phone 중 선택
- 1차 인증 주소로 발송된 토큰을 입력하여 인증
  - email 인증 기술 스택: nodemailer
  - phone 인증 기술 스택: twilio

### authorize
- 인증 성공 시, 유저 id를 담은 암호화된 쿠키 저장
  - iron- session | 쿠키를 암호화하는 라이브러리

## 이슈 | 해결방안



## 배운 점

