// 修改H1
// let myHeading=document.querySelector('h1');
// myHeading.textContent="Hello world";

// 点击切换图片
let myImage=document.querySelector('img');
myImage.onclick=function(){
    let mySrc=myImage.getAttribute('src');
    if(mySrc==='images/firefox-icon.png'){
        myImage.setAttribute('src','images/firefox2.png');
    }else{
        myImage.setAttribute('src','images/firefox-icon.png');
    }
}

// 切换用户
let myButton=document.querySelector('button');
let myHeading=document.querySelector('h1');

function setUserName(){
    let myName=prompt('输入你的名字');
    if(!myName||myName==null){
        setUserName();
    }else{  
        localStorage.setItem('name',myName);
        myHeading.textContent='Mozilla 酷，'+myName;
    }
}

// 第一次运行
if(!localStorage.getItem('name')){
    alert('running');
    setUserName();
}else{
    let storedName=localStorage.getItem('name');
    myHeading.textContent='Mozilla 酷，'+storedName;
}

myButton.onclick=function(){
    setUserName();
}