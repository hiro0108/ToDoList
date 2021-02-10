var count = 0;
var addCharSet = [];

$(document).ready(function(){
    $("#myTable").tablesorter({
        headers: {
            0: { sorter: false},
            1: { sorter: false},
            2: { sorter: "digit"}
        }
    });
});

function addList(idTodo, idDate){
    let todoLists = document.getElementById('todoLists');
    let newList = document.getElementById(idTodo);
    let date = document.getElementById(idDate);
    let year = document.getElementById("year");
    if(checkNum(idDate) && checkNum('year') == 1){
        var addChar = '<tr><td><input type="checkbox" name="option" id="check"></td><td contentEditable="true">'+ newList.value +'</td><td contentEditable="true">'+ year.value +'/'+ date.value +'</td></tr>';//htmlに挿入する文字列     
        addCharSet[count] = addChar;
        localStorage.setItem('todoList',JSON.stringify(addCharSet));
        todoLists.insertAdjacentHTML('beforeend', addCharSet[count]);
        $("#myTable").trigger("update");
        newList.value = "";
        date.value = "";
        count = count + 1;
    }else{
        let message = '年と期日は半角数字のみで入力してください(例:1225)';
        alert(message);
        date.value = "";
        year.value = "";
    }
}


function removeList(){
    let options = document.getElementsByName('option');
    var removeItem = JSON.parse(localStorage.getItem('todoList'));
    for(let i = 0; i < options.length; i++){
        if(options[i].checked){
            options[i].parentElement.parentElement.remove();
            removeItem.splice(i, 1);
            localStorage.setItem('todoList', JSON.stringify(removeItem));
        }
    }
}

function checkNum(idDate){
    let kijitu = document.getElementById(idDate);
    var kijituNum = Number(kijitu.value)
    if(isNaN(kijituNum) == false){
        return 1;
    }else{
        return 0;
    }
}

function load(key){
    var outputData = localStorage.getItem(key);
    outputData = JSON.parse(outputData);
    for(var i = 0; i<outputData.length; i++){
        todoLists.insertAdjacentHTML('beforeend', outputData[i]);
    }
    localStorage.setItem('todoList',JSON.stringify(outputData));
    $("#myTable").trigger("update");
}
