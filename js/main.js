var data_path = "https://raw.githubusercontent.com/FlyingCarpets/quiz/gh-pages/data/questions.json";
$.getJSON(data_path, function (data) {
  taskList = data;
  console.log(taskList);
});

function pickRandomTask(){

  if (taskList.questions.length  > 0) {
    var num = Math.floor(Math.random() * taskList.questions.length);
    document.getElementById('randomImage').src = taskList.questions[num].image;
    console.log(taskList.questions[num]);

    function compareAnswer() {
      var insertedText = document.getElementById("instrument-answer").value.toLowerCase();
      console.log(insertedText);
      if(insertedText == taskList.questions[num].answer) {
        taskList.questions.splice(num, 1);
        console.log(taskList.questions);
        pickRandomTask();
      } else {
        alert("Neteisingas atsakymas. Bandyti dar kartą");
      }
    }

    pickRandomTask.compareAnswer = compareAnswer;

  } else  {
    alert("Pabaiga");
  }
}

$(function() {

  $(document).on('click', '.js-art', function() {
    var path = $(this).data('url');
    $.ajax({
      type: 'GET',
      url: path,
      error: function(data) {
        alert("error");
      },
      success: function(data) {
        $('.js-task-block').html(data);
      }
    });
  });

  $(document).on('click', '.js-instrument', function() {
    var path = $(this).data('url');
    $.ajax({
      type: 'GET',
      url: path,
      error: function(data) {
        alert("error");
      },
      success: function(data) {
        $('.js-task-block').html(data);
        pickRandomTask();
      }
    });
  });
});
