# 리펙토링

## 1장

- 1.1 레거시 코드
- 1.2 레거시 코드를 본 소감
  1. '지저분하다'만 가지고 굳이 리팩터링할 이유가 있을까?
  2. 보기 좋아야 수정할 부분을 찾기 쉽고, 버그를 찾기 쉽다
  3. 프로그램 작동 방식을 알기 쉽도록 리팩터링하자! -> 새로운 기능을 추가하기도 쉬워진다
  4. 언젠가는 변경이 불가결하다. 이를 항상 대비할 수 있도록 명료한 설계가 선행되게 하자
- 1.3 리팩터링 첫 단계
  1. 리펙터링의 첫 단계는 테스트 코드부터!
  2. 테스트 코드는 자가진단이 가능하도록(초록/빨강으로 한 눈에 알 수 있도록)
- 1.4 statement() 함수 쪼개기
- 1.5
- 1.6
- 1.7
- 1.8 다형성을 활용해 계산 코드 재구성하기
  1. 조건부 로직을 다형성으로 바꾸기
     - 상속 계층부터 정의 -> 다형성을 적용해 조건부 로직 수정
     ```javascript
     function amountFor(aPerformance) {
       let thisAmount = 0;
       switch (aPerformance.play.type) {
         case "tragedy":
           thisAmount = 40000;
           if (aPerformance.audience > 30) {
             thisAmount += 1000 * (aPerformance.audience - 30);
           }
           break;
         case "comedy":
           thisAmount = 30000;
           if (aPerformance.audience > 20) {
             thisAmount += 10000 + 500 * (aPerformance.audience - 20);
           }
           thisAmount += 300 * aPerformance.audience;
           break;
         default:
           throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
       }
       return thisAmount;
     }
     ```
