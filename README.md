### Goodoc React Template

## 구성

* Next

* Atomic Design

* React

## 환경 설정 방법

1. Project Clone
```
git clone https://github.com/goodoc/goodoc-fe-template.git
```

2. Add dependency
```
yarn
# or
npm install
```

3. Run Project
```
npm run dev
# or
yarn dev
```

* 루트경로에 .env 파일을 만들어 환경변수를 정의해 주세요.
```
# 이건 Apollo 쿼리 테스트를 위해 샘플 GQL URL이에요.
API_BASE_URL=https://graphql-staging.smartclinic.me
```

* GraphQL Type gen
/codegen.yml 파일에 있는 schema 경로를 사용하시는 GraphQL API 경로로 수정해주세요.
```
yarn typegen
```