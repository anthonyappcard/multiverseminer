




<!DOCTYPE html>
<html class="   ">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    
    <title>marcuswestin/store.js</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <meta property="fb:app_id" content="1401488693436528"/>

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="marcuswestin/store.js" name="twitter:title" /><meta content="store.js - localStorage wrapper for all browsers without using cookies or flash. Uses localStorage, globalStorage, and userData behavior under the hood" name="twitter:description" /><meta content="https://avatars3.githubusercontent.com/u/131967?s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars3.githubusercontent.com/u/131967?s=400" property="og:image" /><meta content="marcuswestin/store.js" property="og:title" /><meta content="https://github.com/marcuswestin/store.js" property="og:url" /><meta content="store.js - localStorage wrapper for all browsers without using cookies or flash. Uses localStorage, globalStorage, and userData behavior under the hood" property="og:description" />

    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035">
    <link rel="xhr-socket" href="/_sockets" />

    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
      <meta name="google-analytics" content="UA-3769691-2">

    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="AE2C4B13:01F9:3209555:53AB8E6D" name="octolytics-dimension-request_id" /><meta content="92340" name="octolytics-actor-id" /><meta content="antlong" name="octolytics-actor-login" /><meta content="e6b96f4bf6b906c515ae31dda20328f8c0e8183ec04fdaf114841a9132797642" name="octolytics-actor-hash" />
    

    
    
    <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico" />


    <meta content="authenticity_token" name="csrf-param" />
<meta content="lpID9qrqITettimT7dahm5TVXg9DhzmDmoiLYW9RvyDac4DQFf4JlxdQeS/IsrzqUWU9NeNd1G2y2mc1IPWXwg==" name="csrf-token" />

    <link href="https://assets-cdn.github.com/assets/github-c13b2c9e805745ba25729ccbf701703a88a37633.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://assets-cdn.github.com/assets/github2-4e2e0861a2c1c3e77e535a67d1a2575a15754fc9.css" media="all" rel="stylesheet" type="text/css" />
    


    <meta http-equiv="x-pjax-version" content="470d7f66516bffdd7e1cd7cd17898b88">

      
  <meta name="description" content="store.js - localStorage wrapper for all browsers without using cookies or flash. Uses localStorage, globalStorage, and userData behavior under the hood" />


  <meta content="131967" name="octolytics-dimension-user_id" /><meta content="marcuswestin" name="octolytics-dimension-user_login" /><meta content="743723" name="octolytics-dimension-repository_id" /><meta content="marcuswestin/store.js" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="743723" name="octolytics-dimension-repository_network_root_id" /><meta content="marcuswestin/store.js" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/marcuswestin/store.js/commits/master.atom" rel="alternate" title="Recent Commits to store.js:master" type="application/atom+xml" />

  </head>


  <body class="logged_in  env-production macintosh vis-public">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div class="wrapper">
      
      
      
      


      <div class="header header-logged-in true">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/" aria-label="Homepage">
  <span class="mega-octicon octicon-mark-github"></span>
</a>


    
    <a href="/notifications" aria-label="You have unread notifications" class="notification-indicator tooltipped tooltipped-s" data-hotkey="g n">
        <span class="mail-status unread"></span>
</a>

      <div class="command-bar js-command-bar  in-repository">
          <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">

<div class="commandbar">
  <span class="message"></span>
  <input type="text" data-hotkey="s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off"
    
    data-username="antlong"
      data-repo="marcuswestin/store.js"
      data-branch="master"
      data-sha="3cd02276b1a3eda25342da1d84bdb56ccdae8795"
  >
  <div class="display hidden"></div>
</div>

    <input type="hidden" name="nwo" value="marcuswestin/store.js" />

    <div class="select-menu js-menu-container js-select-menu search-context-select-menu">
      <span class="minibutton select-menu-button js-menu-target" role="button" aria-haspopup="true">
        <span class="js-select-button">This repository</span>
      </span>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container" aria-hidden="true">
        <div class="select-menu-modal">

          <div class="select-menu-item js-navigation-item js-this-repository-navigation-item selected">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" class="js-search-this-repository" name="search_target" value="repository" checked="checked" />
            <div class="select-menu-item-text js-select-button-text">This repository</div>
          </div> <!-- /.select-menu-item -->

          <div class="select-menu-item js-navigation-item js-all-repositories-navigation-item">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" name="search_target" value="global" />
            <div class="select-menu-item-text js-select-button-text">All repositories</div>
          </div> <!-- /.select-menu-item -->

        </div>
      </div>
    </div>

  <span class="help tooltipped tooltipped-s" aria-label="Show command bar help">
    <span class="octicon octicon-question"></span>
  </span>


  <input type="hidden" name="ref" value="cmdform">

</form>
        <ul class="top-nav">
          <li class="explore"><a href="/explore">Explore</a></li>
            <li><a href="https://gist.github.com">Gist</a></li>
            <li><a href="/blog">Blog</a></li>
          <li><a href="https://help.github.com">Help</a></li>
        </ul>
      </div>

    


  <ul id="user-links">
    <li>
      <a href="/antlong" class="name">
        <img alt="Anthony Long" class=" js-avatar" data-user="92340" height="20" src="https://avatars2.githubusercontent.com/u/92340?s=140" width="20" /> antlong
      </a>
    </li>

    <li class="new-menu dropdown-toggle js-menu-container">
      <a href="#" class="js-menu-target tooltipped tooltipped-s" aria-label="Create new...">
        <span class="octicon octicon-plus"></span>
        <span class="dropdown-arrow"></span>
      </a>

      <div class="new-menu-content js-menu-content">
      </div>
    </li>

    <li>
      <a href="/settings/profile" id="account_settings"
        class="tooltipped tooltipped-s"
        aria-label="Account settings ">
        <span class="octicon octicon-tools"></span>
      </a>
    </li>
    <li>
      <form class="logout-form" action="/logout" method="post">
        <button class="sign-out-button tooltipped tooltipped-s" aria-label="Sign out">
          <span class="octicon octicon-sign-out"></span>
        </button>
      </form>
    </li>

  </ul>

