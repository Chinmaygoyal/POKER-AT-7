var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0;
var calcHand = function(a,b,c,d,e)
{
    var suitc = new Array(4);
    var valuec = new Array(13);
    var threes=0;
    var twos=0;
    var fours=0;
    var f=0;
    var x=0;
    for(var j=0;j<4;j++)
    {
        suitc[j]=0;
    }
    for(var j=0;j<13;j++)
    {
        valuec[j]=0;
    }
    var k=[a,b,c,d,e];
    /*for(i=0;i<5;i++)
    {
         for(j=0;j<4-i;j++)
        {
            if(play.allcards.bot_hand[k[j]].suit > play.allcards.bot_hand[k[j+1]].suit)
            {
                k[j+1]=k[j]+k[j+1];
                k[j]=k[j+1]-k[j];
                k[j+1]=k[j+1]-k[j];
            }
        }
    }*/
    for(i=0;i<5;i++)
    {
        for(j=0;j<4-i;j++)
        {
            if(play.allcards.bot_hand[k[j]].value > play.allcards.bot_hand[k[j+1]].value)
            {
                k[j+1]=k[j]+k[j+1];
                k[j]=k[j+1]-k[j];
                k[j+1]=k[j+1]-k[j];
            }
        }
    }
    for (var i=0;i<5;i++)
    {
        for(var j=0;j<4;j++)
        {
            if(play.allcards.bot_hand[k[i]].suit == j)
            {
                suitc[j]++;
            }
        }
        for(var j=0;j<13;j++)
        {
            if(play.allcards.bot_hand[k[i]].value == j)
            {
                valuec[j]++;
            }
        }            
    }
    for(i=0;i<13;i++)
    {
        if(valuec[i]==2)
        {
            twos++;
        }
        else if(valuec[i]==3)
        {
            threes++;
        }
        else if(valuec[i]==4)
        {
            fours++;
        }
    }
    for(i=0;i<4;i++)
    {
        if(suitc[i]==5)
        {
            f=1;
        }
    }
    if(play.allcards.bot_hand[k[4]].value-play.allcards.bot_hand[k[1]].value==3 && play.allcards.bot_hand[k[4]].value-play.allcards.bot_hand[k[0]].value==12 && f==1)
    {
        x=1;
    }
    else if(play.allcards.bot_hand[k[4]].value-play.allcards.bot_hand[k[0]].value==4 && f==1)
    {
        x=2;
    }
    else if(f==0 && fours == 1)
    {
        x=3;
    }
    else if(f==0 && threes==1 && twos==1)
    {
        x=4;
    }
    else if(f==1)
    {
        x=5;
    }
    else if(play.allcards.bot_hand[k[4]]-play.allcards.bot_hand[k[0]]==4)
    {
        x=6;
    }
    else if(threes==1)
    {
        x=7;
    }
    else if(twos==2)
    {
        x=8;
    }
    else if(twos==1)
    {
        x=9;
    }
    else
    {
        x=10;
    }
    return x;
}


var botTurn1 = function()
{
    t1++;
    if(foldplayer == 1)
    {
        bot_bet(0);
    }
    else if(allinplayer == 1)
    {
        if(play.allcards.bot_hand[5].value == 0 || play.allcards.bot_hand[5].value >=7 || play.allcards.bot_hand[6].value == 0 || play.allcards.bot_hand[6].value >= 7 || play.allcards.bot_hand[6].value == play.allcards.bot_hand[5].value)
        {
            bot_allin();
        }
        else
        {
            bot_fold();
        }
    }
    else
    {
        //if(play.allcards.bot_hand[5].value == 0 || play.allcards.bot_hand[5].value >=9 || play.allcards.bot_hand[6].value == 0 || play.allcards.bot_hand[6].value >=9 || play.allcards.bot_hand[6].value == play.allcards.bot_hand[5].value || play.allcards.bot_hand[6].value == play.allcards.bot_hand[5].value + 1 || play.allcards.bot_hand[6].value == play.allcards.bot_hand[5].value -1)
        bot_bet(playerbet);
    }
}

