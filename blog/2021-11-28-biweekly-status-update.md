---
slug: 2021-11-28-biweekly-status-update
title: Q4S5 Biweekly Status Update
author: Dora Noda
author_title: Stargately Core Team
author_url: https://github.com/stargately/
author_image_url: https://tp-misc.b-cdn.net/doranoda.JPG
tags: [biweekly status update]
---

## Q4 Goal

2 Sprints (Q4S5, Q4S6) to go

| Project       | Status                          |
| ------------- | ------------------------------- |
| BoomMo Beta   | 🤨 At Risk for an unknown scope |
| Beancount Pro | 😼 Ontrack                      |

- BoomMo Beta: 18 unknown tasks
  - User & Events
  - Multi-tenancy
- Beancount Pro: 10 tasks
  - Dropbox: 6 tasks

## BoomMo Beta

Last Week: Velocity: 4 tasks / week

- fix email template
- public community home without event list for audience
- fix storybook
- public community home with event list for audience

Q4S5

- Prepare for onboarding community owners
  - Finish ADR1. multi-tenancy community
  - all the subtasks associated

## Beancount Pro

Last Week: Velocity: 6 tasks / week

- Payment
  - add payment wall
  - prepare discount codes for pilot users
  - add configurations in pylon and mount in web-beancount
  - add cancel subscription
- Dropbox integration
  - add Fava admin api to accept file upsert
  - migrate widget to netlify

Q4S5

- Dropbox integration
  - http-sync-server delete file
  - http-sync-server update file
  - [fava] call file-sync-http-server to update file
  - widget gql endpoint and client for disconnect
  - widget & gql disconnect and clean up
