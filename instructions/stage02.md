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

or by just continuing on from where you are
