$(function() {

  $('.js-art').click(function() {
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

  $('.js-instrument').click(function() {
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

        function pickRandomTask(){
          function newTask(image, answer) {
            this.image = image;
            this.answer = answer;
          }

          var task1 = new newTask('img/violin.jpg', 'smuikas');
          var task2 = new newTask('img/trumpet.jpg', 'trimitas');
          var task3 = new newTask('img/piano.jpg', 'pianinas');
          var task4 = new newTask('img/oboe.jpg', 'obojus');

          var taskList = [task1, task2, task3, task4];
            if (taskList.length  > 0) {
              var num = Math.floor(Math.random() * taskList.length);
              document.getElementById('randomImage').src = taskList[num].image;
              console.log(taskList[num]);

              function compareAnswer() {
                var insertedText = document.getElementById("name").value.toLowerCase();
                console.log(insertedText);
                switch(insertedText) {
                  case taskList[num].answer:
                    taskList.splice(num, 1); 
                    pickRandomTask();
                  break;
                  default: 
                    alert('Šūdų malūnas! Bandyk darkart!');
                }  
              }

              pickRandomTask.compareAnswer=compareAnswer;

            } else  {
                alert("Žinai tik 4 muzikos instrumentus - nieko gero! Lauk tęsinio!");
            }
          }
        }
      });
    });
});
