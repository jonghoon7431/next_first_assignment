<br/>

# NextJS 를 이용해 나만의 포켓몬 도감을 만들어 봅시다.

<br/>

### 필수 구현 사항

- App router 기반, typescript 사용, tailwindcss 사용을 베이스로 한 Nextjs 14 버전으로 프로젝트 구성 :white_check_mark:
- Layout : Metadata 설정, 전체 적용 UI 구현 :white_check_mark:
-  151번까지의 포켓몬 리스트를 보여주는 페이지를 구현 (클라이언트 컴포넌트) :white_check_mark:
-  특정 포켓몬의 디테일을 보여주는 페이지를 구현 (다이나믹 페이지 + 서버 컴포넌트) :white_check_mark:
-  next.js 기본 제공 <Image> 사용 :white_check_mark:
-  전체 코드에 적절한 타입 명시 :white_check_mark:

### 선택 구현 사항

- 151개의 데이터는 너무 방대합니다. tanstack query를 도입해 캐시 처리를 해봅시다 :white_check_mark:
- 디테일 페이지는 각기 다른 metadata title이 있으면 좋을 것 같습니다 :white_check_mark:
- 제공된 api handler에는 타입 추론이 많이 사용됩니다. axios에 적절한 타입을 지정해봅시다 :white_check_mark:
- api를 변경해 151개 이상의 데이터를 불러와봅시다
- 무한스크롤 or 페이지네이션을 구현해봅시다 :white_check_mark:
- 원하는 DB에 좋아하는 포켓몬들 등록하는 로직을 API HANDLER를 사용해 구현해봅시다

<br/>
<hr/>

### 페이지 미리보기

![1](https://github.com/jonghoon7431/next_first_assignment/assets/152875407/b737178b-e1f9-4606-a929-696c01138f0c)
![2](https://github.com/jonghoon7431/next_first_assignment/assets/152875407/53abfaec-8b30-4baa-83eb-c54c47ce2c9f)
