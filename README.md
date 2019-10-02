# __게임 프로그래밍 기획서__


### __타겟 게임__: SNAKE
> 간단한 Snake 게임을 만들고 기능을 추가 할 예정.
> 따라한 소스코드: https://www.youtube.com/watch?v=21eSpMtJwrc

### __프로젝트 마감일__: 2019/10/23

### __사용언어__: HTML5, JavaScript.

### __추가할 기능__
  * ~~타이틀 화면 추가~~
  * ~~꼬리 줄이는 아이템 추가~~
    * ~~일정 시간이 지나면 사라짐~~
  * ~~게임 오버 후 하이스코어 표시~~
  * ~~하드모드 추가~~
    * ~~일정 시간동안 먹이를 먹지 않을시 게임오버~~
    * ~~일정량의 먹이를 먹으면 똥을 누며 그 자리에 접촉하면 게임오버~~

### __추가 및 개선, 변경된 기능__
  * 개선: 진행방향과 반대되는 input 무시
  * 개선: 인게임 현재 스코어 위치변경
  * 변경: Map 밖으로 갈 시 게임오버로 변경
  * 추가: 키 입력 컨트롤러 버퍼추가
  * 개선: 기존 pickLocation 함수 개선 ( 스폰된 과일과 다른 오브젝트의 위치가 동일한 경우 )
  * 개선: Canvas 중앙배치
  * 추가: 꼬리 드라데이션
  * 개선: Map 캔버스 디자인 개선
    * '디자인' 참고: https://www.youtube.com/watch?v=pxBW6FZglrI
  * 추가: 꼬리 줄이는 아이템 추가
    * 일정 시간이 지나면 사라짐 - 하드모드
  * 추가: 모드별 하이스코어 표시
  * 추가: 결과화면 추가
  * 추가: 타이틀 화면 추가
  * 개선: 타일 기반 Map으로 사용자가 원하는 Map 크기 선택가능
  * 개선: 노멀모드 기능
    * 일정 시간동안 먹이를 먹지 않을시 게임오버
    * 일정한 배수의 과일을 먹으면 게임속도 증가
  * 추가: 하드모드 추가
    * 일정량의 먹이를 먹으면 똥을 누며 그 자리에 접촉하면 게임오버
  * 추가: BGM, SFX 추가
    * HARD MODE BGM: https://ko.audioblocks.com/stock-audio/r3-93022.html
    * NORMAL MODE BGM: https://ko.audioblocks.com/stock-audio/gibiduk-93002.html
    * TITLE BGM: https://ko.audioblocks.com/stock-audio/upstream-93031.html
    * RESULT BGM: https://ko.audioblocks.com/stock-audio/isberg-93006.html 
    * SFX: 본인제작, 사용 VSTI: Bleep'
  * 개선: 객체지향 스러운 코딩
    * getter, setter
    * js의 분리

  
-----------------
