var ctx, chart;
var log = {
  labels: [],
  datasets: []
};

var downstream = [];
var upstream = [];
var snr = [];
var date;
var data = jQuery.getJSON();

$(window).ready(function () {
  ctx = $('#chart').get(0).getContext("2d");
  $('#datepicker').datepicker({
    dateFormat: 'yy-mm-dd',
    inline: true,
    maxDate: new Date(),
    onSelect: update_trigger
    
  });
  $('#datepicker').val(new Date().toDateInputValue());
  update_trigger();
}, false);

var update_trigger = function() {
  var day = $('#datepicker').datepicker('getDate').getDate();
  var month = $('#datepicker').datepicker('getDate').getMonth() + 1;
  var year = $('#datepicker').datepicker('getDate').getFullYear();
  update_chart(year + '-' + month + '-' + day);
}

var update_chart = function(date) {
  log = {
    labels: [],
    datasets: []
  };

  // replace current chart
  if (chart != null) {
    $('#chart').replaceWith($('#chart').get(0).outerHTML);
    ctx = $('#chart').get(0).getContext("2d");
  }

  console.log(date);
  data = jQuery.getJSON('/api/' + date, function(data) {
    $.each(data['json_list'], function(key, val) {
        log.labels.push(val['date'][1]);
        downstream.push(val['values']['Downstream']['Channel 1']['Power level']);
    });
  });
  data.complete(function() {
      var dataset = {data: downstream,
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)"}
      log.datasets.push(dataset);
      console.log(log);
      chart = new Chart(ctx).Line(log);
  });
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
