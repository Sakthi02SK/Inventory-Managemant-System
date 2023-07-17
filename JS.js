var s = [
    ["Apple", "Salem", 100],
    ["Mango", "Erode", 200],
    ["Grapes", "Chennai", 300],
    ["Banana", "Madurai", 500]
];
var t = []; 
if (localStorage.getItem("s")) {
    s = JSON.parse(localStorage.getItem("s"));
}
if (localStorage.getItem("t")) {
    t = JSON.parse(localStorage.getItem("t"));
}
s.sort();
function generateTable(data) {
    var table = '<table><tr> <th>ID</th> <th>Product</th> <th>Ware House</th> <th>Quantity</th> </tr>';
    for (var i = 0; i < data.length; i++) {
      table += `<tr><td>${i+1}</td>`;
      for (var j = 0; j < data[i].length; j++){
        table += '<td>' + data[i][j] + '</td>';
    }
    table += '</tr>';
    }
    table += '</table>';
    return table;
}
try{
    document.querySelector("main").innerHTML = generateTable(s);
}
catch{
    console.log();
}
function overview(){
    window.location.href = "index.html";
}

function transfer(){
    window.location.href = "transfer.html";
}

function listproducts(data){
    var temp = "";
    for(var i=0;i<data.length;i++){
        temp += `<option value="${data[i][0]}">${data[i][0]}</option>`;
    }
    return temp;
}
try{
    document.getElementById("mySelect").innerHTML = listproducts(s);
}
catch{
    console.log();
}
function listloc(data){
    var temp = "";
    for(var i=0;i<data.length;i++){
        temp += `<option value="${data[i][1]}">${data[i][1]}</option>`;
    }
    return temp;
}
try{
    document.getElementById("fromloc").innerHTML = listloc(s);
}
catch{
    console.log();
}
function tranferitem(){
    var pro = document.getElementById("mySelect").value;
    var from = document.getElementById("fromloc").value;
    var to = document.getElementById("toloc").value;
    var qty = document.getElementById("transqty").value;
    if(qty != ""){
        var c = 0;
        for(var i = 0;i<s.length;i++){
            if(pro == s[i][0] && from == s[i][1]){
                c = 1;
                if(qty <= s[i][2]){
                    s[i][2] -= qty;
                    if(s[i][2] == 0){
                        s[i][1] = to;
                        s[i][2] = qty;
                    }
                    else{
                        s.push([pro,to,qty]);
                    }
                    t.push([pro, from, to, qty]);
                    localStorage.setItem("t", JSON.stringify(t));
                    localStorage.setItem("s", JSON.stringify(s));
                    window.location.href = "index.html"
                    alert("Transfered");
                }
                else{
                    alert(`Please enter quantity below ${s[i][2]}`);
                }
            }
        }
        if(c == 0){
            alert("Select correct option");
        }
    }
    else{
        alert("Enter Quantity");
    }
}

function additem(){
    window.location.href = "additem.html";
}

function addpro(){
    var name = document.getElementById("proname").value;
    var loc = document.getElementById("proloc").value;
    var qty = parseInt(document.getElementById("proqty").value, 10);
    var c = 0;
    if(name!="" && loc!="" && qty!=""){
        for(var i=0; i<s.length;i++){
            if(s[i][0] == name && s[i][1] == loc){
                s[i][2] = parseInt(s[i][2], 10) + qty;
                c = 1;
                break;
            }
        }
        if(c==0){
            s.push([name,loc,qty]);
        }
        localStorage.setItem("s", JSON.stringify(s));
        window.location.href = "index.html";
    }
    else{
        alert("Enter details to add items");
    }
}

function history(){
    window.location.href = "history.html";
}

function historyTable(data) {
    var table = '<table><tr> <th>ID</th> <th>Product</th> <th>From</th> <th>To</th> <th>Quantity</th> </tr>';
    for (var i = 0; i < data.length; i++) {
      table += `<tr><td>${i+1}</td>`;
      for (var j = 0; j < data[i].length; j++){
        table += '<td>' + data[i][j] + '</td>';
    }
    table += '</tr>';
    }
    table += '</table>';
    return table;
}
try{
    document.getElementById("historytable").innerHTML = historyTable(t);
}
catch{
    console.log();
}

function edit(){
    window.location.href = "edit.html";
}

function edititem(){
    var pro = document.getElementById("mySelect").value;
    var loc = document.getElementById("loc").value;
    var qty = document.getElementById("editqty").value;
    if(pro!="" && loc!="" && qty!=""){
        for(var i=0; i<s.length;i++){
            if(s[i][0] == pro){
                s[i][1] = loc;
                s[i][2] = qty;
                break;
            }
        }
        alert("Successfully edited");
        localStorage.setItem("s", JSON.stringify(s));
        window.location.href = "index.html";
    }
    else{
        alert("Please fill the option");
    }
}

function deleteitem(){
    var pro = document.getElementById("mySelect").value;
    for(var i=0; i<s.length;i++){
        if(s[i][0] == pro){
            s.splice(i,1);
            break;
        }
    }
    alert("Deleted");
    localStorage.setItem("s", JSON.stringify(s));
    window.location.href = "index.html";
}