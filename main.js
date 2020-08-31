$(".btncalc").click(() => {
  let text = $("#inputarea").val();
  let words = getWords(text);
  let wc = getWordCounts(words);
  let wcArr = sortWordCounts(wc);
  if (Array.isArray(wcArr) && wcArr.length) {
  } else {
    swal("Oh Snap!", "Textarea Is Empty", "error");
  }

  printWordTable(wcArr);
  if (Array.isArray(wcArr) && wcArr.length) {
    generateChart(wcArr);
  }
  console.log(wcArr);
});
$(".btnreload").click(() => {
  location.reload(true);
});
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
function printWordTable(wcArr) {
  let table = $("#table");
  table.empty();
  if (Array.isArray(wcArr) && wcArr.length) {
    table.append(
      $("<th>")
        .append($("<tr>").html("<u>WORD</u>"))
        .append($("<td>").html("<u>COUNT</u>"))
    );
  }

  wcArr.forEach((wc) => {
    table.append(
      $("<th>").append($("<tr>").text(wc.word)).append($("<td>").text(wc.count))
    );
  });
}
function generateChart(wcArr) {
  let ctx = document.getElementById("myChart").getContext("2d");

  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: wcArr.map((wc) => wc.word),
      datasets: [
        {
          label: "WORD FREQUENCY",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: "red",
          borderWidth: 4,
          data: wcArr.map((wc) => wc.count),
        },
      ],
    },
  });
}
