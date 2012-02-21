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


