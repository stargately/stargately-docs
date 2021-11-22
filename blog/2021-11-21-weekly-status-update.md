---
slug: 2021-11-21-weekly-status-update
title: 2021-11-21-weekly-status-update
author: Dora Noda
author_title: Stargately Core Team
author_url: https://github.com/stargately/
author_image_url: https://avatars.githubusercontent.com/u/38552114?v=4
tags: [weekly status update]
---

## Q4 Goal

| Project | Status |
| ---      | ---      |
| BoomMo Beta | 🤨 At Risk for a larger scope |
| Beancount Pro | 😼 Ontrack |

Projecting 50 tasks towards the end of Q4.

* BoomMo Beta: 20 unknown tasks
  * User & Events
  * Multi-tenancy
* Beancount Pro: 10 tasks
  * Payment: 4 tasks
  * Dropbox: 6 tasks

## BoomMo Beta

Last Week: Velocity: 6 tasks / week

* account settings error handling
* fix bugs
  * post login not found
  * misc fixes
  * launch room fixes
* removed unfinished features for ADR2. Audience MVP
* draft ADR2. Audience MVP

This Week

* Prepare for onboarding community owners
  * Finish ADR1. multi-tenancy community
  * all the subtasks associated


## Beancount Pro

Last Week: Velocity: 2 tasks / week

Continue with Dropbox integration

* deprecate slugified-email path
* ADR1. user-ledger relationship and authz in the proxy

This Week

* Dropbox integration
  * call file-sync-http-server to update file
  * add Fava admin api to accept file upsert
  * widget & gql disconnect and clean up
* Payment
  * add configurations in pylon and mount in web-beancount
