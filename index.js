count=0
game = true;
const img_x = document.querySelector('.img_x');
const img_o = document.querySelector('.img_0');
const result =  document.querySelector('.result');
const error = document.querySelector('.error');
const error_msg = 'WHAT!!!';
const win_color = '#07ab48';
const box_color = 'rgb(130, 78, 212)';
const button_1 = document.querySelector('.button_1');


// x->1,y->2
var values=[[0,0,0],[0,0,0],[0,0,0]];
var win_value = [0,0,0];

// horizontal check
function horizontal(){

    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            if(values[i][j]==1){
                win_value[j] = j+(i*3);
                winner = true;
            }else{
                winner = false;
                break;
            }
        }

        if(winner){
            return 'X';
        }

        for(j=0;j<3;j++){
            if(values[i][j]==2){
                win_value[j] = j+(i*3);
                winner = true;
            }else{
                winner = false;
                break;
            }
        }

        if(winner){
            return 'O';
        }
    }

    return null;
}

// vertical check
function vertical(){
    ver_arr = [0,0,0];

    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            ver_arr[j] = values[j][i];
            win_value[j] = i+(j*3);
        }

        for(k=0;k<3;k++){
            if(ver_arr[k]==1){
                winner = true;
            }
            else{
                winner = false;
                break;
            }
        }
        if(winner){
            return 'X';
        }

        for(k=0;k<3;k++){
            if(ver_arr[k]==2){
                winner = true;
            }
            else{
                winner = false;
                break;
            }
        }
        if(winner){
            return 'O';
        }

        for(j=0;j<3;j++){
            ver_arr[j] = 0;
        }
    }   

    return null;
}

// diagonal check
function diagonal(){

    cond1_x = values[0][0]==1 && values[1][1]==1 && values[2][2]==1;
    cond2_x = values[0][2]==1 && values[1][1]==1 && values[2][0]==1;
    cond1_y = values[0][0]==2 && values[1][1]==2 && values[2][2]==2;
    cond2_y = values[0][2]==2 && values[1][1]==2 && values[2][0]==2;

    if(cond1_x || cond2_x){
        if(cond1_x) win_value=[0,4,8];
        if(cond2_x) win_value=[2,4,6];

        return 'X';
    }else if(cond1_y || cond2_y){
        if(cond1_y) win_value=[0,4,8];
        if(cond2_y) win_value=[2,4,6];

        return 'O';
    }

    return null;
}

function clicked(e,item){

    // remove error if present
    if(error.innerHTML.trim()!=''){
        error.innerHTML='';
    }

    value_1 = Math.floor(item/3);
    value_2 = item%3;

    if(game){
        if(count%2==0){
                if(e.innerHTML.trim()==''){
                    e.innerHTML = '<img class="img_x" src="img/x.svg" alt="x">';
                    values[value_1][value_2]=1;
                }else{
                    error.innerHTML = error_msg;
                    count--;
                }
            
        }else{
                if(e.innerHTML.trim()==''){
                    e.innerHTML = '<img class="img_o" src="img/o.svg" alt="o">';
                    values[value_1][value_2]=2;

                }else{
                    error.innerHTML = error_msg;
                    count--;
                }
            }
        count++;
    }

    // Check win condition
    not_draw = true;
    win = horizontal();
    if(win==null){
        win = vertical();
        if(win==null){
            win = diagonal();
            if(win==null && count==9){
                result.innerHTML = 'Match draw';
                game = false;
                not_draw =false;
            }else if(win){
                game = false;
            }
        }else{
            game = false;
        }
    }else{        
        game = false;
    }  
    
    if(game==false && not_draw){
        result.innerHTML = 'Match won by '+win;
        for(i=0;i<3;i++){
            var name = '.a'+win_value[i];
            var a = document.querySelector(name);
            a.style.backgroundColor = win_color;
        }
    }

    if(game==false){
        button_1.style.display = 'block';
    }
}

function newgame(){
    for(i=0;i<3;i++){
        var name = '.a'+win_value[i];
        var a = document.querySelector(name);
        a.style.backgroundColor = box_color;
    }
    count = 0;
    game = true;
    values=[[0,0,0],[0,0,0],[0,0,0]];
    win_value = [0,0,0];
    result.innerHTML='';
    var all_img = document.querySelectorAll('.box');

    for(i=0;i<all_img.length;i++)
    all_img[i].innerHTML = '';

    // Hiding button for new game
    button_1.style.display = 'none';

}