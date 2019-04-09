# On Boarding Project

This is a simple galley application that examinate transition to tech stack: React + Mobx + RxJS

Before start run script that will generate gallery content and start basic "json-server": 
**sh start.sh**

Step 0. Basic plain ES6 JavaScript project.
In this step all code in one main.js file.
This is a simple MVC structure with passive model and passive view, where view is a complete representation of model in plain value.

VIEW 
Each DOM elements presented with JS class that is extended from DomElement which itself is a collection of other domElements. 
These classes form view part of application, means they don't have any business logic and even don't know about each other, only in a chain of domElements (interface of DomElement).
No business logic in the view means no private properties, only plain, parsed values from ValueObjects represented it. Remember view is always dump visual objects, not a brain.

MODEL
At this time we don't need to keep any persistence data or save state from session to session, all data is static and come from single source.
So we can keep data and state of the app (only selectedIndex) in CONTROLLER as a plain properties

CONTROLLER
The entity that orchestrate with view by making decisions on input data or business logic. 
Since we have only one interactive element - GALLERY, and to keep it simple we use only one GalleryController
This controller listen for document.onkeydown process it and apply change to the view