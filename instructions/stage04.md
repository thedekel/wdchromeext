# stage04

These are the instructions for stage04.

## Background

Now that our extension has the capacity to store our options, it's probably a good idea
to include some of the extension's main functionality in our code. If you happened to
forget, I'll remind you that the extension is designed to scrap all links on the pages
the user visits, store them, and (when invoked) redirect the user to any one of those
links in random. As you may expect, this code will be done in JavaScript.

## Steps

What we're trying to do is add something that chrome refers to as  a "Content Scripts".
Content Scripts are script file that chrome will run on specific pages. It's important
to note that these script exist within their own JavaScript scope, but still have access
to the DOM of the page they are executed on. That means that if a command such as:

    document.getElementsByTagName("body")[0].innerHTML = "";

existed in a content script file, chrome will execute it and turn every page that the
script is configured to run on into an empty page.

On the other hand, if a webpage contains a javascript file that defines variables, e.g.:

    -----------------
    somescript.js
    ----------------
    var hammer = "time";
    ...
    //some code
    ...

we wouldn't be able to use that variable in our code (which is a good thing, because we
want to separate our code from the code that's a part of the website).

These content script also have access to the same localStorage used by the other parts of
our extension (which is where we stored our options).

Now to the actual code. What we want to do is scrap all the links on a page and store
them in our localStorage. Since the content script is a part of the page it's on, we can't
use localStorage as we did before. Therefore we'll use an "extension.sendRequest()"
command and have our background.html page handle saving the data for us. We would want 
to put this in a new javascript file, let's call it "linkscrap.js"

    -------------------------
    linkscrap.js
    -------------------------
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
            //append the href of the link in question to an array
            recs.push(atags[i].href);
        }
    }
    //send a JSON object of the array we made to our background.html page
    chrome.extension.sendRequest(JSON.stringify(recs));

Now we need to add a simple intercepting event handler for this request in our
background.html

    ------------------
    background.html
    ------------------
    <html>
        <script>
            localStorage.recnum = localStorage.recnum || 100;
            localStorage.recs = localStorage.recs || JSON.stringify([]);
            chrome.extension.onRequest.addListener(function(req){
                localStorage.recs = req;
            });
        </script>
    </html>

and now we need to let our manifest.json file know that we have a content script we would
like it to run on every page. Add the following to your manifest file (note that if this
isn't the first object in the JSON object, the line before it will need to have a "," at
the end of it:

    -----------------------
    manifest.json
    -----------------------
    {
        "name": "My Extension",
        ...
        "content_scripts": [
            {
                "matches": ["http://*/*"],
                "js": ["linkscrap.js"]
            }
        ], //this comma shouldn't be here if there's nothing after this object
        ...
    }

Now, go to a random webpage that has some links on it and then visit our extension's page,
you should see some links appear in the "links" <select> area.

