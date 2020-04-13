# Info

- Back-end : Node.js
- API : GraphQL
- ORM : Prisma 2.0.0-beta.2

---

# 문제 해결

- Passport
  > 1차로 express-serve-static-core에서 `Request와 User`가 빈 interface로 생성되고,
  >
  > 2차로 Passport에서 `Request`에 `user?: User <-- express.user`를 덮어쓴다.
  >
  > **typeRoots**로 모듈에 직접 접근해서 **Prisma/client**의 **User Interface**를 넣어봤는데
  >
  > req.user?. 를 타이핑하면 Prisma/client의 User가 자동완성은 되나 id는 찾을 수 없음.
  >
  > **해결**
  >
  >     const { id } = req.user as User(Prisma/client의 User)
  >
  > 이렇게 하면 정상적으롤 실행이 된다. (Passport에 types를 설치하면 문제가 생기는 것 같다)
