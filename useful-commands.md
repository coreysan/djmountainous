`gulp watch`

* compile templates:
handlebars js/templates/> build/templates.js

* Create a git hook (failed - server not with recent enough git)
Goal: pull automatically when repo is pushed to. 
On server: 
$ cd /your-project/.git/hooks
$ touch post-receive
$ vim post-receive
> #!/bin/sh
> git pull origin master

