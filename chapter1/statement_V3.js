const fs = require("fs");
const invoice = JSON.parse(fs.readFileSync("invoices.json", "utf8"));
const plays = JSON.parse(fs.readFileSync("plays.json", "utf8"));
const createStatementData = require("./createStatementData.js");

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}
function renderPlainText(data, plays) {
  let result = `청구 내용(고객명:${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)}(${perf.audience}석)\n`;
  }
  result += `총액 : ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}

console.log(statement(invoice, plays));
