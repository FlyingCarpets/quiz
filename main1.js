$(function(){
	pickRandomTask();

	function pickRandomTask(){
		function newTask(image, answer) {
	      this.image = image;
	      this.answer = answer;
	    }

	    var task1 = new newTask('http://placehold.it/50x50', 'smuikas');
	    var task2 = new newTask('http://placehold.it/100x100', 'trimitas');
	    var task3 = new newTask('http://placehold.it/150x150', 'pianinas');
	    var task4 = new newTask('http://placehold.it/170x170', 'obojus');

	    var taskList = [task1, task2, task3, task4];
	    var num = Math.floor(Math.random() * taskList.length);

	    document.getElementById('randomImage').src = taskList[num].image;

	    function compareAnswer() {
	      var insertedText = document.getElementById("name").value;
	      switch(insertedText) {
	        case taskList[num].answer:   
	          pickRandomTask();
	        break;
	        default: 
          		alert('wrong answer');
      		}  
  		}

  		pickRandomTask.compareAnswer=compareAnswer;
	}
});