<div class="js-new-dropdown-contents hidden">
  

<ul class="dropdown-menu">
  <li>
    <a href="/new"><span class="octicon octicon-repo"></span> New repository</a>
  </li>
  <li>
    <a href="/organizations/new"><span class="octicon octicon-organization"></span> New organization</a>
  </li>


    <li class="section-title">
      <span title="marcuswestin/store.js">This repository</span>
    </li>
      <li>
        <a href="/marcuswestin/store.js/issues/new"><span class="octicon octicon-issue-opened"></span> New issue</a>
      </li>
</ul>

</div>


    
  </div>
</div>

      

        



      <div id="start-of-content" class="accessibility-aid"></div>
          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    <div id="js-flash-container">
      
    </div>
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        

<ul class="pagehead-actions">

    <li class="subscription">
      <form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="gqLwrcVI1iFR8YyChoWIzCsfgPAHCtjpfMBVnOC9mOqjD2WtTxNlSnqo4iy+dZesXTCBm922AQB73m22ddU1ig==" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="743723" />

    <div class="select-menu js-menu-container js-select-menu">
      <a class="social-count js-social-count" href="/marcuswestin/store.js/watchers">
        139
      </a>
      <span class="minibutton select-menu-button with-count js-menu-target" role="button" tabindex="0" aria-haspopup="true">
        <span class="js-select-button">
          <span class="octicon octicon-eye"></span>
          Watch
        </span>
      </span>

      <div class="select-menu-modal-holder">
        <div class="select-menu-modal subscription-menu-modal js-menu-content" aria-hidden="true">
          <div class="select-menu-header">
            <span class="select-menu-title">Notification status</span>
            <span class="octicon octicon-x js-menu-close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-list js-navigation-container" role="menu">

            <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                <h4>Not watching</h4>
                <span class="description">You only receive notifications for conversations in which you participate or are @mentioned.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Watch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                <h4>Watching</h4>
                <span class="description">You receive notifications for all conversations in this repository.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Unwatch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_ignore" name="do" type="radio" value="ignore" />
                <h4>Ignoring</h4>
                <span class="description">You do not receive any notifications for conversations in this repository.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-mute"></span>
                  Stop ignoring
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

</form>
    </li>

  <li>
    

  <div class="js-toggler-container js-social-container starring-container ">

    <form accept-charset="UTF-8" action="/marcuswestin/store.js/unstar" class="js-toggler-form starred" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="MALFxfscgZcaYy1sKC2NZnE5w3jnl31Db8cro7/+6Ou9bgkcaYYDO4mEdWltnvthYslOo+q+3Jp0UHzjDYmFVg==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Unstar this repository" title="Unstar marcuswestin/store.js">
        <span class="octicon octicon-star"></span>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/marcuswestin/store.js/stargazers">
          2,604
        </a>
</form>
    <form accept-charset="UTF-8" action="/marcuswestin/store.js/star" class="js-toggler-form unstarred" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="M16oUMgEaDkNMNm3aEUM26zXuemLgLI4/WCR1cMjq8S2uc2crViX7FDk7z8Xos+0nMuneACa1RCe8B+YhCZJfg==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Star this repository" title="Star marcuswestin/store.js">
        <span class="octicon octicon-star"></span>
        Star
      </button>
        <a class="social-count js-social-count" href="/marcuswestin/store.js/stargazers">
          2,604
        </a>
</form>  </div>

  </li>


        <li>
          <a href="/marcuswestin/store.js/fork" class="minibutton with-count js-toggler-target fork-button lighter tooltipped-n" title="Fork your own copy of marcuswestin/store.js to your account" aria-label="Fork your own copy of marcuswestin/store.js to your account" rel="nofollow" data-method="post">
            <span class="octicon octicon-repo-forked"></span>
            Fork
          </a>
          <a href="/marcuswestin/store.js/network" class="social-count">325</a>
        </li>

</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="repo-label"><span>public</span></span>
          <span class="mega-octicon octicon-repo"></span>
          <span class="author"><a href="/marcuswestin" class="url fn" itemprop="url" rel="author"><span itemprop="title">marcuswestin</span></a></span><!--
       --><span class="path-divider">/</span><!--
       --><strong><a href="/marcuswestin/store.js" class="js-current-repository js-repo-home-link">store.js</a></strong>

          <span class="page-context-loader">
            <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline js-new-discussion-timeline with-full-navigation ">
        <div class="repository-sidebar clearfix">
            

<div class="sunken-menu vertical-right repo-nav js-repo-nav js-repository-container-pjax js-octicon-loaders">
  <div class="sunken-menu-contents">
    <ul class="sunken-menu-group">
      <li class="tooltipped tooltipped-w" aria-label="Code">
        <a href="/marcuswestin/store.js" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-hotkey="g c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /marcuswestin/store.js">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped tooltipped-w" aria-label="Issues">
          <a href="/marcuswestin/store.js/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g i" data-selected-links="repo_issues /marcuswestin/store.js/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class='counter'>5</span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
        <a href="/marcuswestin/store.js/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g p" data-selected-links="repo_pulls /marcuswestin/store.js/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class='counter'>1</span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


        <li class="tooltipped tooltipped-w" aria-label="Wiki">
          <a href="/marcuswestin/store.js/wiki" aria-label="Wiki" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g w" data-selected-links="repo_wiki /marcuswestin/store.js/wiki">
            <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>
    </ul>
    <div class="sunken-menu-separator"></div>
    <ul class="sunken-menu-group">

      <li class="tooltipped tooltipped-w" aria-label="Pulse">
        <a href="/marcuswestin/store.js/pulse" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /marcuswestin/store.js/pulse">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Graphs">
        <a href="/marcuswestin/store.js/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /marcuswestin/store.js/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Network">
        <a href="/marcuswestin/store.js/network" aria-label="Network" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-selected-links="repo_network /marcuswestin/store.js/network">
          <span class="octicon octicon-repo-forked"></span> <span class="full-word">Network</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
    </ul>


  </div>
