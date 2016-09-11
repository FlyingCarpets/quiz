function newTask(image, answer) {
  this.image = image;
  this.answer = answer;
}

  var task1 = new newTask("img/violin.jpg", "smuikas");
  var task2 = new newTask('img/trumpet.jpg', 'trimitas');
  var task3 = new newTask('img/piano.jpg', 'pianinas');
  var task4 = new newTask('img/oboe.jpg', 'obojus');

  var taskList = [task1, task2, task3, task4];

function pickRandomTask(){
  
  if (taskList.length  > 0) {
    var num = Math.floor(Math.random() * taskList.length);
    document.getElementById('randomImage').src = taskList[num].image;
    console.log(taskList[num]);

    function compareAnswer() {
      var insertedText = document.getElementById("instrument-answer").value.toLowerCase();
      console.log(insertedText);
      if(insertedText == taskList[num].answer) {
        taskList.splice(num, 1); 
        console.log(taskList);
        pickRandomTask();
      } else {
        alert("Neteisingas atsakymas. Bandyti dar kartą");
      } 
    }
    
    pickRandomTask.compareAnswer = compareAnswer;
    
  } else  {
    alert("Žinai tik 4 muzikos instrumentus - nieko gero! Lauk tęsinio!");
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
