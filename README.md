# MNIST Digit Classifier with TensorFlow.js

This repository contains a simple implementation of a digit classifier for the MNIST dataset using TensorFlow.js.

## Overview

The script trains a neural network on the MNIST dataset, which is a large database of handwritten digits commonly used for training and testing in the field of machine learning. The trained model is then used to classify the digits in the test set of the MNIST dataset.

## Dependencies

This project requires the following npm packages:

- `@tensorflow/tfjs-node-gpu`: This is the TensorFlow.js Node.js binding for TensorFlow, with GPU support.
- `mnist`: This package provides the MNIST dataset for training and testing.
- `fs`: This is a built-in Node.js package for file system operations.

Additionally, this project uses two custom modules:

- `dataToNumberPic`: This module is used to convert the data to a number picture.
- `fileManager`: This module is used for file management operations.

## How to Run

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.
4. Run `node index.js` to start the script.

The script will first check if a pre-trained model exists in the `./my-model` directory. If a model exists, it will be loaded and used for digit classification. If a model does not exist, the script will train a new model on the MNIST dataset and save it to the `./my-model` directory.

After the model is loaded or trained, it will be used to classify the digits in the test set of the MNIST dataset. The accuracy of the model on the test set will be printed to the console.

## Model Architecture

The neural network model used in this script is a simple feedforward neural network (also known as a multilayer perceptron) with the following architecture:

- Input layer: 784 neurons (corresponding to the 28x28 pixel images in the MNIST dataset)
- Hidden layer: 32 neurons with ReLU activation
- Output layer: 10 neurons with softmax activation (corresponding to the 10 digit classes)

The model is trained using the Adam optimizer and the categorical crossentropy loss function. The accuracy of the model on the training data is also tracked during training.

## License

This project is open source and available under the [MIT License](LICENSE).