</div>

              <div class="only-with-full-nav">
                

  

<div class="clone-url "
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><strong>HTTPS</strong> clone URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/marcuswestin/store.js.git" readonly="readonly">
    <span class="url-box-clippy">
    <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/marcuswestin/store.js.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  

<div class="clone-url open"
  data-protocol-type="ssh"
  data-url="/users/set_protocol?protocol_selector=ssh&amp;protocol_type=clone">
  <h3><strong>SSH</strong> clone URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="git@github.com:marcuswestin/store.js.git" readonly="readonly">
    <span class="url-box-clippy">
    <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="git@github.com:marcuswestin/store.js.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  

<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><strong>Subversion</strong> checkout URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/marcuswestin/store.js" readonly="readonly">
    <span class="url-box-clippy">
    <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/marcuswestin/store.js" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
      <a href="#" class="js-clone-selector" data-protocol="ssh">SSH</a>,
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <a href="https://help.github.com/articles/which-remote-url-should-i-use" class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <span class="octicon octicon-question"></span>
  </a>
</p>

  <a href="http://mac.github.com" data-url="github-mac://openRepo/https://github.com/marcuswestin/store.js" class="minibutton sidebar-button js-conduit-rewrite-url" title="Save marcuswestin/store.js to your computer and use it in GitHub Desktop." aria-label="Save marcuswestin/store.js to your computer and use it in GitHub Desktop.">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>


                <a href="/marcuswestin/store.js/archive/master.zip"
                   class="minibutton sidebar-button"
                   aria-label="Download marcuswestin/store.js as a zip file"
                   title="Download marcuswestin/store.js as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          

<span id="js-show-full-navigation"></span>

<div class="repository-meta js-details-container ">
    <div class="repository-description js-details-show">
      <p>localStorage wrapper for all browsers without using cookies or flash. Uses localStorage, globalStorage, and userData behavior under the hood</p>
    </div>

    <div class="repository-website js-details-show">
      <p><a href="http://twitter.com/marcuswestin" rel="nofollow">http://twitter.com/marcuswestin</a></p>
    </div>


</div>

<div class="capped-box overall-summary ">

  <div class="stats-switcher-viewport js-stats-switcher-viewport">
    <div class="stats-switcher-wrapper">
    <ul class="numbers-summary">
      <li class="commits">
        <a data-pjax href="/marcuswestin/store.js/commits/master">
            <span class="num">
              <span class="octicon octicon-history"></span>
              232
            </span>
            commits
        </a>
      </li>
      <li>
        <a data-pjax href="/marcuswestin/store.js/branches">
          <span class="num">
            <span class="octicon octicon-git-branch"></span>
            3
          </span>
          branches
        </a>
      </li>

      <li>
        <a data-pjax href="/marcuswestin/store.js/releases">
          <span class="num">
            <span class="octicon octicon-tag"></span>
            22
          </span>
          releases
        </a>
      </li>

      <li>
        
  <a href="/marcuswestin/store.js/graphs/contributors">
    <span class="num">
      <span class="octicon octicon-organization"></span>
      20
    </span>
    contributors
  </a>
      </li>
    </ul>

      <div class="repository-lang-stats">
        <ol class="repository-lang-stats-numbers">
          <li>
              <a href="/marcuswestin/store.js/search?l=javascript">
                <span class="color-block language-color" style="background-color:#f1e05a;"></span>
                <span class="lang">JavaScript</span>
                <span class="percent">100%</span>
              </a>
          </li>
        </ol>
      </div>
    </div>
  </div>

</div>

  <div class="tooltipped tooltipped-s" aria-label="Show language statistics">
    <a href="#"
     class="repository-lang-stats-graph js-toggle-lang-stats"
     style="background-color:#f1e05a">
  <span class="language-color" style="width:100%; background-color:#f1e05a;" itemprop="keywords">JavaScript</span>
    </a>
  </div>




<div class="file-navigation in-mid-page">
  <a href="/marcuswestin/store.js/find/master"
        class="js-show-file-finder minibutton empty-icon tooltipped tooltipped-s right"
        data-pjax
        data-hotkey="t"
        aria-label="Quickly jump between files">
    <span class="octicon octicon-list-unordered"></span>
  </a>
    <a href="/marcuswestin/store.js/compare" aria-label="Compare, review, create a pull request" class="minibutton compact primary tooltipped tooltipped-s" aria-label="Compare &amp; review" data-pjax>
      <span class="octicon octicon-git-compare"></span>
    </a>

  

