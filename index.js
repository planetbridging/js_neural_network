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
}
