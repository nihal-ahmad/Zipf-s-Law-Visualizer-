"use strict";

$(".btncalc").click(function () {
  var text = $("#inputarea").val();
  var words = getWords(text);
  var wc = getWordCounts(words);
  var wcArr = sortWordCounts(wc);

  if (Array.isArray(wcArr) && wcArr.length) {} else {
    swal("Oh Snap", "Textarea Is Empty", "error");
  }

  printWordTable(wcArr);

  if (Array.isArray(wcArr) && wcArr.length) {
    generateChart(wcArr);
  }

  console.log(wcArr);
});
$(".btnreload").click(function () {
  location.reload(true);
});

function getWords(inputText) {
  var chars = inputText.split("");
  var newChars = [];
  chars.forEach(function (c) {
    switch (c) {
      case "'":
      case "\"":
      case ";":
      case ".":
      case ",":
      case "-":
      case "_":
      case "?":
      case ":":
        return;

      case "\n":
        newChars.push(" ");
        break;

      case " ":
        newChars.push(" ");
        break;

      case "  ":
        newChars.push(" ");
        break;

      default:
        newChars.push(c.toLowerCase());
    }
  });
  var newText = newChars.join("");
  var words = newText.split(" ");
  return words;
}

function getWordCounts(words) {
  var wordCounts = {};
  words.forEach(function (w) {
    if (wordCounts[w]) {
      wordCounts[w]++;
    } else {
      wordCounts[w] = 1;
    }
  });
  return wordCounts;
}

function sortWordCounts(wc) {
  var wcArr = [];
  Object.keys(wc).forEach(function (w) {
    if (w == "") return;
    wcArr.push({
      word: w,
      count: wc[w]
    });
  });
  return wcArr.sort(function (a, b) {
    return b.count - a.count;
  }).slice(0, 50);
}

function printWordTable(wcArr) {
  var table = $("#table");
  table.empty();

  if (Array.isArray(wcArr) && wcArr.length) {
    table.append($("<th>").append($("<tr>").html("<u>WORD</u>")).append($("<td>").html("<u>COUNT</u>")));
  }

  wcArr.forEach(function (wc) {
    table.append($("<th>").append($("<tr>").text(wc.word)).append($("<td>").text(wc.count)));
  });
}

function generateChart(wcArr) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: wcArr.map(function (wc) {
        return wc.word;
      }),
      datasets: [{
        label: "WORD FREQUENCY",
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: "red",
        borderWidth: 4,
        data: wcArr.map(function (wc) {
          return wc.count;
        })
      }]
    }
  });
}