<div class="select-menu js-menu-container js-select-menu" >
  <span class="minibutton select-menu-button js-menu-target css-truncate" data-hotkey="w"
    data-master-branch="master"
    data-ref="master"
    title="master"
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-x js-menu-close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/firefox-2-and-3-support"
                 data-name="firefox-2-and-3-support"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="firefox-2-and-3-support">firefox-2-and-3-support</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/gh-pages"
                 data-name="gh-pages"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="gh-pages">gh-pages</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/master"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.16"
                 data-name="v1.3.16"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.16">v1.3.16</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.15"
                 data-name="v1.3.15"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.15">v1.3.15</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.14"
                 data-name="v1.3.14"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.14">v1.3.14</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.13"
                 data-name="v1.3.13"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.13">v1.3.13</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.12"
                 data-name="v1.3.12"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.12">v1.3.12</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.11"
                 data-name="v1.3.11"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.11">v1.3.11</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.10"
                 data-name="v1.3.10"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.10">v1.3.10</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.9"
                 data-name="v1.3.9"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.9">v1.3.9</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.8"
                 data-name="v1.3.8"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.8">v1.3.8</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.7"
                 data-name="v1.3.7"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.7">v1.3.7</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.6"
                 data-name="v1.3.6"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.6">v1.3.6</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.5-firefox-2-and-3-support"
                 data-name="v1.3.5-firefox-2-and-3-support"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.5-firefox-2-and-3-support">v1.3.5-firefox-2-and-3-support</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.5"
                 data-name="v1.3.5"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.5">v1.3.5</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.4"
                 data-name="v1.3.4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.4">v1.3.4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.3"
                 data-name="v1.3.3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.3">v1.3.3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.2"
                 data-name="v1.3.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.2">v1.3.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.1"
                 data-name="v1.3.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.1">v1.3.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.3.0"
                 data-name="v1.3.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.3.0">v1.3.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.2.0"
                 data-name="v1.2.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.2.0">v1.2.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.1.1"
                 data-name="v1.1.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.1.1">v1.1.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.1.0"
                 data-name="v1.1.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.1.0">v1.1.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/marcuswestin/store.js/tree/v1.0.3"
                 data-name="v1.0.3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.0.3">v1.0.3</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->



  <div class="breadcrumb"><span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/marcuswestin/store.js" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">store.js</span></a></span></span><span class="separator"> / </span><form action="/marcuswestin/store.js/new/master" aria-label="Fork this project and create a new file" class="js-new-blob-form tooltipped tooltipped-e new-file-link" method="post"><span aria-label="Fork this project and create a new file" class="js-new-blob-submit octicon octicon-plus" data-test-id="create-new-git-file" role="button"></span></form></div>
</div>




  
  <div class="commit commit-tease js-details-container" >
    <p class="commit-title ">
        <a href="/marcuswestin/store.js/commit/b775af185be4031315af7e0a62e413632eb49a65" class="message" data-pjax="true" title="Merge pull request #94 from spmjs/master

add spm support">Merge pull request</a> <a href="https://github.com/marcuswestin/store.js/pull/94" class="issue-link" title="add spm support">#94</a> <a href="/marcuswestin/store.js/commit/b775af185be4031315af7e0a62e413632eb49a65" class="message" data-pjax="true" title="Merge pull request #94 from spmjs/master

add spm support">from spmjs/master</a>
        <span class="hidden-text-expander inline"><a href="#" class="js-details-target">…</a></span>
    </p>
      <div class="commit-desc"><pre>add spm support</pre></div>
    <div class="commit-meta">
      <button aria-label="Copy SHA" class="js-zeroclipboard zeroclipboard-link" data-clipboard-text="b775af185be4031315af7e0a62e413632eb49a65" data-copied-hint="copied!" type="button"><span class="octicon octicon-clippy"></span></button>
      <a href="/marcuswestin/store.js/commit/b775af185be4031315af7e0a62e413632eb49a65" class="sha-block" data-pjax>latest commit <span class="sha">b775af185b</span></a>

      <div class="authorship">
        <img alt="Marcus Westin" class="gravatar js-avatar" data-user="131967" height="20" src="https://avatars0.githubusercontent.com/u/131967?s=140" width="20" />
        <span class="author-name"><a href="/marcuswestin" data-skip-pjax="true" rel="author">marcuswestin</a></span>
        authored <time class="updated" datetime="2014-05-12T06:26:44-07:00" is="relative-time">May 12, 2014</time>

      </div>
    </div>
  </div>

  <div class="file-wrap">
    <table class="files" data-pjax>

      
<tbody class=""
  data-url="/marcuswestin/store.js/file-list/master"
  data-deferred-content-error="Failed to load latest commit information.">

    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/.gitignore" class="js-directory-link" id="a084b794bc0759e7a6b77810e01874f2-3c3629e647f5ddf82548912e337bea9826b434af" title=".gitignore">.gitignore</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/beee222007920cdae265f69588adc2c4963e3892" class="message" data-pjax="true" title="Use uglifyjs to minify store.min.js and store+json.min.js, and add a build script to make building easier">Use uglifyjs to minify store.min.js and store+json.min.js, and add a …</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2012-01-14T18:32:14Z" is="time-ago">January 14, 2012</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/Changelog" class="js-directory-link" id="c49182dc0c7a70b9cd2e10853d9ec6c7-9d887c28a1eecca1a482c081b5851fdb85f6d131" title="Changelog">Changelog</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/0ba8fcf6d40f3649a1d1392f65018136428d22de" class="message" data-pjax="true" title="v1.3.16">v1.3.16</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-10T18:12:49Z" is="time-ago">March 10, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/LICENSE" class="js-directory-link" id="9879d6db96fd29134fc802214163b95a-e9f572f70ae8d903162d0aae86f3df6ba2e4825e" title="LICENSE">LICENSE</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/baf3d41b7092f0bacd441b768a77650199c25fa7" class="message" data-pjax="true" title="Update copyright year. Is this really necesary?">Update copyright year. Is this really necesary?</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-05-09T10:33:57Z" is="time-ago">May 09, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/Makefile" class="js-directory-link" id="b67911656ef5d18c4ae36cb6741b7965-fe71675e8449438fe58d28bb9b07a2b7745d1e76" title="Makefile">Makefile</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/5e4d61854480bb76ac242694be3311df359280bb" class="message" data-pjax="true" title="Add a make command for me to remember to publish everything to npm. GH fix #93">Add a make command for me to remember to publish everything to npm. G…</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-05-09T10:33:41Z" is="time-ago">May 09, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/README.md" class="js-directory-link" id="04c6e90faac2675aa89e2176d2eec7d8-73f96b84bc5bc2140f649246f5c4c9b4ab0fa45f" title="README.md">README.md</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/24bbfd03ce5102e22e230cdc845d456f4604b4ba" class="message" data-pjax="true" title="fix alert typos">fix alert typos</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-04-20T03:49:13Z" is="time-ago">April 19, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/bower.json" class="js-directory-link" id="0a08a7565aba4405282251491979bb6b-9858ca6e7fa9da0d83b2f292dffdbeb2ff98e382" title="bower.json">bower.json</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/0ba8fcf6d40f3649a1d1392f65018136428d22de" class="message" data-pjax="true" title="v1.3.16">v1.3.16</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-10T18:12:49Z" is="time-ago">March 10, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/build.js" class="js-directory-link" id="efd59cd1bdc5c9ac6d0eaa368f1e149f-dbe49fc2189964a8e77f1df949608408bbb8e27f" title="build.js">build.js</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/a3e519dba619d15275276105a279b09a8e892bd8" class="message" data-pjax="true" title="Update copyright">Update copyright</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-09-27T20:54:34Z" is="time-ago">September 27, 2013</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/component.json" class="js-directory-link" id="162d38b326426c84ac91e51f931105bb-9858ca6e7fa9da0d83b2f292dffdbeb2ff98e382" title="component.json">component.json</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/0ba8fcf6d40f3649a1d1392f65018136428d22de" class="message" data-pjax="true" title="v1.3.16">v1.3.16</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-10T18:12:49Z" is="time-ago">March 10, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/index.html" class="js-directory-link" id="eacf331f0ffc35d4b482f1d15a887d3b-e65bf147117ef76c50e2e9aac41fed1740b2dbe3" title="index.html">index.html</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/d1bc2450e6101468af235a79fba167cc91aa8bf6" class="message" data-pjax="true" title="add index.html page to redirect to test.html">add index.html page to redirect to test.html</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-03-13T21:47:06Z" is="time-ago">March 13, 2013</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/json.js" class="js-directory-link" id="75a8ec82affa123004e2780ce07349f7-c52b92aa61c8267ceee7504ce9ef51913f377216" title="json.js">json.js</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/1611fa57ebff6e3339a8b699ecaafcf102726aa1" class="message" data-pjax="true" title="Use JSON for serialization of values put into local storage using store.js.

