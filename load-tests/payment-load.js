const autocannon = require("autocannon");

const instance = autocannon(
  {
    url: "http://localhost:3000/payments",
    connections: 20,
    duration: 20,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": `load-test-${Date.now()}`,
    },
    body: JSON.stringify({
      senderAccountId: "00000000-0000-0000-0000-000000000000",
      receiverAccountId: "00000000-0000-0000-0000-000000000001",
      amount: 1,
      currency: "INR",
    }),
  },
  finishedBenchmark
);

autocannon.track(instance);

function finishedBenchmark(err, result) {
  if (err) {
    console.error(err);
    return;
  }

}