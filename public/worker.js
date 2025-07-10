// worker.js
self.onmessage = function (event) {
  console.log("Message received from main thread:", event.data);
  // Perform some heavy computation or task
  result = 0
  for (let i = 0; i < data.limit; i++) {
    result+=i   
  }

  self.postMessage({limit})
};
