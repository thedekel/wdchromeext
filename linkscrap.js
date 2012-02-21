// fetch all the anchor (<a>) tags, save into a variable
var atags = document.getElementsByTagName("a");
//load the currently saved records into a javascript variable
var recs = [];
if (localStorage.recs){
    recs = JSON.parse(localStorage.recs);
}
var nums = 100;
if (localStorage.recnum){
    nums = parseInt(localStorage.recnum);
}
//iterate over all elements of this new list
for (i=0; i<atags.length; i++){
    console.log(atags[i].href);
    //check (using regex) if the href field of the <a> tag is a valid link
    if (/^http:./i.test(atags[i].href)){
        //check to see the length of our records and remove an item if it's at the max
        if (recs.length == nums){
            recs.shift();
        }
        recs.push(atags[i].href);
    }
}
//send a JSON object of the array we made to our background.html page
chrome.extension.sendRequest(JSON.stringify(recs));
