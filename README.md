#5.29 (수)
- 게시판 프로젝트 사용자 조회부처 에러 발생!
- 백업차 업로드 함 
- 에러 잡고 수정 필요 
- 인썸미아에서 확인도 해야됨 


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


### [사용자 정보 변경]
|기능|API URL|Method|
|------|---|---|
|사용자 정보 변경|localhost:3018/api/users|PATCH|

## **👉 Request**</br>
**[Body]**
<pre><code>{
  "name": "김범수",
  "age": 32,
  "gender": "MALE",
  "profileImage": "https://labs.mysql.com/common/logos/mysql-logo.svg?v2"
}</code></pre>

**[Header]**
**[예시]**
<pre><code>{
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTA1NTc5OH0.2bM9s-Vv312rgkRzQiWLy4ASa0lWk5TOEGlEvNOa67k'
}</code></pre>

## **👈 Response**</br>
**[Body]**
<pre><code>{
  "message": "사용자 정보 변경에 성공하였습니다."
}</code></pre>

**[error]**
# 403 Cookie가 존재하지 않을 경우
{"errorMessage": "로그인이 필요한 기능입니다."}
# 403 Cookie가 비정상적이거나 만료된 경우
{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
# 412 body 데이터가 정상적으로 전달되지 않는 경우
{"errorMessage": "데이터 형식이 올바르지 않습니다."}
# 412 Title의 형식이 비정상적인 경우
{"errorMessage": "게시글 제목의 형식이 일치하지 않습니다."}
# 412 Content의 형식이 비정상적인 경우
{"errorMessage": "게시글 내용의 형식이 일치하지 않습니다."}
# 401 게시글 수정이 실패한 경우
{"errorMessage": "게시글이 정상적으로 수정되지 않았습니다.”}
# 400 예외 케이스에서 처리하지 못한 에러
{"errorMessage": "게시글 수정에 실패하였습니다."}


### [게시글 생성]
|기능|API URL|Method|
|------|---|---|
|게시글 생성|localhost:3018/api/posts|POST|

## **👉 Request**</br>
**[Body]**
<pre><code>{
  "title": "타이틀입니다.",
  "content": "내용입니다."
}</code></pre>

**[Header]**
**[예시]**
<pre><code>{
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTA1NTc5OH0.2bM9s-Vv312rgkRzQiWLy4ASa0lWk5TOEGlEvNOa67k'
}</code></pre>

## **👈 Response**</br>
**[Body]**
<pre><code>{
  "data": {
    "postId": 1,
    "userId": 1,
    "title": "타이틀입니다.",
    "content": "내용입니다.",
    "createdAt": "2024-01-03T13:58:59.693Z",
    "updatedAt": "2024-01-03T13:58:59.693Z"
  }
}</code></pre>

**[error]**
# 403 Cookie가 존재하지 않을 경우
{"errorMessage": "로그인이 필요한 기능입니다."}
# 403 Cookie가 비정상적이거나 만료된 경우
{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
# 412 body 데이터가 정상적으로 전달되지 않는 경우
{"errorMessage": "데이터 형식이 올바르지 않습니다."}
# 412 Title의 형식이 비정상적인 경우
{"errorMessage": "게시글 제목의 형식이 일치하지 않습니다."}
# 412 Content의 형식이 비정상적인 경우
{"errorMessage": "게시글 내용의 형식이 일치하지 않습니다."}
# 401 게시글 수정이 실패한 경우
{"errorMessage": "게시글이 정상적으로 수정되지 않았습니다.”}
# 400 예외 케이스에서 처리하지 못한 에러
{"errorMessage": "게시글 수정에 실패하였습니다."}


### [게시글 목록 조회]
|기능|API URL|Method|
|------|---|---|
|게시글 목록 조회|localhost:3018/api/posts|GET|

## **👉 Request**</br>
**[Header]**
**[예시]**
<pre><code>{
  
}</code></pre>

## **👈 Response**</br>
**[Body]**
<pre><code>{
  "data": [
    {
      "postId": 2,
      "title": "2번째 타이틀입니다.",
      "createdAt": "2024-01-03T14:00:33.365Z",
      "updatedAt": "2024-01-03T14:00:33.365Z"
    },
    {
      "postId": 1,
      "title": "타이틀입니다.",
      "createdAt": "2024-01-03T13:58:59.693Z",
      "updatedAt": "2024-01-03T13:58:59.693Z"
    }
  ]
}</code></pre>

**[error]**
# 400 예외 케이스에서 처리하지 못한 에러
{"errorMessage": "게시글 조회에 실패하였습니다."}


### [게시글 상세 조회]
|기능|API URL|Method|
|------|---|---|
|게시글 상세 조회|localhost:3018/api/posts/:postId|GET|

## **👉 Request**</br>
**[Body]**
**[예시]**
<pre><code>{
  
}</code></pre>


## **👈 Response**</br>
**[예시]**
<pre><code>{
  "data": {
    "postId": 1,
    "title": "타이틀입니다.",
    "content": "내용입니다.",
    "createdAt": "2024-01-03T13:58:59.693Z",
    "updatedAt": "2024-01-03T13:58:59.693Z"
  }
}</code></pre>

**[error]**
# 400 예외 케이스에서 처리하지 못한 에러
{"errorMessage": "게시글 조회에 실패하였습니다."}


### [댓글 생성]
|기능|API URL|Method|
|------|---|---|
|댓글 조회|localhost:3018/api/posts/:postId/comments|POST|

## **👉 Request**</br>
**[Body]**
**[예시]**
<pre><code>{
  "content": "댓글입니다."
}</code></pre>

**[Header]**
**[예시]**
<pre><code>{
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTA1NTc5OH0.2bM9s-Vv312rgkRzQiWLy4ASa0lWk5TOEGlEvNOa67k'
}</code></pre>


## **👈 Response**</br>
**[Body]**
<pre><code>{
  "data": {
    "commentId": 1,
    "postId": 2,
    "userId": 1,
    "content": "댓글입니다.",
    "createdAt": "2024-01-03T14:01:06.294Z",
    "updatedAt": "2024-01-03T14:01:06.294Z"
  }
}</code></pre>

**[error]**
# 412 해당하는 유저가 존재하지 않는 경우
{"errorMessage": "닉네임 또는 패스워드를 확인해주세요."}
# 400 예외 케이스에서 처리하지 못한 에러
{"errorMessage": "로그인에 실패하였습니다."}


### [댓글 조회]
|기능|API URL|Method|
|------|---|---|
|댓글 조회|localhost:3018/api/posts/:postId/comments|POST|

## **👉 Request**</br>
**[Body]**
**[예시]**
<pre><code>{
  
}</code></pre>


## **👈 Response**</br>
**[Body]**
<pre><code>{
  "data": [
    {
      "commentId": 2,
      "postId": 2,
      "userId": 1,
      "content": "댓글입니다.",
      "createdAt": "2024-01-03T14:01:22.869Z",
      "updatedAt": "2024-01-03T14:01:22.869Z"
    },
    {
      "commentId": 1,
      "postId": 2,
      "userId": 1,
      "content": "댓글입니다.",
      "createdAt": "2024-01-03T14:01:06.294Z",
      "updatedAt": "2024-01-03T14:01:06.294Z"
    }
  ]
}</code></pre>

**[error]**
# 412 body 데이터가 정상적으로 전달되지 않는 경우
{"errorMessage": "데이터 형식이 올바르지 않습니다."}
# 412 Title의 형식이 비정상적인 경우
{"errorMessage": "게시글 제목의 형식이 일치하지 않습니다."}
# 412 Content의 형식이 비정상적인 경우
{"errorMessage": "게시글 내용의 형식이 일치하지 않습니다."}
# 403 Cookie가 존재하지 않을 경우
{"errorMessage": "로그인이 필요한 기능입니다."}
# 403 Cookie가 비정상적이거나 만료된 경우
{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
# 400 예외 케이스에서 처리하지 못한 에러
{"errorMessage": "게시글 작성에 실패하였습니다."}