This addresses Issue 2, which was closed earlier as a won&#39;t-fix before I wisened up.

Thanks eddorre and jdunck for similar patches">Use JSON for serialization of values put into local storage using sto…</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2010-07-02T05:01:20Z" is="time-ago">July 01, 2010</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/package.json" class="js-directory-link" id="b9cfc7f2cdf78a7f4b91a753d10865a2-795cb25fc6e871be37852a1696d6160eea50172b" title="package.json">package.json</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/33283caec5c710bbfeed05c3d28833564952e2c7" class="message" data-pjax="true" title="add spm support">add spm support</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-05-12T11:20:15Z" is="time-ago">May 12, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/store%2Bjson2.min.js" class="js-directory-link" id="8d670c414f1ebbb15986fc0dc196c669-915283b0038ab40c5c7ac376a5f767ad44ed0f9e" title="store+json2.min.js">store+json2.min.js</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/0ba8fcf6d40f3649a1d1392f65018136428d22de" class="message" data-pjax="true" title="v1.3.16">v1.3.16</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-10T18:12:49Z" is="time-ago">March 10, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/store.js" class="js-directory-link" id="8b3d2f22fc7e4f74eeb25762947f7c36-05cc282957ead0945a491c4868838cb68fec2eec" title="store.js">store.js</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/bee4bf19936485e827cba6228a7ba9b3e51cde0d" class="message" data-pjax="true" title="(#88) - Fix nodejs check">(</a><a href="https://github.com/marcuswestin/store.js/issues/88" class="issue-link" title="store.js incompatible with QUnit.js">#88</a><a href="/marcuswestin/store.js/commit/bee4bf19936485e827cba6228a7ba9b3e51cde0d" class="message" data-pjax="true" title="(#88) - Fix nodejs check">) - Fix nodejs check</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-06T11:30:39Z" is="time-ago">March 06, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/store.min.js" class="js-directory-link" id="96570c5372a87206dee462a59c5477f4-12d1a73a1e324ab2b66018e6cf7ef1fc26d5a9e9" title="store.min.js">store.min.js</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/0ba8fcf6d40f3649a1d1392f65018136428d22de" class="message" data-pjax="true" title="v1.3.16">v1.3.16</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2014-03-10T18:12:49Z" is="time-ago">March 10, 2014</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/test-node.js" class="js-directory-link" id="1923f9d9a2239319aa43ea840264688d-dd2f32fdec6008b783ab3a54fb79ee93416ad1b9" title="test-node.js">test-node.js</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/f7ab668e728db9fccd19c28fba56941c614aea74" class="message" data-pjax="true" title="add support for running tests in node.js">add support for running tests in node.js</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-05-29T20:23:00Z" is="time-ago">May 29, 2013</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/test.html" class="js-directory-link" id="eac0a7ec83537763d3ba7671828d0989-a55a11729ef094928e742c0926d54d0640302c8d" title="test.html">test.html</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/f7ab668e728db9fccd19c28fba56941c614aea74" class="message" data-pjax="true" title="add support for running tests in node.js">add support for running tests in node.js</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-05-29T20:23:00Z" is="time-ago">May 29, 2013</time></span>
      </td>
    </tr>
    <tr>
      <td class="icon">
        <span class="octicon octicon-file-text"></span>
        <img alt="" class="spinner" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
      </td>
      <td class="content">
        <span class="css-truncate css-truncate-target"><a href="/marcuswestin/store.js/blob/master/tests.js" class="js-directory-link" id="ce4097fa41097a3b63603226458faf55-dc54d1514d974b217638aacfe2fb44d1341f3bf5" title="tests.js">tests.js</a></span>
      </td>
      <td class="message">
        <span class="css-truncate css-truncate-target ">
          <a href="/marcuswestin/store.js/commit/108051fd22d48c88ea6a600326e054eead6e9ad5" class="message" data-pjax="true" title="Fix store.disabled error output note">Fix store.disabled error output note</a>
        </span>
      </td>
      <td class="age">
        <span class="css-truncate css-truncate-target"><time datetime="2013-09-27T21:03:10Z" is="time-ago">September 27, 2013</time></span>
      </td>
    </tr>
</tbody>

    </table>
  </div>


  <div id="readme" class="clearfix announce instapaper_body md">
    <span class="name">
      <span class="octicon octicon-book"></span>
      README.md
    </span>

    <article class="markdown-body entry-content" itemprop="mainContentOfPage"><h1>
<a name="user-content-storejs" class="anchor" href="#storejs" aria-hidden="true"><span class="octicon octicon-link"></span></a>store.js</h1>

<p>store.js exposes a simple API for cross browser local storage</p>

<div class="highlight highlight-js"><pre><span class="c1">// Store 'marcus' at 'username'</span>
<span class="nx">store</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="s1">'username'</span><span class="p">,</span> <span class="s1">'marcus'</span><span class="p">)</span>

