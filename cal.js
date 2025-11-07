 function dis(val){
        document.getElementById("result").value+=val;

      }
      function solve(){
        x=document.getElementById("result").value;
        y=eval(x);
        document.getElementById("result").value=y;
      }

    function clear(){
      document.getElementById("result").value="";
    }
