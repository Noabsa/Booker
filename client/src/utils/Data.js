//FUNCTIONS SUPPORT

Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

function getOpacity(index) {
  let r = 1 || Math.floor(Math.random() * 255);
  let g = 160 || Math.floor(Math.random() * 255);
  let b = 176 || Math.floor(Math.random() * 255);
  let alpha = Math.floor(Math.random() * 100) / 100;
  let color = `rgba(${r},${g},${b},${index})`;
  return color;
}

function getXLabels() {
  let date = new Date();
  let datesArray = [];
  function addDays(i) {
    let days = -28 + 7 * i;
    let labelDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + days
    );
    return labelDay;
  }
  for (let i = 0; i < 12; i++) {
    let fullLabel = addDays(i);
    let label = `${fullLabel.getFullYear()}.${fullLabel.getWeek()}`;
    datesArray.push(label);
  }
  return datesArray;
}

//ACTIVITY GRAPH
export const activityData = (userData) => {
  let activity = userData.activity;
  let dataSetArray = [];
  let globalDataSet = [[], [], [], [], []];
  let superGlobalDataSet = [];
  const r = 13;
  let weekDay = [" ", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  activity.forEach((element) => {
    let dateFormat = new Date(element.date);
    dataSetArray.push({
      x: `${dateFormat.getFullYear()}.${dateFormat.getWeek()}`,
      y: weekDay[dateFormat.getDay()],
      count: element.count,
      date: element.date,
      r: r,
    });
  });
  let index;
  dataSetArray.forEach((element) => {
    if (Math.floor(element.count / 4) < 5) {
      index = Math.floor(element.count / 4);
    } else {
      index = 5;
    }
    globalDataSet[index - 1]?.push(element);
  });

  globalDataSet.forEach((array, ind) => {
    superGlobalDataSet.push({
      data: array,
      backgroundColor: getOpacity(ind / 10 + 0.2),
    });
  });
  return {
    datasets: superGlobalDataSet,
  };
};
export const activityOptions = () => {
  return {
    responsive: true,
    elements: {
      point: {
        pointStyle: "rect",
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem?.raw?.date;
          },
          afterLabel: function (tooltipItem) {
            return `${tooltipItem?.raw?.count} actions`;
          },
        },
        displayColors: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 8,
        beginAtZero: true,
        type: "category",
        labels: [" ", "sun", "sat", "fri", "thu", "wed", "tue", "mon", " "],
        reverse: true,
        grid: { offset: true },
      },
      x: {
        min: 0,
        max: 12,
        type: "category",
        labels: getXLabels(),
        grid: { drawOnChartArea: false, offset: true },
      },
    },
  };
};

//STADISTICS GRAPH
export const stadisticsData = (userData) => {
  const booksData = [
    userData.bookmarked.length,
    userData.favourites.length,
    userData.read.length,
  ];
  return {
    labels: ["Bookmarked", "Favourites", "Read"],
    datasets: [
      {
        label: "Books",
        data: booksData,
        backgroundColor: [
          "rgba(0, 160, 176, .7)",
          "rgba(174, 133, 50, .8)",
          "rgba(186, 194, 186, 1)",
        ],
        borderWidth: 5,
      },
    ],
  };
};
export const stadisticsOptions = {
  responsive: true,
  plugins: { legend: false, tooltip: true },
};