<span class="c1">// Get 'username'</span>
<span class="nx">store</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">'username'</span><span class="p">)</span>

<span class="c1">// Remove 'username'</span>
<span class="nx">store</span><span class="p">.</span><span class="nx">remove</span><span class="p">(</span><span class="s1">'username'</span><span class="p">)</span>

<span class="c1">// Clear all keys</span>
<span class="nx">store</span><span class="p">.</span><span class="nx">clear</span><span class="p">()</span>

<span class="c1">// Store an object literal - store.js uses JSON.stringify under the hood</span>
<span class="nx">store</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="s1">'user'</span><span class="p">,</span> <span class="p">{</span> <span class="nx">name</span><span class="o">:</span> <span class="s1">'marcus'</span><span class="p">,</span> <span class="nx">likes</span><span class="o">:</span> <span class="s1">'javascript'</span> <span class="p">})</span>

<span class="c1">// Get the stored object - store.js uses JSON.parse under the hood</span>
<span class="kd">var</span> <span class="nx">user</span> <span class="o">=</span> <span class="nx">store</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">'user'</span><span class="p">)</span>
<span class="nx">alert</span><span class="p">(</span><span class="nx">user</span><span class="p">.</span><span class="nx">name</span> <span class="o">+</span> <span class="s1">' likes '</span> <span class="o">+</span> <span class="nx">user</span><span class="p">.</span><span class="nx">likes</span><span class="p">)</span>

<span class="c1">// Get all stored values</span>
<span class="nx">store</span><span class="p">.</span><span class="nx">getAll</span><span class="p">().</span><span class="nx">user</span><span class="p">.</span><span class="nx">name</span> <span class="o">==</span> <span class="s1">'marcus'</span>

<span class="c1">// Loop over all stored values</span>
<span class="nx">store</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">key</span><span class="p">,</span> <span class="nx">val</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">key</span><span class="p">,</span> <span class="s1">'=='</span><span class="p">,</span> <span class="nx">val</span><span class="p">)</span>
<span class="p">})</span>
</pre></div>

<h2>
<a name="user-content-how-does-it-work" class="anchor" href="#how-does-it-work" aria-hidden="true"><span class="octicon octicon-link"></span></a>How does it work?</h2>

<p>store.js uses localStorage when available, and falls back on the userData behavior in IE6 and IE7. No flash to slow down your page load. No cookies to fatten your network requests.</p>

<p>store.js depends on JSON for serialization to disk.</p>

<h2>
<a name="user-content-installation" class="anchor" href="#installation" aria-hidden="true"><span class="octicon octicon-link"></span></a>Installation</h2>

<p>Just grab <a href="https://raw.github.com/marcuswestin/store.js/master/store.min.js">store.min.js</a> or <a href="https://raw.github.com/marcuswestin/store.js/master/store+json2.min.js">store+json2.min.js</a> and include them with a script tag.</p>

<h2>
<a name="user-content-storeenabled-flag" class="anchor" href="#storeenabled-flag" aria-hidden="true"><span class="octicon octicon-link"></span></a>
<code>store.enabled</code> flag</h2>

<p>If your product depends on store.js, you must check the <code>store.enabled</code> flag first:</p>

<div class="highlight highlight-html"><pre><span class="nt">&lt;script </span><span class="na">src=</span><span class="s">"store.min.js"</span><span class="nt">&gt;&lt;/script&gt;</span>
<span class="nt">&lt;script&gt;</span>
    <span class="nx">init</span><span class="p">()</span>
    <span class="kd">function</span> <span class="nx">init</span><span class="p">()</span> <span class="p">{</span>
        <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">store</span><span class="p">.</span><span class="nx">enabled</span><span class="p">)</span> <span class="p">{</span>
            <span class="nx">alert</span><span class="p">(</span><span class="s1">'Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.'</span><span class="p">)</span>
            <span class="k">return</span>
        <span class="p">}</span>
        <span class="kd">var</span> <span class="nx">user</span> <span class="o">=</span> <span class="nx">store</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">'user'</span><span class="p">)</span>
        <span class="c1">// ... and so on ...</span>
    <span class="p">}</span>
<span class="nt">&lt;/script&gt;</span>
</pre></div>

<p>LocalStorage may sometimes appear to be available but throw an error when used. An example is Safari's private browsing mode. Other browsers allow the user to temporarily disable localStorage. Store.js detects these conditions and sets the <code>store.enabled</code> flag appropriately.</p>

<h2>
<a name="user-content-screencast" class="anchor" href="#screencast" aria-hidden="true"><span class="octicon octicon-link"></span></a>Screencast</h2>

<p><a href="http://javascriptplayground.com/blog/2012/06/javascript-local-storage-store-js-tutorial">Introductory Screencast to Store.js</a> by Jack Franklin.</p>

<h2>
<a name="user-content-contributors--forks" class="anchor" href="#contributors--forks" aria-hidden="true"><span class="octicon octicon-link"></span></a>Contributors &amp; Forks</h2>

<p>Contributors: <a href="https://github.com/marcuswestin/store.js/graphs/contributors">https://github.com/marcuswestin/store.js/graphs/contributors</a></p>

