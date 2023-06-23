
function sample() {
    var itemLength = document.getElementById("passLength").value;
   // alert(itemLength);
     document.getElementById("demo").innerHTML=itemLength;

}

function checkchar(val) {
    var specItem=['@', '#', '$', '%', '^', '&', '_'];
    for(let i in specItem) {
        if(val==specItem[i]) {
            return 1;
        }
        else {return 0;}
    }
}

function checknr(val) {
    var nrsItem=[1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let i in nrsItem) {
        if(val==nrsItem[i]) {
            return 1;
        }
        else {return 0;}
    }
}

async function pasteText(){
  document.getElementById("resultpop").style.display = "block";
  //     document.getElementById("resultdemo").innerHTML = readText;

   
  //   try{
  //     const readText = await navigator.clipboard.readText();
  //  //   alert("writing");
  //     document.getElementById("resultpop").style.display = "block";
  //     document.getElementById("resultdemo").innerHTML = readText;
  //  //   alert("done");
  //   }

  //   catch(err){
  //     alert("paste text error: ",err)
  //   } 
}   
//////////////////////////////////////////////////////////////////////////////////

function hideOther() {
    var x = document.getElementById("info-HDIW");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }	

function hideShow() {
    var y = document.getElementById("info-HDIW");
    if (y.style.display === "block") {
      y.style.display = "none";
    } 
  }	

function closeResult() {
  document.getElementById("resultpop").style.display ='none';
}

function showSelection() {
  if(document.getElementById("anr").checked) {
    document.getElementById("custom-conditions").style.display ='none';
    document.getElementById("what").innerHTML= "Your number is on the way!";
    document.getElementById("genBtn").value="nr";
    document.getElementById("demo").innerHTML="";

  } 
  if(document.getElementById("apass").checked) {
    document.getElementById("custom-conditions").style.display ='none';
    document.getElementById("what").innerHTML= "Your password is on the way!";
    document.getElementById("genBtn").value="passw";
    document.getElementById("demo").innerHTML="";

  } 

  if(document.getElementById("acpass").checked) {
    document.getElementById("custom-conditions").style.display ='block';
    document.getElementById("what").innerHTML= "Tell us more about it!";
    document.getElementById("genBtn").value="cpassw";
    document.getElementById("demo").innerHTML="";
  } 

  

}

function stopResume() {
  if(document.getElementById('stopAnim').innerHTML=='Stop Animation') {
    document.getElementById('stopAnim').innerHTML='Resume';
  }
  else {
    document.getElementById('stopAnim').innerHTML='Stop Animation';
  }
  
}

function newAnimation() {
  if(document.getElementById('newAnim').innerHTML=='New Animation') {
    document.getElementById('newAnim').innerHTML='Original';
  }
  else {
    document.getElementById('newAnim').innerHTML='New Animation';
  }
  
}