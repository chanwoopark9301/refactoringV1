function statement(invoice, plays) {
  let result = `청구 내용(고객명:${invoice[0].customer})\n`;

  for (let perf of invoice[0].performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))}(${
      perf.audience
    }석)\n`;
  }
  result += `총액 : ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
function totalAmount() {
  let result = 0;
  for (let perf of invoice[0].performances) {
    result += amountFor(perf);
  }
  return result;
}
function totalVolumeCredits() {
  let volumeCredits = 0;
  for (let perf of invoice[0].performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
  return volumeCredits;
}
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
function amountFor(aPerformance) {
  let thisAmount = 0;
  switch (playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
  }
  return thisAmount;
}

function volumeCreditsFor(aPerformance) {
  let volumeCredits = 0;
  volumeCredits += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" == playFor(aPerformance).type)
    volumeCredits += Math.floor(aPerformance.audience / 5);
  return volumeCredits;
}

const invoice = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
];

const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

console.log(statement(invoice, plays));
