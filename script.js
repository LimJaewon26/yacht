const max = 6;
const min = 1;
let turn = 0;
let throws = 0;
let throwTurn = document.querySelector("h2");
let throwAnnounce = document.querySelector('#throws');
let myDices = document.querySelector('.dices').children;
let player1TotalScore = 0;
let player2TotalScore = 0;
let player1SubtotalScore = 0;
let player2SubtotalScore = 0;
let flag1 = 0;
let flag2 = 0;
let diceSound = new Audio('../sounds/dice.mp3');
let confirmSound = new Audio('../sounds/confirm.mp3');

function rollDice()
{
    if (throws >= 3)
        return;
    diceSound.currentTime = 0;
    diceSound.play();
    let dices = [];
    for(let i = 0; i< 5; i++)
    {
        dices.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    for(let i = 0; i < myDices.length; i++)
    {
        if(myDices[i].classList.contains('fixed'))
        {
            if(myDices[i].classList.contains('dice1'))
                dices[i] = 1;
            else if(myDices[i].classList.contains('dice2'))
                dices[i] = 2;
            else if(myDices[i].classList.contains('dice3'))
                dices[i] = 3;
            else if(myDices[i].classList.contains('dice4'))
                dices[i] = 4;
            else if(myDices[i].classList.contains('dice5'))
                dices[i] = 5;
            else if(myDices[i].classList.contains('dice6'))
                dices[i] = 6;    
            continue;
        }
        if(dices[i] == 1)
            myDices[i].className = 'dice1';
        else if(dices[i] == 2)
            myDices[i].className = 'dice2';
        else if(dices[i] == 3)
            myDices[i].className = 'dice3';
        else if(dices[i] == 4)
            myDices[i].className = 'dice4';
        else if(dices[i] == 5)
            myDices[i].className = 'dice5';
        else if(dices[i] == 6)
            myDices[i].className = 'dice6';
    }
    throws++;
    let throwturn = throwTurn;
    throwAnnounce.textContent = `throws : ${throws}/3`
    scoreController(dices, throwturn);
}

function makeFixed(){
    if(throws == 0)
        return;
    if(this.classList.contains('fixed'))
        this.classList.remove('fixed');
    else
        this.classList.add('fixed');
}

function changeturn(){
    if(throws == 0)
        return;
    if(throwTurn.textContent == "Player 1's turn" && this.classList.contains('player2Score'))
        return;
    else if(throwTurn.textContent == "Player 2's turn" && this.classList.contains('player1Score'))
        return;
    confirmSound.currentTime = 0;
    confirmSound.play();
    this.classList.add('scoreFixed');
    throws = 0;
    if(throwTurn.textContent == "Player 1's turn")
    {
        player1TotalScore += Number(this.textContent);
        const tmp = document.querySelector('.Total .player1Score');
        
        if(this.classList.contains('simple'))
        {
            player1SubtotalScore += Number(this.textContent);
            const tmp2 = document.querySelector('.Subtotal .player1Score');
            tmp2.textContent = `${player1SubtotalScore}/63`;
        }

        if(player1SubtotalScore >= 63 && flag1 == 0)
        {
            const tmp3 = document.querySelector('.Bonus .player1Score');
            tmp3.textContent = 35;
            player1TotalScore += 35;
            flag1 = 1;
        }
        
        tmp.textContent = player1TotalScore;

        const tmp4 = document.querySelectorAll('.player1Score')
        for(element of tmp4)
        {
            if(!element.classList.contains('scoreFixed'))
                element.textContent = '';
        }
        throwTurn.textContent = "Player 2's turn";
    }
        
    else if(throwTurn.textContent == "Player 2's turn")
    {
        player2TotalScore += Number(this.textContent);
        const tmp = document.querySelector('.Total .player2Score');
        
        if(this.classList.contains('simple'))
        {
            player2SubtotalScore += Number(this.textContent);
            const tmp2 = document.querySelector('.Subtotal .player2Score');
            tmp2.textContent = `${player2SubtotalScore}/63`;
        }

        if(player2SubtotalScore >= 63 && flag2 == 0)
        {
            const tmp3 = document.querySelector('.Bonus .player2Score');
            tmp3.textContent = 35;
            player2TotalScore += 35;
            flag2 = 1;
        }
        
        const tmp4 = document.querySelectorAll('.player2Score')
        for(element of tmp4)
        {
            if(!element.classList.contains('scoreFixed'))
                element.textContent = '';
        }

        tmp.textContent = player2TotalScore;
        throwTurn.textContent = "Player 1's turn";
    }
        
    throwAnnounce.textContent = `throws : ${throws}/3`
    for(let i = 0; i < 5; i++)
    {
        if(myDices[i].classList.contains('fixed'))
            myDices[i].classList.remove('fixed');
    }
    turn++;
    if(turn >= 24)
    {
        throwTurn.textContent = "Game Over";
        throws = 3;
        if(player1TotalScore > player2TotalScore)
            throwAnnounce.textContent = "Player1 won"
        else if(player1TotalScore < player2TotalScore)
            throwAnnounce.textContent = "Player2 won"
        else
            throwAnnounce.textContent = "Draw"
    }
        
    this.removeEventListener('click',changeturn);
    
}

function scoreController(dices, throwTurn){
    let nowDices = dices;
    if(throwTurn.textContent == "Player 1's turn")
    {
        //ace
        let aces = document.querySelector('.Aces :nth-child(2)');
        if(!aces.classList.contains('scoreFixed'))
        {
            let acesum = nowDices.filter(element => element == 1).reduce((acc, cur) => acc + cur ,0);
            aces.textContent  = acesum;
        }
        

        //deuces;
        let deuces = document.querySelector('.Deuces :nth-child(2)');
        if(!deuces.classList.contains('scoreFixed'))
        {
            let deucesum = nowDices.filter(element => element == 2).reduce((acc, cur) => acc + cur ,0);
            deuces.textContent  = deucesum;
        }
        

        //Threes;
        let threes = document.querySelector('.Threes :nth-child(2)');
        if(!threes.classList.contains('scoreFixed'))
        {
            let threesum = nowDices.filter(element => element == 3).reduce((acc, cur) => acc + cur ,0);
        threes.textContent  = threesum;
        }
        
        

        //Fours;
        let fours = document.querySelector('.Fours :nth-child(2)');
        if(!fours.classList.contains('scoreFixed'))
        {
            let foursum = nowDices.filter(element => element == 4).reduce((acc, cur) => acc + cur ,0);
            fours.textContent  = foursum;
        }
        
        

        //Fives;
        let fives = document.querySelector('.Fives :nth-child(2)');
        if(!fives.classList.contains('scoreFixed'))
        {
            let fivesum = nowDices.filter(element => element == 5).reduce((acc, cur) => acc + cur ,0);
            fives.textContent  = fivesum;
        }
        
        
        //Sixes;
        let sixes = document.querySelector('.Sixes :nth-child(2)');
        if(!sixes.classList.contains('scoreFixed'))
        {
            let sixesum = nowDices.filter(element => element == 6).reduce((acc, cur) => acc + cur ,0);
            sixes.textContent  = sixesum;
        }
        
        

        //Choice;
        let choice = document.querySelector('.Choice :nth-child(2)');
        if(!choice.classList.contains('scoreFixed'))
        {
            let choicesum = nowDices.reduce((acc, cur) => acc + cur ,0);
            choice.textContent  = choicesum;
        }
        

        //중복 제거
        let Fil = nowDices.filter((element,index,arr) => arr.indexOf(element) == index);

        //4 of a Kind;
        let kind = document.querySelector('.Kind :nth-child(2)');
        if(!kind.classList.contains('scoreFixed'))
        {
            let kindFil = nowDices.filter((element) => element != nowDices[0]);
            let kindsum = 0;
            if(kindFil.length == 0 || kindFil.length == 1)
            {
                kindsum = nowDices.reduce((acc, cur) => acc + cur ,0);
            }
            else if(kindFil.length == 4)
            {
                let kindFil2 = kindFil.filter((element)=> element != kindFil[0]);
                if(kindFil2.length == 0)
                {
                    kindsum = nowDices.reduce((acc, cur) => acc + cur ,0);
                }
            }
            kind.textContent  = kindsum;
        }
        
        

        //Full House;
        let fullHouse = document.querySelector('.FullHouse :nth-child(2)');
        if(!fullHouse.classList.contains('scoreFixed'))
        {
            let fullHouseFil = nowDices.filter((element) => element != nowDices[0]);
            let fullHousesum = 0;
            if(fullHouseFil.length == 2 || fullHouseFil.length == 3)
            {
                let fullHouseFil2 = fullHouseFil.filter((element)=> element != fullHouseFil[0]);
                if(fullHouseFil2.length == 0)
                    fullHousesum = nowDices.reduce((acc, cur) => acc + cur ,0);
            }
            else if(fullHouseFil.length == 0)
            {
                fullHousesum = nowDices.reduce((acc, cur) => acc + cur ,0);
            }
            fullHouse.textContent  = fullHousesum;
        }
        
        let sortarr = Fil;
        //S.straight;
        let smallStraight = document.querySelector('.SStraight :nth-child(2)');
        if(!smallStraight.classList.contains('scoreFixed')){
            let smallStraightsum = 0;
            sortarr.sort( (a,b) => a - b);
            if([1,2,3,4].filter(element => sortarr.includes(element)).length == 4 || [2,3,4,5].filter(element => sortarr.includes(element)).length == 4 || [3,4,5,6].filter(element => sortarr.includes(element)).length == 4)
            {
                smallStraightsum = 15;
            }
            smallStraight.textContent  = smallStraightsum;
        }
        
        //L.straight;
        let largeStraight = document.querySelector('.LStraight :nth-child(2)');
        if(!largeStraight.classList.contains('scoreFixed')){
            let largeStraightsum = 0;
            if([1,2,3,4,5].every((value, idx) => value === sortarr[idx]) || [2,3,4,5,6].every((value, idx) => value === sortarr[idx]))
            {
                largeStraightsum = 30;
            }
            largeStraight.textContent  = largeStraightsum;
        }
        
        //Yacht;
        let yacht = document.querySelector('.Yacht :nth-child(2)');
        if(!yacht.classList.contains('scoreFixed')){
            let yachtsum = 0;
            let yachtFil = nowDices.filter((element) => element != nowDices[0]);
            if(yachtFil.length == 0)
            {
                yachtsum = 50;
            }
            yacht.textContent  = yachtsum;
        }
        
    }
    else if(throwTurn.textContent == "Player 2's turn")
    {
        
            //ace
            let aces = document.querySelector('.Aces :nth-child(3)');
            if(!aces.classList.contains('scoreFixed'))
            {
                let acesum = nowDices.filter(element => element == 1).reduce((acc, cur) => acc + cur ,0);
                aces.textContent  = acesum;
            }
            
    
            //deuces;
            let deuces = document.querySelector('.Deuces :nth-child(3)');
            if(!deuces.classList.contains('scoreFixed'))
            {
                let deucesum = nowDices.filter(element => element == 2).reduce((acc, cur) => acc + cur ,0);
                deuces.textContent  = deucesum;
            }
            
    
            //Threes;
            let threes = document.querySelector('.Threes :nth-child(3)');
            if(!threes.classList.contains('scoreFixed'))
            {
                let threesum = nowDices.filter(element => element == 3).reduce((acc, cur) => acc + cur ,0);
            threes.textContent  = threesum;
            }
            
            
    
            //Fours;
            let fours = document.querySelector('.Fours :nth-child(3)');
            if(!fours.classList.contains('scoreFixed'))
            {
                let foursum = nowDices.filter(element => element == 4).reduce((acc, cur) => acc + cur ,0);
                fours.textContent  = foursum;
            }
            
            
    
            //Fives;
            let fives = document.querySelector('.Fives :nth-child(3)');
            if(!fives.classList.contains('scoreFixed'))
            {
                let fivesum = nowDices.filter(element => element == 5).reduce((acc, cur) => acc + cur ,0);
                fives.textContent  = fivesum;
            }
            
            
            //Sixes;
            let sixes = document.querySelector('.Sixes :nth-child(3)');
            if(!sixes.classList.contains('scoreFixed'))
            {
                let sixesum = nowDices.filter(element => element == 6).reduce((acc, cur) => acc + cur ,0);
                sixes.textContent  = sixesum;
            }
            
            
    
            //Choice;
            let choice = document.querySelector('.Choice :nth-child(3)');
            if(!choice.classList.contains('scoreFixed'))
            {
                let choicesum = nowDices.reduce((acc, cur) => acc + cur ,0);
                choice.textContent  = choicesum;
            }
            
    
            //중복 제거
            let Fil = nowDices.filter((element,index,arr) => arr.indexOf(element) == index);
    
            //4 of a Kind;
            let kind = document.querySelector('.Kind :nth-child(3)');
            if(!kind.classList.contains('scoreFixed'))
            {
                let kindFil = nowDices.filter((element) => element != nowDices[0]);
                let kindsum = 0;
                if(kindFil.length == 0 || kindFil.length == 1)
                {
                    kindsum = nowDices.reduce((acc, cur) => acc + cur ,0);
                }
                else if(kindFil.length == 4)
                {
                    let kindFil2 = kindFil.filter((element)=> element != kindFil[0]);
                    if(kindFil2.length == 0)
                    {
                        kindsum = nowDices.reduce((acc, cur) => acc + cur ,0);
                    }
                }
                kind.textContent  = kindsum;
            }
            
            
    
            //Full House;
            let fullHouse = document.querySelector('.FullHouse :nth-child(3)');
            if(!fullHouse.classList.contains('scoreFixed'))
            {
                let fullHouseFil = nowDices.filter((element) => element != nowDices[0]);
                let fullHousesum = 0;
                if(fullHouseFil.length == 2 || fullHouseFil.length == 3)
                {
                    let fullHouseFil2 = fullHouseFil.filter((element)=> element != fullHouseFil[0]);
                    if(fullHouseFil2.length == 0)
                        fullHousesum = nowDices.reduce((acc, cur) => acc + cur ,0);
                }
                else if(fullHouseFil.length == 0)
                {
                    fullHousesum = nowDices.reduce((acc, cur) => acc + cur ,0);
                }
                fullHouse.textContent  = fullHousesum;
            }
            
            let sortarr = Fil;
            //S.straight;
            let smallStraight = document.querySelector('.SStraight :nth-child(3)');
            if(!smallStraight.classList.contains('scoreFixed')){
                let smallStraightsum = 0;
                sortarr.sort( (a,b) => a - b);
                console.log(sortarr);
                if([1,2,3,4].filter(element => sortarr.includes(element)).length == 4 || [2,3,4,5].filter(element => sortarr.includes(element)).length == 4 || [3,4,5,6].filter(element => sortarr.includes(element)).length == 4)
                {
                    smallStraightsum = 15;
                }
                smallStraight.textContent  = smallStraightsum;
            }
            
            //L.straight;
            let largeStraight = document.querySelector('.LStraight :nth-child(3)');
            if(!largeStraight.classList.contains('scoreFixed')){
                let largeStraightsum = 0;
                if([1,2,3,4,5].every((value, idx) => value === sortarr[idx]) || [2,3,4,5,6].every((value, idx) => value === sortarr[idx]))
                {
                    largeStraightsum = 30;
                }
                largeStraight.textContent  = largeStraightsum;
            }
            
            //Yacht;
            let yacht = document.querySelector('.Yacht :nth-child(3)');
            if(!yacht.classList.contains('scoreFixed'))
            {
                let yachtsum = 0;
                let yachtFil = nowDices.filter((element) => element != nowDices[0]);
                if(yachtFil.length == 0)
                {
                    yachtsum = 50;
                }
                yacht.textContent  = yachtsum;
            }
    }    
}

let fixeddice = document.querySelector('.dices').children;
for(let i  = 0; i< fixeddice.length; i++)
{
    fixeddice[i].addEventListener('click',makeFixed);
}

let fixedscore = document.querySelectorAll('.player1Score, .player2Score');
for(let i = 0; i < fixedscore.length; i++)
{
    fixedscore.item(i).addEventListener('click',changeturn);
}

let btn = document.querySelector('.btn');
btn.addEventListener('click', rollDice);