<p>Forks: <a href="https://github.com/marcuswestin/store.js/network/members">https://github.com/marcuswestin/store.js/network/members</a></p>

<h2>
<a name="user-content-in-nodejs" class="anchor" href="#in-nodejs" aria-hidden="true"><span class="octicon octicon-link"></span></a>In node.js</h2>

<p>store.js works as expected in node.js, assuming that global.localStorage has been set:</p>

<pre><code>global.localStorage = require('localStorage')
var store = require('./store')
store.set('foo', 1)
console.log(store.get('foo'))
</code></pre>

<h2>
<a name="user-content-supported-browsers" class="anchor" href="#supported-browsers" aria-hidden="true"><span class="octicon octicon-link"></span></a>Supported browsers</h2>

<ul class="task-list">
<li>Tested in iOS 4</li>
<li>Tested in iOS 5</li>
<li>Tested in iOS 6</li>
<li>Tested in Firefox 3.5</li>
<li>Tested in Firefox 3.6</li>
<li>Tested in Firefox 4.0+</li>
<li>Support dropped for Firefox &lt; 3.5 (see notes below)</li>
<li>Tested in Chrome 5</li>
<li>Tested in Chrome 6</li>
<li>Tested in Chrome 7</li>
<li>Tested in Chrome 8</li>
<li>Tested in Chrome 10</li>
<li>Tested in Chrome 11+</li>
<li>Tested in Safari 4</li>
<li>Tested in Safari 5</li>
<li>Tested in IE6</li>
<li>Tested in IE7</li>
<li>Tested in IE8</li>
<li>Tested in IE9</li>
<li>Tested in IE10</li>
<li>Tested in Opera 10</li>
<li>Tested in Opera 11</li>
<li>Tested in Opera 12</li>
<li>Tested in Node.js v0.10.4 (with <a href="https://github.com/coolaj86/node-localStorage">https://github.com/coolaj86/node-localStorage</a> 1.0.2)</li>
</ul><p><em>Private mode</em> Store.js may not work while browsing in private mode. This is as it should be. Check the <code>store.enabled</code> flag before relying on store.js.</p>

<p><em>Saucelabs.com rocks</em> Extensive browser testing of store.js is possible thanks to Saucelabs.com. Check them out, they're awesome.</p>

<p><em>Firefox 3.0 &amp; 2.0:</em> Support for FF 2 &amp; 3 was dropped in v1.3.6. If you require support for ancient versions of FF, use v1.3.5 of store.js.</p>

<p><em>Important note:</em> In IE6 and IE7, many special characters are not allowed in the keys used to store any key/value pair. With <a href="https://github.com/mferretti">@mferretti</a>'s help, there's a suitable workaround which replaces most forbidden characters with "___".</p>

<h2>
<a name="user-content-storage-limits" class="anchor" href="#storage-limits" aria-hidden="true"><span class="octicon octicon-link"></span></a>Storage limits</h2>

<ul class="task-list">
<li>IE6 &amp; IE7: 1MB total, but 128kb per "path" or "document" (see <a href="http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx">http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx</a>)</li>
<li>See <a href="http://dev-test.nemikor.com/web-storage/support-test/">http://dev-test.nemikor.com/web-storage/support-test/</a> for a list of limits per browser</li>
</ul><h2>
<a name="user-content-unsupported-browsers" class="anchor" href="#unsupported-browsers" aria-hidden="true"><span class="octicon octicon-link"></span></a>Unsupported browsers</h2>

<ul class="task-list">
<li>Firefox 1.0: no means (beside cookies and flash)</li>
<li>Safari 2: no means (beside cookies and flash)</li>
<li>Safari 3: no synchronous api (has asynch sqlite api, but store.js is synch)</li>
<li>Opera 9: don't know if there is synchronous api for storing data locally</li>
<li>Firefox 1.5: don't know if there is synchronous api for storing data locally</li>
</ul><h2>
<a name="user-content-some-notes-on-serialization" class="anchor" href="#some-notes-on-serialization" aria-hidden="true"><span class="octicon octicon-link"></span></a>Some notes on serialization</h2>

<p>localStorage, when used without store.js, calls toString on all stored values. This means that you can't conveniently store and retrieve numbers, objects or arrays:</p>

<div class="highlight highlight-js"><pre><span class="nx">localStorage</span><span class="p">.</span><span class="nx">myage</span> <span class="o">=</span> <span class="mi">24</span>
<span class="nx">localStorage</span><span class="p">.</span><span class="nx">myage</span> <span class="o">!==</span> <span class="mi">24</span>
<span class="nx">localStorage</span><span class="p">.</span><span class="nx">myage</span> <span class="o">===</span> <span class="s1">'24'</span>

<span class="nx">localStorage</span><span class="p">.</span><span class="nx">user</span> <span class="o">=</span> <span class="p">{</span> <span class="nx">name</span><span class="o">:</span> <span class="s1">'marcus'</span><span class="p">,</span> <span class="nx">likes</span><span class="o">:</span> <span class="s1">'javascript'</span> <span class="p">}</span>
<span class="nx">localStorage</span><span class="p">.</span><span class="nx">user</span> <span class="o">===</span> <span class="s2">"[object Object]"</span>

<span class="nx">localStorage</span><span class="p">.</span><span class="nx">tags</span> <span class="o">=</span> <span class="p">[</span><span class="s1">'javascript'</span><span class="p">,</span> <span class="s1">'localStorage'</span><span class="p">,</span> <span class="s1">'store.js'</span><span class="p">]</span>
<span class="nx">localStorage</span><span class="p">.</span><span class="nx">tags</span><span class="p">.</span><span class="nx">length</span> <span class="o">===</span> <span class="mi">32</span>
<span class="nx">localStorage</span><span class="p">.</span><span class="nx">tags</span> <span class="o">===</span> <span class="s2">"javascript,localStorage,store.js"</span>
</pre></div>

<p>What we want (and get with store.js) is</p>

<div class="highlight highlight-js"><pre><span class="nx">store</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="s1">'myage'</span><span class="p">,</span> <span class="mi">24</span><span class="p">)</span>
<span class="nx">store</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">'myage'</span><span class="p">)</span> <span class="o">===</span> <span class="mi">24</span>

