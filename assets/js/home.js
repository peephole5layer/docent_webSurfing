console.log("home");

const reportBtn = document.getElementById('report-site-btn');
const submitReportContainer = document.getElementById('submit-report-container');
const message = document.getElementById('login-message');

reportBtn.onclick = ()=> {

    const valid = reportBtn.getAttribute('data-user');
    console.log(valid);

    if(valid==""){



        setTimeout(function(){
            message.style.display = "none";

        },7000);

        message.style.display= "block";

       

      


      


       
    }else{

        submitReportContainer.style.display= "flex";
        submitReportContainer.style.flexDirection= "column";
      
    }



}




