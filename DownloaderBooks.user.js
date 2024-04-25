/* global $ */
// ==UserScript==
// @name         DownloaderBooks (book.ru)
// @namespace    https://github.com/maxdurov
// @version      1.0.0
// @description  Helper for download books on the book.ru
// @author       Max D.
// @match        https://reader.new.book.ru/*
// @icon         none
// @grant        none
// @updateURL    https://github.com/maxdurov/DownloaderBooks/blob/main/DownloaderBooks.user.js
// @downloadURL  https://github.com/maxdurov/DownloaderBooks/blob/main/DownloaderBooks.user.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==


 function handler(){
    console.log("click");
  $('#snif').attr('disable', 'true');
    $('#snif').text("0%");
  let a = $(document).find("#scrollContainer").children();
$('#Container')[0].onscroll = async()=>{
    for (let i = 0; i < a.length; i++){
        if(window.sniff.dwnlist.indexOf(i) === -1){
        let b = $(a[i]).find("img[src*='https://reader.new.book.ru/']");
        if(b.length !== 0){
            $('#snif').text((Math.round(i/a.length*100)) + "%");
            console.log(b);
            console.log("find img")
            window.sniff.srclist.push($(b).attr('src'));
            window.sniff.dwnlist.push(i);
            await download($(b).attr('src'), (i+1)+".png");
        }
       }

    }
}
}

function init(){
    window.sniff = {}
    window.sniff.handler = handler;
    window.sniff.download = download;
    window.sniff.dwnlist = [];
    window.sniff.srclist = [];
    window.sniff.count = $(document).find("#scrollContainer").children().length;
    $(".aux-actions").append("<button id='snif' style='margin:auto; color:blue; background:#e6e7e9; border-radius: 5px; padding: 5px'>Activate</button>");
    $('#snif').click(window.sniff.handler);
}

async function download(url, name){
    await new Promise((res, rej)=>{

    fetch(url)
    .then(res => res.blob())
    .then(blob => {
        let link = document.createElement("a");
        link.download = name
        link.href = URL.createObjectURL(blob);
        link.click()
        URL.revokeObjectURL(link.href)
        link.remove()
        res(true);
    })
    });
}

(function() {
    'use strict';

    console.log("init");
    window.onload = ()=>{
    init();
    }
})();