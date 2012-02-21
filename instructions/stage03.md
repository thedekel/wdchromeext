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
      <body onload="load_records()">
        <h2>Options</h2>
        <p>You can change the options for the extension here</p>
        <p><label>Keep <input type="number" id="recnum" /> links</label></p>
        <p>View links</p>
        <select id="records" multiple="multiple" size="20" style="width:300px">
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
