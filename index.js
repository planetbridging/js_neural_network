const tf = require("@tensorflow/tfjs-node-gpu");
const mnist = require("mnist");
const fs = require("fs");
//custom imports
var data2Png = require("./dataToNumberPic");
var objFileManager = require("./fileManager");

//tf
const { training, test } = mnist.set(8000, 2000);

// Prepare the training data
const trainingImages = training.map((datum) => datum.input);
const trainingLabels = training.map((datum) => datum.output);

// Prepare the test data
const testImages = test.map((datum) => datum.input);
const testLabels = test.map((datum) => datum.output);

const modelPath = "file://./my-model/model.json";

(async () => {
  console.log("ai training with tf");
  loadAndTest();
})();

async function train() {
  const { training, test } = mnist.set(8000, 2000);

  // Prepare the training data
  const trainingImages = training.map((datum) => datum.input);
  const trainingLabels = training.map((datum) => datum.output);

  const model = tf.sequential();

  model.add(
    tf.layers.dense({ units: 32, activation: "relu", inputShape: [784] })
  );
  model.add(tf.layers.dense({ units: 10, activation: "softmax" }));

  model.compile({
    optimizer: "adam",
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  await model.fit(tf.tensor2d(trainingImages), tf.tensor2d(trainingLabels), {
    epochs: 5,
    callbacks: {
      onEpochEnd: (epoch, logs) =>
        console.log(
          `Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`
        ),
    },
  });

  // Save the model
  await model.save("file://./my-model");

  return model;
}

async function loadAndTest() {
  let model;

  // Check if the model exists
  if (fs.existsSync("./my-model/model.json")) {
    // Load the model
    model = await tf.loadLayersModel(modelPath);

    // Check if the model is compiled
    if (!model.isCompiled) {
      console.log("Model was not compiled. Compiling now...");
      model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
      });
    }
  } else {
    // Train a new model
    model = await train();
  }

  const result = model.evaluate(
    tf.tensor2d(testImages),
    tf.tensor2d(testLabels),
    { batchSize: 32 }
  );
  console.log(`Test set accuracy: ${result[1].dataSync()[0]}`);
}
