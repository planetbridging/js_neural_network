//other imports
const brain = require("brain.js");
//custom imports
var data2Png = require("./dataToNumberPic");
var objFileManager = require("./fileManager");

(async () => {
  console.log("ai training with brain.js");
  await trainNeuralNetwork();
})();

async function trainNeuralNetwork() {
  var oFileManager = new objFileManager();

  var data = await oFileManager.readFile("train.csv");
  var trainData = oFileManager.getMnistData(data);

  var net = new brain.NeuralNetwork({ hiddenLayers: [784, 392, 196] });

  net.trainAsync(trainData, {
    errorThresh: 0.045,
    log: true,
    logPeriod: 1,
    learningRate: 0.1,
    iterations: 2000,
  });

  var json = net.toJSON();
  oFileManager.saveJsonFile("weights.json", json);

  // You can now use the trained network
  //const output = net.run(inputs[0]); // for example
  //console.log(output);
}
