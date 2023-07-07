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

  await oFileManager.setupTrainData("train.csv");
  var setupData = oFileManager.setupInputsTargets();

  const inputs = setupData[0];
  const targets = setupData[1];

  console.log("one sample from inputs");
  console.log(inputs[0]);

  console.log("one sample from targets");
  console.log(targets[0]);

  // Create a new neural network instance
  const net = new brain.NeuralNetwork({
    hiddenLayers: [20, 20],
  });

  // Prepare the training data
  const trainingData = inputs.map((input, index) => {
    return {
      input: input,
      output: targets[index],
    };
  });

  // Train the network
  await net.trainAsync(trainingData, {
    errorThresh: 0.025,
    log: true,
    logPeriod: 1,
    learningRate: 0.1,
  });

  var json = net.toJSON();
  oFileManager.saveJsonFile("weights.json", json);

  // You can now use the trained network
  const output = net.run(inputs[0]); // for example
  console.log(output);
}

async function trainNeuralNetwork1() {
  var oFileManager = new objFileManager();

  var data = await oFileManager.readFile("train.csv");
  var trainData = oFileManager.getMnistData(data);

  console.log(trainData);

  var net = new brain.NeuralNetwork({ hiddenLayers: [5, 5, 5] });

  await net.trainAsync(trainData, {
    log: true,
    learningRate: 0.1,
    iterations: 2000,
  });

  var json = net.toJSON();
  oFileManager.saveJsonFile("weights.json", json);

  // You can now use the trained network
  //const output = net.run(inputs[0]); // for example
  //console.log(output);
}
