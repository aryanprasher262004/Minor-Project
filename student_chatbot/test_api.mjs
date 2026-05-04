async function testApi(message) {
  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, userId: "tester", sessionId: "123" }),
    });
    const data = await res.json();
    console.log(`\nUser: "${message}"`);
    console.log(`Bot: "${data.reply}"`);
    console.log(`Intent detected: ${data.intent} (Confidence: ${data.confidence})`);
  } catch (err) {
    console.error("Failed to fetch from local API", err.message);
  }
}

async function runTests() {
  console.log("Testing API fallback (Wit might not be trained yet)...");
  await testApi("asdfghjkl");
  await testApi("when are exams starting");
}

runTests();