var botTurn2 = function()
{
    t2++;
    var x = calcHand(0,1,2,5,6);
    console.log(x);
    console.log(k[x-1]);
    if(foldplayer == 1)
    {
        bot_bet(0);
    }
    else if(allinplayer == 1)
    {
        if(x <= 8)
        {
            bot_allin();
        }
        else
        {
            bot_fold();
        }
    }
    else
    {
        if(x <= 4)bot_allin();
        else if(x <=8 && botmoney >= playerbet + 10 - botbet && t2<=2 && playerbet + 10 <= limit)bot_bet(playerbet + 10 - botbet);
        else if(botmoney >= playerbet - botbet)bot_bet(playerbet - botbet);
        else bot_fold();
    }
}

var botTurn3 = function()
{
    t3++;
    var x1 = calcHand(0,1,2,5,6);
    var x2 = calcHand(0,1,3,5,6);
    var x3 = calcHand(0,3,2,5,6);
    var x4 = calcHand(3,1,2,5,6);
    var x5 = calcHand(0,1,2,5,3);
    var x6 = calcHand(0,1,2,3,6);
    var x = Math.min(x1,x2,x3,x4,x5,x6);
    console.log(x);
    console.log(k[x-1]);
    if(foldplayer == 1)
    {
        bot_bet(0);
    }
    else if(allinplayer == 1)
    {
        if(x <= 6)
        {
            bot_allin();
        }
        else
        {
            bot_fold();
        }
    }
    else
    {
        if(x<=3)bot_allin();
        else if(x<=7 && botmoney >= playerbet + 10 - botbet && t3 <= 3 && playerbet + 10 <= limit)bot_bet(playerbet + 10 - botbet);
        else if(x<=9 && botmoney >= playerbet - botbet)bot_bet(playerbet - botbet);
        else bot_fold();
    }
}

var botTurn4 = function()
{
    t4++;
    var x1 = calcHand(0,1,2,3,4);
    var x2 = calcHand(0,1,2,3,5);
    var x3 = calcHand(0,1,2,4,5);
    var x4 = calcHand(0,1,3,4,5);
    var x5 = calcHand(0,2,3,4,5);
    var x6 = calcHand(1,2,3,4,5);
    var x7 = calcHand(0,1,2,3,6);
    var x8 = calcHand(0,1,2,4,6);
    var x9 = calcHand(0,1,3,4,6);
    var x10 = calcHand(0,2,3,4,6);
    var x11 = calcHand(1,2,3,4,6);
    var x12 = calcHand(0,1,2,5,6);
    var x13 = calcHand(0,1,3,5,6);
    var x14 = calcHand(0,2,3,5,6);
    var x15 = calcHand(1,2,3,5,6);
    var x16 = calcHand(0,1,4,5,6);
    var x17 = calcHand(0,2,4,5,6);
    var x18 = calcHand(1,2,4,5,6);
    var x19 = calcHand(0,3,4,5,6);
    var x20 = calcHand(1,3,4,5,6);
    var x21 = calcHand(2,3,4,5,6);
    var x = Math.min(x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21);
    console.log(x);
    console.log(k[x-1]);
    if(foldplayer == 1)
    {
        bot_bet(0);
    }
    else if(allinplayer == 1)
    {
        if(x <= 4)
        {
            bot_allin();
        }
        else
        {
            bot_fold();
        }
    }
    else
    {
        if(x<=2)bot_allin();
        else if(x<=6 && botmoney >= playerbet + 10 - botbet && t4 <= 4 && playerbet + 10 <= limit)bot_bet(playerbet+10 - botbet);
        else if(x<=8 && botmoney >= playerbet - botbet)bot_bet(playerbet - botbet);
        else bot_fold();
    }
}