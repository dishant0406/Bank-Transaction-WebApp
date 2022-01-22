'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


//setting the current user who is using the webapp
//CURRENT USER
let currentuser;
/////////////////////////////////////////////////



/////////////////////////////////////////////////
//FUNCTION TO  ADD THE MOVEMENTS IN THE APP TABLE

//SETTING DEFAULT SORT TO FALSE
let sorted = false;


function domarrayadd(account){
  
  //////////////////////////////////////////////
  containerMovements.innerHTML = '';//innerHTML is used define and get the html that is stored inside the perticular container
  ///////////////////////////////////////////////


  //ADDING A SORTED ARRAY IN CURRENT USER SO THAT IT CAN BE USED
  currentuser.sortedarray = currentuser.movements.slice().sort((a,b)=> Math.abs(a)> Math.abs(b) ? -1 : 1);
      

      //CHECKING IF SORTED IS FALSE WE WILL START THIS FUNCTION WITH MOVENTS
      if(sorted==false){
            account.movements.forEach(function(number, index, arr){
              console.log(`${index} : ${number}`);
    
             let type;


              number>0 ?  type = 'deposit' : type = 'withdrawal';


                ///////////////////////////////SETTING DATE/////////////////////////////////////////

                        //OBJECT TO PASS IN THE INTERNATINAL DATE 
                        const dateobject ={
                          hour: 'numeric',
                          minute: 'numeric',
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',

                        }

                        //FORMATING MONEY OBJECT
                        const formatmoney = {
                          style: 'currency',
                          currency: currentuser.currency,
                        }


                          //SETTING DATE FROM THE MOVEMENTS DATE ARRAY IN THE ACCOUNT OBJECT
                          
                          labelDate.textContent = Intl.DateTimeFormat(navigator.language, dateobject).format(new Date());


                          //SETTING CURRENT DATE AR THE TOP

                          //CREATE DATE WITH THE DATA GIVEN IN THE ARRAY
                          const datemov = new Date((account.movementsDates[index]));

                          //USING METHODS TO ADD THE FORMAT WE WANT IN DATE
                          
                          const displaydate = Intl.DateTimeFormat(currentuser.locale).format(datemov);
                /////////////////////////////////SETTING DATE COMPLETE////////////////////////////


              const htmltag = `<div class="movements__row">
                                <div class="movements__type movements__type--${type}">${index +1} ${type}</div>
                                <div class="movements__date">${displaydate}</div>
                                 <div class="movements__value">${Intl.NumberFormat(currentuser.locale, formatmoney).format(number)}</div>
                                </div>`;


              /////////////////////////////////////////////


                  containerMovements.insertAdjacentHTML('afterbegin', htmltag);
                  //insertAdacentHTML is used to add a chunk of html before or after the already present html inside a given container
   
                  //////////////////////////////////////////////

        
            });
          }
          
          //ELSE IF SORTED IS TRUE THEN WE WILL START THE FUNCTION WITH SORTEDARRAY
          else{
            account.sortedarray.forEach(function(number, index, arr){
              
              
             let type;


             //OBJECT TO PASS IN THE INTERNATINAL DATE 
             const dateobject ={
              hour: 'numeric',
              minute: 'numeric',
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
             }


             
                        //FORMATING MONEY OBJECT
                        const formatmoney = {
                          style: 'currency',
                          currency: currentuser.currency,
                        }


                        
             ///////////////////////////////SETTING DATE/////////////////////////////////////////

                          //SETTING DATE FROM THE MOVEMENTS DATE ARRAY IN THE ACCOUNT OBJECT
                          
                          labelDate.textContent = Intl.DateTimeFormat(navigator.language, dateobject).format(new Date());

                          //SETTING CURRENT DATE AR THE TOP

                          //CREATE DATE WITH THE DATA GIVEN IN THE ARRAY
                          const datemov = new Date((account.movementsDates[index]));

                          //USING METHODS TO ADD THE FORMAT WE WANT IN DATE
                          
                          const displaydate = Intl.DateTimeFormat(currentuser.locale).format(datemov);
                /////////////////////////////////SETTING DATE COMPLETE////////////////////////////
          
          
              number>0 ?  type = 'deposit' : type = 'withdrawal';
          
          
              const htmltag = `<div class="movements__row">
                                <div class="movements__type movements__type--${type}">${index +1} ${type}</div>
                                <div class="movements__date">${displaydate}</div>
                                 <div class="movements__value">${Intl.NumberFormat(currentuser.locale, formatmoney).format(number)}</div>
                                </div>`;
          
          
              /////////////////////////////////////////////
          
          
             containerMovements.insertAdjacentHTML('afterbegin', htmltag);
             //insertAdacentHTML is used to add a chunk of html before or after the already present html inside a given container
          
             
            //////////////////////////////////////////////
            });
          }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////



//FUNCTION TO CREATE USERNAMES FOR ALL THE USERS PRESENT IN THE ARRAY OF NAMED ACCOUNT
function createUsername(acc){
  acc.forEach(function(accname) {
     accname.username = accname.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
}
createUsername(accounts);
accounts.forEach(acc => console.log(acc));
/////////////////////////////////////////////////////////////////////////////////////


//ARRAY OF BALANCE WHICH ARE DEPOSITS OR WHICH ARE GREATER THEN ZERO(0)
const despsits = movements.filter(balance => balance>0);
console.log(despsits);
//////////////////////////////////////////////////////////////////////////


//ARRAY OF FUNCTION WHICH ARE WITHDRAWL OR WHICH ARE LESS THEN ZERO(0)
const withdraw = movements.filter(balance => balance<0);
console.log(withdraw);
////////////////////////////////////////////////////////////////////////


//REDUCE FUNCTION ADDS ALL THE ELEMENTS WITH THEIR SIGN SO TO GIVE THE TOTAL OUTPUT 
//IT REQUIRES PARAMETERS(ACCUMLATOR(THE VARIABLE TO WHICH ALL THE ELEMETS ARE ADDED), ARRAY ELEMENT, INDEX, COMPLETE ARRAY)
const totbalance = movements.reduce((sum, currmoney) => sum+currmoney, 0);
console.log(totbalance);
//////////////////////////////////////////////////////////////////////////


//FUNTION THAT RETURN THE TOTAL BALANCE
function totball(acc){ return acc.movements.reduce((sum,curr)=> sum+curr,0)};
console.log(totball(account1)); 
///////////////////////////////////////////////////////////////////////////


//FUCNTION TO SET THE CURRENT BALACE IN HTML PAGE



function calcPrintBalance(personacc){

  //OBEEJCT TO PASS AS ARGUMENT IN CURRENCY FORMAT
  const formatmoney = {
    style: 'currency',
    currency: currentuser.currency,
  }


  const totbal = personacc.movements.reduce((sum,currmoney)=> sum+currmoney,0);
   labelBalance.innerHTML = `${Intl.NumberFormat(currentuser.locale, formatmoney).format(totbal)}`;
  // labelBalance.textContent = `${totbalance}€`;
}
/////////////////////////////////////////////////////////////////////////////////


//FIND THE MAXIMUM DESPOSIT USING THE REDUCE
const maxbal = movements.reduce((maxval, currbal)=>maxval>currbal ? maxval : currbal,movements[0]);
console.log(maxbal);
////////////////////////////////////////////////////////////////////////////////


//CALCULATE TOATAL DEPOSITS DESCARDING THE WITHDRAWL
function calcPrintIncome(personacc){

  //OBEEJCT TO PASS AS ARGUMENT IN CURRENCY FORMAT
  const formatmoney = {
    style: 'currency',
    currency: currentuser.currency,
  }


  const totin = personacc.movements.filter(currmoney => currmoney>0).reduce((sum,currmoney)=> sum+currmoney,0);
  labelSumIn.innerHTML = `${Intl.NumberFormat(currentuser.locale, formatmoney).format(totin)}`;
}

//////////////////////////////////////////////////////////////////////////////


//CALCULATE TOTAL WITHDRAWL
function calcPrintOut(personacc){


  //OBEEJCT TO PASS AS ARGUMENT IN CURRENCY FORMAT
  const formatmoney = {
    style: 'currency',
    currency: currentuser.currency,
  }


  const totout = personacc.movements.filter(currmoney => currmoney<0).reduce((sum,currmoney)=> sum+currmoney,0);
  labelSumOut.innerHTML = `${Intl.NumberFormat(currentuser.locale, formatmoney).format(Math.abs(totout))}`;
}

//////////////////////////////////////////////////////////////////////////////////


//CALCULATE TOTAL INTERESET
function intreset(personacc){

  //OBEEJCT TO PASS AS ARGUMENT IN CURRENCY FORMAT
  const formatmoney = {
    style: 'currency',
    currency: currentuser.currency,
  }


  const intresetamt = personacc.movements.filter(currmoney => currmoney>0).map(currmoney =>  (currmoney*personacc.interestRate)/100).filter(currmoney=>currmoney>1).reduce((sum, currmoney)=>sum+currmoney,0);
  labelSumInterest.innerHTML = `${Intl.NumberFormat(currentuser.locale, formatmoney).format(intresetamt)}`;
}
////////////////////////////////////////////////////////////////////////////////////




//FUCNTION TO UPDATE VALUES IN AN ARRAY
function updatevalue(acc){


  //INSERTING THE MOVEMENTS ACCORDING TO THE CURRENT USER
  domarrayadd(acc);


  //SETTING THE CURRENT BALACE IN THE HTML ACCORING TO THE CURRENT USER
  calcPrintBalance(acc);


  //SETTING THE TOTAL DEPOSITS ACC TO THE CURRENT USER
  calcPrintIncome(acc);


  //SETTING THE TOTAL WITHDRAWL ACC TO THE CURRENT USER
  calcPrintOut(acc);


  //SETTING THE INTRESET ACC TO THE CURRENT USER
  intreset(acc);


}



//**************** SETING UP THE LOGIN OF THE PAGE**************************************

//SETTING UP THE LOGIN FUNCTION OF THE WEB-APP
btnLogin.addEventListener('click', function(e){


  //prevent the page from reloading automatically when we click the buttom
  e.preventDefault();


  const usernamelogin = inputLoginUsername.value;
  const userpass = inputLoginPin.value;


  currentuser = accounts.find(accuser => accuser.username===usernamelogin);


  //IF THE CURRENTUSER IS NOT FINDED BY THE find METHOD THEN IT RETURNS undefined 
  if(currentuser===undefined){
    alert("USERNAME NOTE FOUND");
  }
  //IF PASSWORD IF RIGHT THEN WE LOGIN AND SET THE OPACITY OF THE .app TO 100
  else if(currentuser.pin === Number(userpass)){


    console.log("LOGINED");

    //SETTING UP THE WECOME MESSAGE IN THE HTML PAGE
    labelWelcome.textContent = `Welcome back, ${currentuser.owner.split(" ")[0]}`


    //SETTING THE VALUE OF THE INPUR FEILD TO EMPTY STRING
    inputLoginUsername.value ='';
    inputLoginPin.value='';


    //MAKING AS CURSOR DESAPEAR FROM THE PIN FIELD AFTER ENTERING THE PASSWORD AND LOGING IN
    inputLoginPin.blur();
    inputLoginUsername.blur();


    //SET-TIMER FOR LOGOUT
    labelTimer.textContent = '10:00';


    //SETTING TIMER TO 10 MINUTES
    let time = 10*60;


    //FUNCTION THAT WILL HAPPEN WHEN WE THE TIME IS OVER
    //TO LOGOUT
    function logout(){


        //SETTIN GOPACITY ZERO
        containerApp.style.opacity = 0;

        //TIMER CONTENT TO ZERO
        labelTimer.textContent = '00:00';

        //SETTING TITLE TO LOGIN
        labelWelcome.textContent = `Log in to get started`;
        

        //ALERTING THE USER
        setTimeout(() => {
          alert("LOGGED OUT");
        }, 1);

        //CLEAR THE INTERVEL TIMER
        clearInterval(timer);

        

        
      
    }
    
    

    //TIMER FUNCTION
    const timer = setInterval(() => {
      let minute = Math.trunc(time/60);
      let seccond = time%60;
      labelTimer.textContent = `${minute}`.padStart(2, 0)+`:`+`${seccond}`.padStart(2, 0);
      time--;
      if(time===0){
        logout();
      }
    }, 1000);

    //WHEN BUTTON IS PRESSED AGAIN TO LOGIN IF AN EXISITING TIMER EXSIST THEN STOP IT
    btnLogin.addEventListener('click', function (){
      if(timer){
        clearInterval(timer);
        labelTimer.textContent = '00:00';
      }
    })

    


    //CALL THE FUNTION TO UPDATE VALUE
    sorted=false;
    updatevalue(currentuser);


    //SETTING THE OPACITY TO 100
    containerApp.style.opacity = 100;


  }else{
    alert("WRONG PASSWORD");
  }
 
})

//**************************SETTING UP LOGIN COMPLETE******************************* */
//////////////////////////////////////////////////////////////////////////////////////




//*****************************IMPLEMENTING TRANSFER FROM ONE ACCOUNT TO ANOTHER************************ */


btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  //GETTING THE VALUE FROM THE INPUT BOX AND STORING THEM IN VARIABLE
  const moneyto = inputTransferTo.value;
  const transmoney = Number(inputTransferAmount.value);


        //TRANFER ONLY WHEN THE TOTAL BALANCE IS GREATER THEN MONEY TO BE TRANSFERED
        //MONEY IS GREATER THEN ZERO
        //TRANFER ACCOUNT IS NOT EQUAL TO THE CURRENT USER
        if(transmoney>0 && totball(currentuser)>=transmoney && moneyto != currentuser.username){


            //FINDING THE ACCOUNT WITH THE PROVIDED USERNAME BY THE USER
            const tranferuser = accounts.find(useracc=> useracc.username === moneyto);


            //TRANFER USER UNDEFINED
            if(tranferuser===undefined){
              alert("USER NOT FOUND ");
              return;
            }


  
            //ADDING MONEY IN THE PERSON ACCOUNT WHO WE WANT TO TRANFER TO
            tranferuser.movements.push(transmoney);


            //DEDUCTING MONEY FROM THE CURRENT USER ACCOUNT
            currentuser.movements.push(Number(`-${transmoney}`));


            //ADDING DATES TO THE TRANFEREED MONEY
            currentuser.movementsDates.push(new Date());
            tranferuser.movementsDates.push(new Date());


            //CALL THE FUNTION TO UPDATE VALUE
            sorted=false;
            updatevalue(currentuser);
  
        }
        

        //IF TRANFER MONEY IS LESS THAN ZERO
        else if(transmoney<0){

          alert("NEGATIVE MONEY CANNOT BE TRANFERRED");
        }

        //IF CURRENT BALANCE IS LESS THEN THE MONEY TO BE TRANFERED
        else if(totball(currentuser)<transmoney){

          alert("NOT ENOUGH BALANCE!! TAKE LOAN");
        }

        //IF TRANFER ACCOUNT AND CURRENT ACCOUNT ARE SAME
        else if(moneyto === currentuser.username){

          alert("CANNOT SEND MONEY TO YOUR ACCOUNT!!")
        }


        //SETTING THE VALUE OF THE INPUT FEILD TO EMPTY STRING
        inputTransferTo.value ='';
        inputTransferAmount.value='';


        //MAKING AS CURSOR DESAPEAR FROM THE PIN FIELD AFTER ENTERING THE AMMOUNT AND LOGING IN
        inputTransferTo.blur();
        inputTransferAmount.blur();

})

//**************************SETTING TRANSACTIONS COMPLETE******************************* */
//////////////////////////////////////////////////////////////////////////////////////



//*****************************SETTING UP ACCOUNT CLOSING************************ */

btnClose.addEventListener("click", function(e){
  e.preventDefault();
  console.log("CLOSED");

  //CHECKING THE CREDENTIALS
  const closeusername = inputCloseUsername.value;
  const closepin = Number(inputClosePin.value);


  if(currentuser.username===closeusername && currentuser.pin===closepin){


    //SETTING THE LOGIN STATE BACK TO NORMAL
    labelWelcome.textContent = `Log in to get started`;


    //LOGGING TO CONSOLE TO CHECK IF LOGINED OR NOT
    console.log("logined");


    //HIDING THE UI
    containerApp.style.opacity = 0;


    //GETTING THE INDEX OF THE CURRENT ACCOUNT IN THE ACCOUNT ARRAY
    const index = accounts.findIndex(acc => acc.username===currentuser.username);


    //USING SPLICE TO DELETE THE ELEMENT AT INDEX 
    accounts.splice(index, 1);


    
    //SETTING THE VALUE OF THE INPUT FEILD TO EMPTY STRING
    inputCloseUsername.value ='';
    inputClosePin.value='';


    //MAKING AS CURSOR DESAPEAR FROM THE PIN FIELD AFTER ENTERING THE AMMOUNT AND LOGING IN
    inputCloseUsername.blur();
    inputClosePin.blur();


    //ALERT
    alert("ACCOUNT CLOSED");

  }
  
  
  else if(currentuser.username===closeusername && currentuser.pin!=closepin){
    alert("WRONG PIN");
  }

  else if(currentuser.username!=closeusername && currentuser.pin===closepin){
    alert("WRONG USERNAME");
  }

  else{
    alert("NOT THE SAME USER AS LOGINED CANNOT DELETE THE ACCOUNT");
  }
})

//**************************SETTING ACCOUNT CLOSING COMPLETE******************************* */
//////////////////////////////////////////////////////////////////////////////////////////////



//*****************************SETTING UP TAKING LOAN IN YOUR ACCOUNT************************ */


btnLoan.addEventListener("click",function(e){

  e.preventDefault();
  console.log("ATTEMPTING LOAN");


  //GETTING THE LOAN AMOUNT FROM USER
  const loanamount = Number(inputLoanAmount.value);


  

  if(loanamount>0 && currentuser.movements.some(amt => amt >= 0.1*loanamount)){




    //ADDING DELAY IN LOAN APPROVAL
    setTimeout(function (){
    
    //CHECKING IF ENETERD MONEY IF VALID OR NOT
    //CUSTOMER MUST HAVE A DEPOSIT GREATER THEN 10 PERSENT OF THE REQUIERED AMMOUNT
    
    //PUSING THE LOAN AMOUNT IN THE USER ACCOUNT
    currentuser.movements.push(loanamount);


    //ADDING DATES TO THE TRANFEREED MONEY
    currentuser.movementsDates.push(new Date());


    //UPDATE THE VALUES
    updatevalue(currentuser);
    
    }, 3000);

    setTimeout(() => {
      alert("LOAN APPROVED!!");
    }, 2000);


  }


  //ACCOUNT NOT ELEGIBLE
  else{

    console.log("INVALID");
    alert("ACCOUNT NOT ELEIGIBLE FOR LOAN OF THIS AMMOUNT");
  }


  //SETTING THE VALUE OF THE INPUT FEILD TO EMPTY STRING
  inputLoanAmount.value ='';


  //MAKING AS CURSOR DESAPEAR FROM THE PIN FIELD AFTER ENTERING THE AMMOUNT AND LOGING IN
  inputLoanAmount.blur();
  



})


//**************************SETTING TAKING LOAN COMPLETE******************************* */
//////////////////////////////////////////////////////////////////////////////////////////////



//*****************************SETTING UP SORTING BUTTON************************ */


btnSort.addEventListener("click", function(e){
  e.preventDefault();

  //IF SORTED IS FALSE THEN WE WILL SET IT TO TURE
  if(sorted==false){
    sorted=true;
  }
  
  //AND VICE VERSA
  else{
    sorted=false;
  }

  //AND WE UPDATE VALUE
  updatevalue(currentuser);

   
  
})
//**************************SETTING SORTING BUTTON COMPLETE******************************* */
//////////////////////////////////////////////////////////////////////////////////////////////

