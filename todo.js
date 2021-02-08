var count = 0;
var addCharSet = [];
function addList(idTodo, idDate){
    let todoLists = document.getElementById('todoLists');
    let newList = document.getElementById(idTodo);
    let date = document.getElementById(idDate);
    if(checkNum(idDate) == 1){
        var addChar = '<li id="listAll"><input type="checkbox" name="option"><div id= list contentEditable="true">　'+ newList.value +'　</div><div id=datelist contentEditable="true">（'+date.value+'）</div></li>';//htmlに挿入する文字列     
        addCharSet[count] = addChar;//挿入する文字列を配列に格納(この配列をローカルストレージに保存)
        localStorage.setItem('todoList',JSON.stringify(addCharSet));//配列ごとローカルストレージに保存
        todoLists.insertAdjacentHTML('beforeend', addCharSet[count]);
        newList.value = "";
        date.value = "";
        count = count + 1;
    }else{
        let message = '期日は半角数字のみで入力してください(例:1225)';
        alert(message);
        date.value = "";
    }
};

function removeList(){
    let options = document.getElementsByName('option');//optionはチェックボックスのID
    var removeItem = JSON.parse(localStorage.getItem('todoList'));
    for(let i = 0; i < options.length; i++){
        if(options[i].checked){
            options[i].parentElement.remove();//checkboxの親要素を削除
            removeItem.splice(i, 1);
            localStorage.setItem('todoList', JSON.stringify(removeItem));
        }
    }
}

function checkNum(idDate){//数字なら１それ以外なら０を返す
    let kijitu = document.getElementById(idDate);
    var kijituNum = Number(kijitu.value)
    if(isNaN(kijituNum) == false){
        return 1;
    }else{
        return 0;
    }
}

function save(key, data){
    //var myData = document.getElementById(id).value
    localStorage.setItem(key, JSON.stringify(data));
}

function load(key){
    var outputData = localStorage.getItem(key);
    outputData = JSON.parse(outputData);
    for(var i = 0; i<outputData.length; i++){
        todoLists.insertAdjacentHTML('beforeend', outputData[i]);
    }
    localStorage.setItem('todoList',JSON.stringify(outputData));
}
/*
insertAdjacentHTML('挿入場所', 挿入文字列);
->html上で位置を指定し、そこに文字列を挿入する
innerHTMLは丸ごと差し替える時に使用する

parentElement:親要素を取得する、今回はチェックボックスがチェックれた時に行ごと消すために親要素を取得した

contentEditable="true"：これを書くことによって編集モードにすることが可能になる

isNaN()はNumber()で"aaa"のような文字列の型変換した時にNaNと表示されるため、NaNかどうかを判定するための関数
 */