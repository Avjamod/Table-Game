var playing = false ;
var score;
var action;
var timeremain;
var correctAns

//if we click on start/reset
document.getElementById("startreset").onclick = function()
{
    //if we are playing
    if(playing == true){

        location.reload(); //reload page

    }else{ //if we are not playing

        //change mode to playing
        playing = true;

        score = 0; // score is 0
        
        //change score
        document.getElementById("scoreValue").innerHTML = score;

        //show countdown box
        document.getElementById("Timeremain").style.display = "block";
        timeremain = 60;

        document.getElementById("TRvalue").innerHTML = timeremain;

        //
        Hide("Gameover");

        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

        //start countdown
        startCountdown();

        //generate new Q&A
        GenerateQA();

    }
}

//clicking on anwer box

for(i=1 ; i<5 ;i++){
    document.getElementById("box"+i).onclick = function()
    {
        //if we are playing
        if(playing == true){
            if(this.innerHTML == correctAns){
                //correct answer
                score++;
                document.getElementById("scoreValue").innerHTML = score ;
    
                //hide wrong box and show correct box
                Hide("Wrong");
                Show("Correct");
                setTimeout(function(){
                    Hide("Correct");
                }, 1000);
                //generate new question
                GenerateQA();
    
            }else{
                //wrong answer
                Hide("Correct");
                Show("Wrong");
                setTimeout(function(){
                    Hide("Wrong");
                }, 1000);
            }
        }
    }
}


//functions 

//start countdown
function startCountdown(){
    action = setInterval(function(){
        timeremain -= 1;

        document.getElementById("TRvalue").innerHTML = timeremain;
        if(timeremain== 0){//Game over

            stopCountdown();

            Show("Gameover");

            document.getElementById("Gameover").innerHTML="<p>game over!</p><p>your score is "+ score +".</p>";
            
            Hide("Timeremain");
            Hide("Correct");
            Hide("Wrong");
            playing = false;
            document.getElementById("startreset").innerHTML ="Restart";
        }   
    }, 1000);
}

//stop countdown
function stopCountdown(){
    clearInterval(action);
}

//Hide element
function Hide(Id){
    document.getElementById(Id).style.display ="none";
}

//shoe element
function Show(Id){
    document.getElementById(Id).style.display ="block";
}

//Generate Question and answer
function GenerateQA(){
    var x = 1 + Math.round(Math.random()*9);
    var y = 1 + Math.round(Math.random()*9);
    correctAns = x*y;

    document.getElementById("Question").innerHTML = x +"x"+ y;

    var correctPos= 1 + Math.round(Math.random()*3);

    //fill one box with corect answer
    document.getElementById("box"+correctPos).innerHTML = correctAns; 

    //fill the boxes with wrong answer
    var answers = [correctAns];

    for(i=1 ; i<5 ;i++){
        if(i != correctPos){
            var wrongAns;
            do{
                wrongAns = (1 + Math.round(Math.random()*9)) * (1 + Math.round(Math.random()*9));
            }while(answers.indexOf(wrongAns)>-1)

            document.getElementById("box"+i).innerHTML = wrongAns;
            answers.push(wrongAns);
        }
    }
}