<span class="nx">store</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="s1">'user'</span><span class="p">,</span> <span class="p">{</span> <span class="nx">name</span><span class="o">:</span> <span class="s1">'marcus'</span><span class="p">,</span> <span class="nx">likes</span><span class="o">:</span> <span class="s1">'javascript'</span> <span class="p">})</span>
<span class="nx">alert</span><span class="p">(</span><span class="s2">"Hi my name is "</span> <span class="o">+</span> <span class="nx">store</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">'user'</span><span class="p">).</span><span class="nx">name</span> <span class="o">+</span> <span class="s2">"!"</span><span class="p">)</span>

<span class="nx">store</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="s1">'tags'</span><span class="p">,</span> <span class="p">[</span><span class="s1">'javascript'</span><span class="p">,</span> <span class="s1">'localStorage'</span><span class="p">,</span> <span class="s1">'store.js'</span><span class="p">])</span>
<span class="nx">alert</span><span class="p">(</span><span class="s2">"We've got "</span> <span class="o">+</span> <span class="nx">store</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">'tags'</span><span class="p">).</span><span class="nx">length</span> <span class="o">+</span> <span class="s2">" tags here"</span><span class="p">)</span>
</pre></div>

<p>The native serialization engine of javascript is JSON. Rather than leaving it up to you to serialize and deserialize your values, store.js uses JSON.stringify() and JSON.parse() on each call to store.set() and store.get(), respectively.</p>

<p>Some browsers do not have native support for JSON. For those browsers you should include <a href="/marcuswestin/store.js/blob/master/non-minified%20copy%20is%20included%20in%20this%20repo">JSON.js</a>.</p>

<h2>
<a name="user-content-no-sessionstorageauto-expiration" class="anchor" href="#no-sessionstorageauto-expiration" aria-hidden="true"><span class="octicon octicon-link"></span></a>No sessionStorage/auto-expiration?</h2>

<p>No. I believe there is no way to provide sessionStorage semantics cross browser. However, it is trivial to expire values on read on top of store.js:</p>

<div class="highlight highlight-js"><pre><span class="kd">var</span> <span class="nx">storeWithExpiration</span> <span class="o">=</span> <span class="p">{</span>
    <span class="nx">set</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">key</span><span class="p">,</span> <span class="nx">val</span><span class="p">,</span> <span class="nx">exp</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">store</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="nx">key</span><span class="p">,</span> <span class="p">{</span> <span class="nx">val</span><span class="o">:</span><span class="nx">val</span><span class="p">,</span> <span class="nx">exp</span><span class="o">:</span><span class="nx">exp</span><span class="p">,</span> <span class="nx">time</span><span class="o">:</span><span class="k">new</span> <span class="nb">Date</span><span class="p">().</span><span class="nx">getTime</span><span class="p">()</span> <span class="p">})</span>
    <span class="p">},</span>
    <span class="nx">get</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">key</span><span class="p">)</span> <span class="p">{</span>
        <span class="kd">var</span> <span class="nx">info</span> <span class="o">=</span> <span class="nx">store</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="nx">key</span><span class="p">)</span>
        <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">info</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="kc">null</span> <span class="p">}</span>
        <span class="k">if</span> <span class="p">(</span><span class="k">new</span> <span class="nb">Date</span><span class="p">().</span><span class="nx">getTime</span><span class="p">()</span> <span class="o">-</span> <span class="nx">info</span><span class="p">.</span><span class="nx">time</span> <span class="o">&gt;</span> <span class="nx">info</span><span class="p">.</span><span class="nx">exp</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="kc">null</span> <span class="p">}</span>
        <span class="k">return</span> <span class="nx">info</span><span class="p">.</span><span class="nx">val</span>
    <span class="p">}</span>
<span class="p">}</span>
<span class="nx">storeWithExpiration</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="s1">'foo'</span><span class="p">,</span> <span class="s1">'bar'</span><span class="p">,</span> <span class="mi">1000</span><span class="p">)</span>
<span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span> <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">storeWithExpiration</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">'foo'</span><span class="p">))</span> <span class="p">},</span> <span class="mi">500</span><span class="p">)</span> <span class="c1">// -&gt; "bar"</span>
<span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span> <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">storeWithExpiration</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">'foo'</span><span class="p">))</span> <span class="p">},</span> <span class="mi">1500</span><span class="p">)</span> <span class="c1">// -&gt; null</span>
</pre></div>

<h2>
<a name="user-content-testing" class="anchor" href="#testing" aria-hidden="true"><span class="octicon octicon-link"></span></a>Testing</h2>

<p>For a browser: Go to <a href="http://marcuswestin.github.io/store.js/test.html">http://marcuswestin.github.io/store.js/test.html</a> to test the latest version of store.js.</p>

<p>For a browser, locally: do <code>npm install node-static &amp;&amp; ./node_modules/node-static/bin/cli.js</code> and go to http://localhost:8080</p>

<p>(Note that test.html must be served over http:// or https://. This is because localStore does not work in some browsers when using the file:// protocol.)</p>

<p>For Nodejs: do <code>npm install . localStorage &amp;&amp; node test-node.js</code></p></article>
  </div>


        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.11181s from github-fe134-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="fullscreen-contents js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-x close js-ajax-error-dismiss" aria-label="Dismiss error"></a>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" src="https://assets-cdn.github.com/assets/frameworks-7e83b343734e1b60b9e3f241fabdf7ef833678e9.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://assets-cdn.github.com/assets/github-e0f23dc7c1d6f1aa07455c9db5482087bee70729.js" type="text/javascript"></script>
      
      
        <script async src="https://www.google-analytics.com/analytics.js"></script>
  </body>
</html>

