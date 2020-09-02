// Main.js

// Calculates word frequency and draw corresponding chart
$(".btncalc").click(() => {
  let text = $("#inputarea").val();
  let words = getWords(text);
  let wc = getWordCounts(words);
  let wcArr = sortWordCounts(wc);
  if (Array.isArray(wcArr) && wcArr.length) {
  } else {
    swal("Oh Snap!", "Textarea Is Empty", "error");
  }
  // printWordTable(wcArr);
  if (Array.isArray(wcArr) && wcArr.length) {
    generateChart(wcArr);
  }
  console.log(wcArr);
});

// This button reloads the Browser
$(".btnreload").click(() => {
  location.reload(true);
});

// This function get words from the input and removes identation and put all words in another array
function getWords(inputText) {
  let chars = inputText.split("");
  let newChars = [];
  chars.forEach((c) => {
    switch (c) {
      case `'`:
      case `"`:
      case `;`:
      case `.`:
      case `,`:
      case `-`:
      case `_`:
      case `?`:
      case `:`:
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
  let newText = newChars.join("");
  let words = newText.split(" ");
  return words;
}

// This function counts word frequency
function getWordCounts(words) {
  let wordCounts = {};
  words.forEach((w) => {
    if (wordCounts[w]) {
      wordCounts[w]++;
    } else {
      wordCounts[w] = 1;
    }
  });
  return wordCounts;
}

// This function sorts words array in descending order
function sortWordCounts(wc) {
  let wcArr = [];
  Object.keys(wc).forEach((w) => {
    if (w == "") return;
    wcArr.push({
      word: w,
      count: wc[w],
    });
  });
  return wcArr.sort((a, b) => b.count - a.count).slice(0, 50);
}

// This function generate Chart
function generateChart(wcArr) {
  let ctx = document.getElementById("myChart").getContext("2d");
  Chart.defaults.scale.gridLines.display = false;
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: wcArr.map((wc) => wc.word),

      datasets: [
        {
          label: "WORD FREQUENCY",

          // borderColor: "#F55172",
          borderColor: "#EAFCA5",
          borderWidth: 3,

          data: wcArr.map((wc) => wc.count),
          pointBorderWidth: 3,
          pointStyle: "circle",
        },
      ],
    },
    options: {
      responsive: true,
      // maintainAspectRatio: false,
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: "white",
          boxWidth: 12,
          fontSize: 15,
          usePointStyle: true,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        yAxes: [
          {
            ticks: { fontColor: "white", fontSize: 15 },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "white",
              fontSize: 15,
            },
          },
        ],
      },
    },
  });
}

// This function print word frequnecy in tabular format - commented out in newer website version
// function printWordTable(wcArr) {
//   let table = $("#table");
//   table.empty();
//   if (Array.isArray(wcArr) && wcArr.length) {
//     table.append(
//       $("<th>")
//         .append($("<tr>").html("<u>WORD</u>"))
//         .append($("<td>").html("<u>COUNT</u>"))
//     );
//   }

//   wcArr.forEach((wc) => {
//     table.append(
//       $("<th>").append($("<tr>").text(wc.word)).append($("<td>").text(wc.count))
//     );
//   });
// }
