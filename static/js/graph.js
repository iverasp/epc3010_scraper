var ctx, chart;
var log = {
  labels: [],
  datasets: []
};

var downstream_channels = 8;
var upstream_channels = 4;
var graph_values = [];

var date;
var data_selector;

$(window).ready(function () {
  ctx = $('#chart').get(0).getContext("2d");
  $('#datepicker').datepicker({
    dateFormat: 'yy-mm-dd',
    inline: true,
    maxDate: new Date(),
    onSelect: update_trigger
  });
  $('#datepicker').val(new Date().toDateInputValue());
  $('#dataselector').change(update_trigger);
  update_trigger();
}, false);

var update_trigger = function() {
  var day = $('#datepicker').datepicker('getDate').getDate();
  var month = $('#datepicker').datepicker('getDate').getMonth() + 1;
  var year = $('#datepicker').datepicker('getDate').getFullYear();
  data_selected = $('#dataselector option:selected').get(0).value;
  update_chart(year + '-' + month + '-' + day, data_selected);
}

var update_chart = function(date, data_selected) {
  log = {
    labels: [],
    datasets: []
  };

  // replace current chart
  if (chart != null) {
    $('#chart').replaceWith($('#chart').get(0).outerHTML);
    ctx = $('#chart').get(0).getContext("2d");
  }

  switch(data_selected) {
    case 'downstream':
      graph_values = [downstream_channels];
      for (var i = 0; i < downstream_channels; i++) {
        graph_values[i] = [];
      }
      break;
    case 'upstream':
      graph_values = [upstream_channels];
      for (var i = 0; i < upstream_channels; i++) {
        graph_values[i] = [];
      }
      break;
    case 'snr':
      graph_values = [downstream_channels];
      for (var i = 0; i < downstream_channels; i++) {
        graph_values[i] = [];
      }
      break;
  }

  data = jQuery.getJSON('/api/' + date, function(data) {
    var t = 0;
    $.each(data['json_list'], function(key, val) {
      if (t == 0) {
        log.labels.push(val['date'][1]);

        switch(data_selected) {
          case 'downstream':
            for (var i = 0; i < downstream_channels; i++) {
              graph_values[i].push(val['values']['Downstream']['Channel ' + (i + 1)]['Power level'])
            }
            break;
          case 'upstream':
            for (var i = 0; i < upstream_channels; i++) {
              graph_values[i].push(val['values']['Upstream']['Channel ' + (i + 1)]['Power level'])
            }
            break;
          case 'snr':
            for (var i = 0; i < downstream_channels; i++) {
              graph_values[i].push(val['values']['Downstream']['Channel ' + (i + 1)]['SNR'])
            }
        }
      }

      if (t == 1) t = 0;
      else t++;

    });
  });

  data.complete(function() {
    log.datasets = [];
    switch(data_selected) {
      case 'downstream':
        for (var i = 0; i < downstream_channels; i++) {
          log.datasets.push({
            data: graph_values[i],
            label: "DC"+(i+1),
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)"
          })
        }
        break;
      case 'upstream':
        for (var i = 0; i < downstream_channels; i++) {
          log.datasets.push({
            data: graph_values[i],
            label: "UC"+(i+1),
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)"
          })
        }
        break;
      case 'snr':
        for (var i = 0; i < downstream_channels; i++) {
          log.datasets.push({
            data: graph_values[i],
            label: "SNR, DC"+(i+1),
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)"
          })
        }
        break;
      }
      if (data.responseJSON.json_list.length == 0) {
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText("No data found", $('#chart').get(0).width/2, $('#chart').get(0).height/2);
      } else {
        chart = new Chart(ctx).Line(log, {
          pointHitDetectionRadius: 5,
          multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
        });
      }
  });
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
