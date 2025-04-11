# NewSummarize

## Label
* feat: 새로운 기능 추가(개발)
* fix: 버그 수정
* design: 사용자 ui 디자인 변경
* refactor: 코드 리펙토링
* comment: 주석을 추가하거나 변경한 경우
* docs: 문서 수저
* test: 테스트코드 추가, 변경, 리펙토링 등을 한 경우 (프로덕션 코드 변경 X)
* setting: 패키지 설치, 개발 설정
* rename: 파일 또는 폴더명을 수정하거나 옮기는 경우
* remove: 파일을 삭제하는 작업만 했을 경우

## Branch Name
"label/요약 내용"형식으로 작성
ex) feat/start-screen

## Code
* 클래스명: 명사 또는 명사구로 작성
* 메소드명: 동사 또는 동사구로 작성

## 패키지 설명
* 아직 없음

## GitHub 협업 규칙
* 작업 내용 push 할 때 꼭 카톡 공유!
* 작업 순서
  1. 새로운 브랜치 생성 및 이동 => git checkout -b 브랜치 이름
  2. 코드 작업하기
  3. 작업 후 커밋하기 => git add . / git commit -m 작업 내용 요약
  4. 브랜치 푸시하기 => git push origin 브랜치 이름
  5. Pull Request 하기 => 깃허브 들어와서 Pull Request 버튼 누른 후 자세한 작업 내용 작성
  6. Merge 후 master 최신으로 업데이트 => git chekout master / git pull origin master
