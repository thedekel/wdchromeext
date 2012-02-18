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

