console.log("home");

const reportBtn = document.getElementById('report-site-btn');
const submitReportContainer = document.getElementById('submit-report-container');
const message = document.getElementById('login-message');

reportBtn.onclick = async()=> {

    const valid = reportBtn.getAttribute('data-user');
    console.log(valid);

    if(valid==""){



        setTimeout(function(){
            message.style.display = "none";

        },8500);

        message.style.display= "block";

        window.scrollBy({
            top: 165,
            left: 0,
            behavior: "smooth",
          });

      



    }else{

        submitReportContainer.style.display= "flex";
        submitReportContainer.style.flexDirection= "column";

      
      
   

        window.location.href = '#submit-report-container';
      
    }

 




}




