const fs = require("fs");
const readline = require("readline");

class objFileManager {
  trainData;

  async setupTrainData(fileLoc) {
    this.trainData = await this.parseCSV(fileLoc);
  }

  loadJsonFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }

  async processLineByLine() {
    const fileStream = fs.createReadStream("train.csv");

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let isFirstLine = true;

    for await (const line of rl) {
      // Skip the header line.
      if (isFirstLine) {
        isFirstLine = false;
        continue;
      }

      // Process the line.
      console.log(`Line from file: ${line}`);
    }
  }

  async parseCSV(fileName) {
    var input = await this.readFile(fileName);
    var rows = input.split("\n");
    return rows.map(function (row) {
      var columns = row.split(",");
      return columns.map(function (column) {
        if (!isNaN(column)) {
          return Number(column);
        } else {
          return column;
        }
      });
    });
  }

  readFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  setupInputsTargets() {
    var inputs = [
      /*[0, 0],
            [0, 1],
            [1, 0],
            [1, 1],*/
    ];

    var targets = [
      /*[0], [1], [1], [0]*/
    ];

    for (let i = 1; i < this.trainData.length; i++) {
      var tmpData = this.getItemFromTrain(i);
      //console.log(i1);
      inputs.push(tmpData[0]);
      targets.push([tmpData[1]]);
    }
    return [inputs, targets];
  }

  getItemFromTrain(numItemSelected) {
    var selectedNumber = this.trainData[numItemSelected][0];
    this.trainData[numItemSelected].shift();
    //console.log(trainData[1]);
    var getItem = this.trainData[numItemSelected];
    return [getItem, selectedNumber];
  }

  getMnistData(content) {
    var lines = content.toString().split("\n");

    var data = [];
    for (var i = 0; i < lines.length; i++) {
      var input = lines[i].split(",").map(Number);

      var output = Array.apply(null, Array(10)).map(
        Number.prototype.valueOf,
        0
      );
      output[input.shift()] = 1;

      data.push({
        input: input,
        output: output,
      });
    }

    return data;
  }

  saveJsonFile(fileName, json) {
    fs.writeFile(fileName, JSON.stringify(json), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("DONE - Saved results to file.");
    });
  }
}

module.exports = objFileManager;
