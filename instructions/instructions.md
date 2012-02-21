# stage01

These are the instructions for stage01.


## Background

Chrome Extensions are a popular way to add all sorts of functionality to
everyone's favorite broswer. These extensions are written just like websites,
using HTML, CSS and JavaScript. Chrome Extensions are loaded into Chrome and
the browser then handles when and where the code is executed.

These extensions are given special access to functionality that is unavailable
to normal website, allowing for an extension to do things such as:

* cross-origin ajax
* chrome tabs management
* omnibar commands
* call the system file browser
* manage bookmarks
* etc.

as well as access to any HTML, CSS and JavaScript that can run in Chrome.

Because extensions are so closely related to standard web-development, the
process of making an extension is rather easy for a web-developer to pick
up.


## Steps

Chrome extensions are essentially a JSON manifest file that describes the
extension in terms of the permissions it requires and the scripts and pages
it uses. The general format for a JSON manifest file can be found in the
[Google Chrome Extensions API](http://code.google.com/chrome/extensions/manifest.html), and information about the JSON format can be found on 
[wikipedia](http://en.wikipedia.org/wiki/JSON).

A Chrome Extension's manifest.json file has 4 parts. The first one is
required for all extensions and contains tho extension's name and version. 
The second part contains recommended information about the extensions that
makes the extension more user-friendly. We'll leave discussion of the
remaining 2 parts for later, and for now we'll begin making our extension.
The first step is to make a manifest.json file: in an empty directory (or
any directory that does not already contain a chrome extension) create a file
named "manifest.json":

    vim manifest.json

this command will create the file and open it in vim for editing. This can
also be done using any other text editor or using most standard file-browsers.

As a JSON file, the contents of the manifest must be contained within curly 
brackets ("{", "}"). We then add the required fields (name and version):

    manifest.json
    ------------------
    {
        "name": "My Extension",
        "version": "1"
    }

The name field may be any valid JavaScript string and the version is a string
that contains between 1 and 4 integers (between 0 and 65536) seperated by
a period.

Well, believe it or  not, but the 4 lines of text you just wrote make up a
complete chrome extension. At this point it doesn't do anything, but it still
counts as an extensions. We can go ahead and add it to chrome. This is done
by openning the extensions options page by directing chrome at:
[chrome://chrome/extensions](chrome://chrome/extensions) or by selecting 
Tools -> Extensions from Chrome's Wrench menu. Once there, you wil need to
turn on Developer mode and now you can load our extension by clicking on 
"Load unpacked extension" and openning the folder where we saved the
manifest file.

If you have any other extensions loaded, you'll see that our extension doesn't
quite fit in. This is easily solved by adding some more information to our
manifest file (this part requires there to be a ".png" file the same folder
as the manifest file, "icon.png" is provided in this repository):

    
    manifest.json
    ------------------
    {
        "name": "My Extension",
        "version": "1.1",

        "icons": {"48": "icon48.png"},
        "description": "A simple extension that doesn't do much"
    }

After we save our changes, we can easily reload the new version by openning
the extensions page in chorme (see above) and clicking "reload" under our 
Extension's section (if you don't see the link, ensure that you have Developer
mode turned on).

## Stage 1 end

Ok, if you've followed along until now, you should have successfully loaded
your extension into chrome. If it didn't work for you, this might be a good
time to ask for help (assuming you're reading this during our WIT meeting),
alternatively, you can continue to stage02 where the file is completed for
you by using a 'git checkout' command:

    git checkout stage02


# stage02

These are the instructions for stage02.

## Background

In this section we'll go ahead and implement some of the components
that make up a complete chrome extension.

Generally, a chrome extension is made of a few html pages that may
or may not be interactive to the user. The most common one is the
background.html file which is where code that runs in the background
of chrome runs. In most cases, this will be the "Controller" of an 
extension and contain JavaScript code that will query events and
trigger your Extension's operations. 

Another file is the popout.html file that is the popout you see when
you click on the icon of some chrome extensions. This file generally
contains quick options or a way for the user to activate the extension.

Finally, there's an options.html file that appears from a link on the
"Manage Extensions" page in chrome's options. This page is used to
manage your program's settings.


## Steps

As it was in stage01, our changes begin from hte manifest.json file.
We begin by making a background.html file and setting it up in our 
manifest.

    -----------------------------
    background.html
    -----------------------------
    <html>
        <script>
            //this is where our code will go
        </script>
    </html>
    
    ----------------------------
    popup.html
    ----------------------------
    <html>
      <body>
        <h1>POPUP</h1>
      </body>
    </html>

    ----------------------------
    options.html
    ----------------------------
    <html>
      <body>
        <h1>OPTIONS</h1>
      </body>
    </html>

    ----------------------------
    manifest.json
    ----------------------------
    {
        //previous content from stage01
        "name": "My Extension",
        ...,
        //new content goes here
        "background_page": "background.html",
        "browser_action": {
            "default_icon": "icon48.png",
            "default_title": "My Extension",
            "default_popup": "popup.html"
        },
        "options_page": "options.html"
    }

Now that we make these changes, we can reload the extension (see stage01 instructions on how to
reload) and we should immediately see the icon we have for the extension appear next to our 
address bar. Now that we have a popup and an options page we can also click on that icon or
right click on the icon and select "options". If everything went right, you should see a nice
"POPUP" message and an options page that has a similar "OPTIONS" message.

This means that we're now readdy to add some content to make our extension do some cool stuff.
And we will, in stage03, which can be loaded using a simple git checkout command:

    git checkout stage03

or by just continuing on from where you are.



# stage03

These are the instructions for stage03.


## Background

So, if you're here, I'm assuming that you have a working chrome extension with an icon,
a popup, an options page and a background page. If not, you may have made it here by accident,
try loading stage02 (or stage01 if you haven't even started yet).

    git checkout stage02

Otherwise, let's move on. In this stage we'll turn our overly generic extension into a
customized utility that does something cool. Feel free to branch off and make whatever changes
you want to make the extension customized, but if you're not porticularly good with JavaScript,
or if you're still a little lost, you may want to copy the example in this tutorial while
you're still learning.


## Steps

In this tutrial we'll make an extensions that keeps a log of links that appear on pages
you've visited. Then, by openning up the extension's popup, the user can open one of those
pages at random.

We have a few choices as far as how we're going to code this extension goes. Depending on 
preference, you may want to start with some of the javascript that scraps the page for links
or perhaps start from making an options page. In this example, I'll start with the options
page, since it better serves the purpose of learning chorme extensions and tends to be a 
better design strategy.

## The Option Page

One of the most important feature that seperate extensions from just any web-app, is the fact
that they use localStorage (which is available for web sites, but isn't nearly as extensively
used). Chrome also supports options sync (using the standard chrome-sync), although
documentation for it is a bit lacking at the moment.

The options page itself, is just a simple html document that is given special privileges by
Chrome. In this case, it has access to any one of the many APIs open only for extensions.

We begin by making the HTML doument where the user will change options. The document itself
has a form and two javascript functions, one that loads the current options, and another one
that saves the current options. For our extension, we'll have the user input the option of
how many records it would like to keep as well as the option to view and edit current records.

Here's the basic HTML for the page:

    --------------------
    options.html
    --------------------
    <html>
      <head>
        <script>
            function save_records(){
            }
            function load_records(){
            }
        </script>
      </head>
      <body onload="load_reconds()">
        <h2>Options</h2>
        <p>You can change the options for the extension here</p>
        <p><label>Keep <input type="number" id="recnum" /> links</label></p>
        <p>View links</p>
        <select id="records" multiple="multiple" size="20">
        </select>
      </body>
    </html>

feel free to save and load with this document saved. You should see our form appear when you
open up the options page for our extension.

Next, we'll write the JavaScript for the save and load functions.

The main idea, is that we'll use the chrome extensions API for saving to the "sync" data that
is kept or our extension. This API can be found [here](http://code.google.com/chrome/extensions/trunk/storage.html). We'll also use the standard document.getElementById() and
document.createElement() to get the contents of the <select> and <input> as well as append
new options to the list.

Here's a sample code for the save_records() function:

    function save_records(){
        //load the DOM elements into our JavaScript as Variables
        var recnum = document.getElementById('recnum').value;
        var records = document.getElementById('records').children;
        //create an empty array
        var recs = [];
        for (i=0; i<records.length; i++){
            //append the innerHTML (the text you see) for all the links in the <select>
            recs.push(records[i].innerHTML);
        }
        //save our records to the synchronizing localStorage
        localStorage.recs = recs;
        localStorage.recnum = recnum;
    }

And sample code for the load_records() function:

    function load_records(){
        //load information from the sync storage into JavaScript variables
        var recnum = localStorage.recnum;
        var records = localStorage.recs;
        //set the 'recnum' box
        document.getElementById("recnum").value = recnum;
        //clear the old contents of 'records'
        document.getElementById("records").innerHTML = "";
        //for each link found in the variable records, append a new <option> to 'records'
        for (i=0; i < records.length; i++){
            document.getElementById("records").appendChild(
                (function(text){
                    var q = document.createElement("option");
                    q.innerHTML = text;
                    return q;
                })(records[i])
            )
        }
    }

A possible issue with our load_records() function is that it will fail if we don't have
a value for "recnum" and "recs" in our local storage. Therefore, we will add a short script
to our backrgound.html page which will set those to some default values if they don't exist
already.

    ---------------------------
    background.html
    ---------------------------
    <html>
      <script>
      localStorage.recnum = localStorage.recnum || 100;
      localStorage.recs = localStorage.recs || JSON.stringify([]);
      </script>
    </html>

The code we just placed in our backgroud page utilizes a popular JavaScript trick which relies
on the fact that when objects aren't initialized in JavaScript they are Null. Therefore
the logical-or (||) of an uninitialized value and an actual value is the actual value.

You can try this in Chrome's JavaScript console (ctrl+shift+j to open) by typing:

    document.dousnotexist || 1

If you reload the extension and open the options page, you should see that the links section
is now initialized to 100.

By openning the javascript console in our options page and on the background page (a link is 
available in the extension's settings page under the section for your extension) you can 
inspect any errors which may exist in your code.

Finally, we should probably add the ability to save our settings in the options page. To do
that, we simply need to add a binding to our save_records() function. For now, we can just
use the "onchange" event of the <input> tag:

    <p><label>Keep <input type="number" id="recnum" onchange="save_records()" /> links</label></p>

Now that our options work correctly, we can move on to writing the main functionality of the
app. This will be done in the next stage, you can load stage04 using a git-checkout command:

    git checkout stage04


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



# stage05

These are the instructions for stage04.

## Background

Congratulation on making it to the 5th and final stage of this extension demo! This is
the stage where we add the interesting functionality of picking a random link from the 
links we gathered and redirecting the user to that link. 

## Steps

As you've noticed before, we have a convinient little popup.html page that shows up
everytime we press the extension icon next to the address bar. Let's go ahead and put
our button there. We start by editing the HTML to include a littel button that has a
javascript function on its "onclick" event:

    -------------------
    popup.html
    -------------------
    <html>
        <head>
            <script>
                function randlink(){
                }
            </script>
        </head>
        <body>
            <button onclick = "randlink()" style="margin:auto">Surprise me</button>
        </body>
    </html>

now, let's wiret that randlink() function. What the function needs to do is read the
entry in localStorage for our links, parse it, and then select a link in randem. Then
it will create a new tab in chrome and send the user to that tab. One of the things we'll
have to do is use the chrome.tabs api which is available only to extensions.

    -------------------
    popup.html
    -------------------
    ...
    function randlink(){
        //only do stuff if we have links in our storage
        if (localStorage.recs){
            //parse that JSON
            var recs = JSON.parse(localStorage.recs);
            var id = Math.round(Math.random()*recs.length);
            //open a new tab to that url
            chrome.tabs.create({"url":recs[id]});
        }
    }

At this point the extension is fully functional, but we may want to go into our manifest
file and change the extension's name, description and version number (version number
is actually important for chrome extensions becaus they support automatic updating which
is entirely based on this value on the manifest).

    {
        ...
        "name": "Links Surprise!",
        "description": "keeps track of links on visited page and then picks one at random",
        "version": "1.3",
        ...
    }


And there you have it. We just made a fully operational chrome extension that does some
cool stuff. More API information can be found [here](http://code.google.com/chrome/extensions/index.html), and if you're attending WIT while I'm giving this demo and I have some 
time at the end, I'll also go over how to use this API to add some extra stuff to your
extension.

You may see the final product by switching to the "final" tag:

    git checkout final


