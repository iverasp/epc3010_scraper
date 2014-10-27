var ctx, chart;
var log = {
  labels: [],
  datasets: []
};

var data2 = jQuery.getJSON('/api', function(data) {
  $.each(data['json_list'], function(key, val) {
    console.log(data['json_list'])
  });
});

var data = {
  labels: ['22:50:20', '22:50:30', '22:50:40', '22:50:50', '22:51:00', '22:51:10'],
  datasets: [
    {
      label: "Downstream channel",
      fillColor : "rgba(220,280,220,0.5)",
      strokeColor : "rgba(220,220,220,1)",
      data: [30, 20, 30, 30, 20, 30]
    }
  ]
};

var data3 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

console.log(log);

window.addEventListener("load", function load(event) {
  ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx).Line(data);
}, false);
