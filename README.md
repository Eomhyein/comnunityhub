# 게시판 프로젝트 API 명세서
|기능|API URL|Method|
|------|---|---|
|회원 가입|localhost:3018/api/sign-up|POST|
|로그인|localhost:3018/api/sign-in|POST||
|사용자 조회|localhost:3018/api/users|GET|
|사용자 정보 변경|localhost:3018/api/users|PATCH|
|게시글 생성|localhost:3018/api/posts|POST|
|게시글 목록 조회|localhost:3018/api/posts|GET|
|게시글 상세 조회|localhost:3018/api/posts/:postId|GET|
|댓글 생성|localhost:3018/api/posts/:postId/comments|POST|
|댓글 조회|localhost:3018/api/posts/:postId/comments|GET|

### [회원가입]
|기능|API URL|Method|
|------|---|---|
|회원 가입|localhost:3018/api/sign-up|POST|

## **👉 Request**</br>
**[예시]**
<pre><code>{
  "email": "archepro84@gmail.com",
  "password": "4321aaaa",
  "name": "이용우",
  "age": 30,
  "gender": "MALE",
  "profileImage": "https://prismalens.vercel.app/header/logo-dark.svg"
}
</code></pre>


## **👈 Response**</br>
**[Body]**

**[정의]**
|이름|타입|설명|
|------|---|---|
|email|string|이메일|
|password|string|비밀번호|
|name|string|이름|
|age|number|나이|
|gender|string |성별|
|profileImage|string|이미지주소|

**[예시]**
<pre><code>{
  "message": "회원가입이 완료되었습니다."
}
</code></pre>


### [로그인]
|기능|API URL|Method|
|------|---|---|
|로그인|localhost:3018/api/sign-in|POST|


## **👉 Request**</br>
**[예시]**
<pre><code>{
  {
  "email":"archepro84@gmail.com",
  "password":"4321aaaa"
}
}
</code></pre>

## **👈 Response**</br>
**[예시]**
<pre><code>{
  "message": "로그인 성공"
}
</code></pre>

**[Header]**
**[예시]**
<pre><code>{
  “authorization”: “Bearer eyJhbGciOiJIUzI1NiIsIn…”
}
</code></pre>


### [사용자 조회]
|기능|API URL|Method|
|------|---|---|
|사용자 조회|localhost:3018/api/users|GET|

## **👉 Request**</br>
**[Header]**
**[예시]**
<pre><code>{
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTA1NTc5OH0.2bM9s-Vv312rgkRzQiWLy4ASa0lWk5TOEGlEvNOa67k'
}</code></pre>


## **👈 Response**</br>
**[정의]**
|이름|타입|설명|
|------|---|---|
|email|string|이메일|
|password|string|비밀번호|

|name|string|이름|
|age|number|나이|
|gender|string |성별|
|profileImage|string|이미지주소|

**[예시]**
<pre><code>{
  "data": {
    "userId": 1,
    "email": "archepro84@gmail.com",
    "createdAt": "2024-01-03T13:57:48.058Z",
    "updatedAt": "2024-01-03T13:57:48.058Z",
    "userInfos": {
      "name": "이용우",
      "age": 30,
      "gender": "MALE",
      "profileImage": "https://prismalens.vercel.app/header/logo-dark.svg"
    }
  }
}
</code></pre>