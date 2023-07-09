//other imports
const brain = require("brain.js");
//custom imports
var data2Png = require("./dataToNumberPic");
var objFileManager = require("./fileManager");

(async () => {
  console.log("ai training with brain.js");
  await loadAndTestModel();
})();

async function loadAndTestModel() {
  var oFileManager = new objFileManager();

  // Load the weights from the JSON file
  var json = await oFileManager.loadJsonFile("weights.json");

  // Create a new neural network instance
  const net = new brain.NeuralNetwork();
  //console.log(json);
  // Load the weights into the network
  net.fromJSON(json);

  // Load the test data
  await oFileManager.setupTrainData("test.csv");
  var testData = oFileManager.setupInputsTargets();

  const testInputs = testData[0];
  const testTargets = testData[1];

  let correct = 0;

  for (let i = 0; i < testInputs.length; i++) {
    const output = net.run(testInputs[i]);
    const predictedClass = output.indexOf(Math.max(...output));
    console.log(predictedClass);
  }
  //data2Png(testInputs[250], "test");
  // Run the model on the test data and compare the predictions to the actual values
  /*for (let i = 0; i < testInputs.length; i++) {
    const output = net.run(testInputs[i]);
    if (output[0] === testTargets[i][0]) {
      correct++;
    }
  }

  // Calculate and print the accuracy
  const accuracy = correct / testInputs.length;
  console.log(`Accuracy: ${accuracy}`);*/
}

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
    hiddenLayers: [32, 64, 32],
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
    learningRate: 0.01,
    iterations: 2000,
    activation: "sigmoid", // activation function
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
