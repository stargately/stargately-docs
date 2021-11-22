---
slug: 2021-11-14-weekly-status-update
title: 2021-11-14-weekly-status-update
author: Dora Noda
author_title: Stargately Core Team
author_url: https://github.com/stargately/
author_image_url: https://tp-misc.b-cdn.net/doranoda.JPG
tags: [weekly status update]
---

## Q4 Goal

| Project | Status |
| ---      | ---      |
| BoomMo Beta | 😼 Ontrack |
| Beancount Pro | 😼 Ontrack |

## BoomMo Beta

Last Week: Velocity: 9(2+6+1) tasks / week

* finished multi-in and multi-out voting contract
* Migrate Webpack to v5 from v4
* prepare a route for admin api
* if the user is the owner of the event, add an edit button to the public page
* setup data backup plan
* migrate to $START_COMMAND for choosing pkg to run
* add nextjs-pages
* add feature flag for leftNavigationBar
* sync with SPLVM community

This Week

* Prepare for onboarding community owners
  * Finish ADR1. multi-tenancy community
  * all the subtasks associated
* Bug fixes
  * launch room fixes
  * account settings error handling
* removed unfinished features for ADR2. Audience MVP

## Beancount Pro

Last Week: Velocity: 2 tasks / week

Continue with Dropbox integration

* add toggle for "billed monthly or yearly"
* fix a security issue

This Week

* Dropbox integration
  * call file-sync-http-server to update file
  * add Fava admin api to accept file upsert
  * widget & gql disconnect and clean up
* Payment
  * add configurations in pylon and mount in web-beancount
* start mobile planning
