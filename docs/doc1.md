---
id: doc1
title: Web
sidebar_label: Web
slug: /
---

OneFx is a full-stack framework for building web apps. Here are the features you’ll find in Onefx.js:

* Server-side rendering and universal rendering with React and Redux
* Apollo GraphQL (docs + playground), ES2017, TypeScript, TSX support out of the box
* Server-side development via Koa.js

## Create a project

```bash
git clone https://github.com/puncsky/web-onefx-boilerplate.git my-awesome-project
```

## Run your project
This is intended for *nix users. If you use Windows, go to [Run on Windows](#run-on-windows). Let’s first prepare the environment.

```bash
cd my-awesome-project

nvm use 10.15.0
npm install

# prepare environment variable
cp ./.env.tmpl ./.env
```

### Development mode
To run your project in development mode, run:

```bash
npm run watch
```

The development site will be available at [http://localhost:5000](http://localhost:5000).

### Production Mode
It’s sometimes useful to run a project in production mode, for example, to check bundle size or to debug a production-only issue. To run your project in production mode locally, run:

```bash
npm run build-production
NODE_ENV=production npm run start
```

### NPM scripts

* `npm run test`: test the whole project and generate a test coverage
* `npm run ava ./path/to/test-file.js`: run a specific test file
* `npm run build`: build source code from `src` to `dist`
* `npm run lint`: run the linter
* `npm run flow`: run the flow type check
* `npm run kill`: kill the node server occupying the port 4100.

## Code Styles

We use prettier, tslint, and editorconfig to enforce consistent styles across the whole project, so that we will not bikeshed on coding styles in the code review.

However, please visit our [Contributing Code](/contributing.html) before submitting your code.

## Architecture

![Onefx Architecture](https://res.cloudinary.com/dohtidfqh/image/upload/v1546379050/web-guiguio/onefx-architecture.png)

```txt
.
├── README.md
├── ava.config.js           // ava test util configuration
├── babel.config.js         // babel compiler/transpiler configuration
├── babel-register.js.      // babel register options
├── config                  // project configuration
│   ├── default.js          // base config to be extended in all env
│   ├── development.js      // config in NODE_ENV=development
│   ├── production.js       // config in NODE_ENV=production
│   └── test.js             // config in NODE_ENV=test
├── coverage                // test coverage
├── dist                    // destination for src build result
├── gulpfile.babel.js       // gulp task runner config
├── package.json
├── renovate.json           // renovate bot to automate dependency bumps
├── server.ts               // project entry
├── src                               // source code
│   ├── api-gateway                   // APIs server defined in GraphQL for the clients to call
│   │   ├── api-gateway.graphql
│   │   ├── api-gateway.ts
│   │   └── resolvers
│   │       └── meta-resolver.ts
│   ├── client                        // browser-side source code
│   │   ├── javascripts
│   │   │   └── main.tsx
│   │   ├── static
│   │   │   ├── favicon.png
│   │   │   ├── manifest.json
│   │   │   └── robots.txt
│   │   └── stylesheets
│   │       └── main.scss
│   ├── model                         // data models
│   │   ├── index.ts
│   │   └── model.ts
│   ├── server                        // onefx server
│   │   ├── index.ts
│   │   ├── middleware                // koa middleware
│   │   │   ├── index.ts
│   │   │   ├── manifest-middleware.ts
│   │   │   └── set-middleware.ts
│   │   ├── server-routes.tsx          // server-side routes
│   │   └── start-server.tsx           // server initialization
│   └── shared                        // js code shared by both the server and the client
│       ├── app-container.ts
│       ├── app.ts
│       ├── common
│       ├── home
│       │   └── home.ts
│       └── register-service-worker.js
├── translations          // translations supported in this website
│   ├── en.yaml
│   └── zh-cn.yaml
├── Procfile                // heroku Procfile
└── webpack.js            // webpack bundler config
```

# Guides

## State management
We use redux to manage state in onefx.js. To pass the state from the server to the initial page during the server-side rendering, in the server use `ctx.setState(path, val)` to set the state:

```js
server.get('SPA', '/*', function onRoute(ctx) {
  ctx.setState('base.sampleState', 'this is a sample initial state');
  ctx.body = ctx.isoReactRender({
    VDom: (
      <AppContainer/>
    ),
    reducer: noopReducer,
    clientScript: '/main.js',
  });
});
```

And use the state in the react component:

```js
const SampleStateContainer = connect(
  state => ({text: state.base.sampleState})
)(function SampleState({text}) {
  return (
    <div>{text}</div>
  );
});
```

## Styling
We support both global styles with [sass](https://sass-lang.com/guide) in `./src/client/stylesheets/main.scss` and modular styles with [styletron-react](https://github.com/styletron/styletron/blob/master/packages/styletron-react/README.md):

```js
import react from 'react';
import {styled} from 'onefx/lib/styletron-react';

const Panel = styled('div', {
  backgroundColor: 'silver',
});

export default <Panel>Hello</Panel>;
```

## Routing

server-side routing is using [koa-router](https://github.com/alexmingoia/koa-router) and located in `./src/server/server-routes.js`. The basic usage is:

```js
server
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
```

client-side routing is using [react-router v4](https://reacttraining.com/react-router/web/guides/quick-start) and located in `./src/shared/app.js`.

```js
<Switch>
  <Route exact path='/' component={Home}/>
  <Route component={NotFound}/>
</Switch>
```

## Fetching data

We use Apollo Graphql and TypeGraphQL for universal rendering with React. For detailed documentation, please visit:

1. [Define GraphQL schemas in TypeScript](https://typegraphql.ml/docs/getting-started.html)
2. [Learn how to fetch data with the Apollo Query component](https://www.apollographql.com/docs/tutorial/queries/)

### Make a query

In `src/api-gateway/resolvers/`, define a new resolver and method. Take the meta data endpoint of the server health for example.

```js
import { Query, Resolver, ResolverInterface } from "type-graphql";

@Resolver(_ => String)
export class MetaResolver implements ResolverInterface<() => String> {
  @Query(_ => String, { description: "is the server healthy?" })
  public async health(): Promise<string> {
    return "OK";
  }
}
```

and then in `api-gateway.ts`, mount the resolver.

```js
  const resolvers = [MetaResolver];
```

Now the server is ready and you can call the `health` endpoint at [https://localhost:5000/api-gateway/](https://localhost:5000/api-gateway/).

The next step is to call it from the React component.

### Organizing components with data

Directory structure

```txt
.
├── components
│   └── health-text.tsx
├── data
│   ├── __generated__
│   │   └── health.ts
│   └── queries.ts  // or / and mutations.ts
├── health-controller.tsx
├── hooks
│   └── use-health.ts
└── index.ts
```

`components` is for view components only, for example `health-text.tsx`

```tsx
import { colors } from "@/shared/common/styles/style-color";
import CheckCircleTwoTone from "@ant-design/icons/CheckCircleTwoTone";
import CloseCircleTwoTone from "@ant-design/icons/CloseCircleTwoTone";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import React from "react";

type Props = {
  loading: boolean;
  health?: string;
  error: boolean;
};

export const HealthText: React.FC<Props> = ({
  loading,
  health,
  error
}: Props) => {
  if (loading) {
    return (
      <div>
        <LoadingOutlined /> Checking Status
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <CloseCircleTwoTone twoToneColor={colors.error} /> Not OK
      </div>
    );
  }

  return (
    <div>
      <CheckCircleTwoTone twoToneColor={colors.success} /> {health}
    </div>
  );
};
```

`data` is for GraphQL queries and mutations. For example, `health-controller.tsx`. Whenever it changes, please run `npm run schema:generate` to generate type definitions again.

```tsx
import gql from "graphql-tag";

export const getHealth = gql`
  query GetHealth {
    health
  }
`;
```

`hooks` are lifecyle functions for components

```tsx
import { GetHealth } from "@/shared/home/data/__generated__/getHealth";
import { getHealth } from "@/shared/home/data/quries";
import { useQuery } from "react-apollo";

export const useGetHealth = () => {
  const { loading, data, error, refetch } = useQuery<GetHealth>(getHealth, {
    ssr: false
  });
  return { loading, data, error, refetch };
};
```


And finally `*-controller.tsx` connects data with view components via hooks.

```tsx
import { useGetHealth } from "@/shared/home/hooks/use-health";
import React from "react";
import { HealthText } from "./components/health-text";

export const HealthController: React.FC = () => {
  const { loading, data, error } = useGetHealth();
  return <HealthText loading={loading} error={!!error} health={data?.health} />;
};
```

## Internationalization

Onefx reads translations from `./translations` directory. Please create a file there named with a corresponding locale, for example, `en.yaml`. And then add an entry

```yaml
homepage.hello: hello, ${userName}!
```

### React / Client-side

and then in the react view file (client-side)

```js
import {t} from 'onefx/lib/iso-i18n';

function Greetings() {
  return (
    <div>{t('homepage.hello', {userName: 'John'})}</div>
  );
}
```

When users visit this site with `accept-language: en` in the header, which is set by the browser, then they will see translated greetings. If you want to explicitly set the locale, then visit the page with a query string `?locale=en` then it will memorize this in the cookie.

### Server-side

`t` singleton function does not work in the server-side because the async calls may switch the context and mix it with requests from other languages. In this case, please use `ctx.t` instead.

## Testing
test files are supposed to be placed in any module like `./__test__/example.test.js` in [ava test utils](https://github.com/avajs/ava/tree/master/docs).

```js
import test from 'ava';

test('testname', async t => {
  // ...
});

```

## Security
Onefx enables secure web app development with

1. CSRF protection that can be exempted at `./config/default.js` (`config.server.noCsrfRoutes`)
2. Helmet headers that can be exempted at `config.server.noSecurityHeadersRoutes`
3. Content Security Policy configured at `config.csp`

for example, in `default.js`,

```js
  server: {
    noSecurityHeadersRoutes: {
      '/embed/checkout/': true,
    },
    noCsrfRoutes: {
      '/api-gateway/': true,
    },
  },
  csp: {
    'default-src': [
      'none',
    ],
  }
```

## Static assets
Static assets are placed in `./client/static/` and loaded into the root directory of the website. Take `./client/static/favicon.png` for example, you can get it at [http://localhost:4100/favicon.png](http://localhost:4100/favicon.png), or use it in the react component:

```js
import {assetURL} from 'onefx/lib/asset-url';

function ImgExample() {
  return (
    <img src={assetURL('favicon.png')}/>
  );
}
```

## Configuration

### Environment variables
The environment variable is read from commandline as well as `.env` file. Take `PORT` for example,

```bash
PORT=4004 npm run watch
```

or in `.env` file

```env
PORT=4004
```

In the js file, you can read the value by `process.env.PORT`.

### Static configuration

The static configuration is located in `./config` and can be read according to the environment variable `NODE_ENV`.

### CDN

If you want to setup CDN for the static resources, I recommend [BunnyCDN](https://bunnycdn.com/?ref=qrv5hbyzrq) for its ease-of-use and cost-effectiveness. Then configure OneFx as

```js
module.exports = {
  // ...
  server: {
    // ...
    cdnBase: 'https://example-cdn.net',
  }
  // ...
}
```

And then when loading static assets, you just follow the same practice with the static assets.

```js
import {assetURL} from 'onefx/lib/asset-url';

function ImgExample() {
  return (
    <img src={assetURL('favicon.png')}/>
  );
}
```

## References
Tech Stack

* [react - view](https://reactjs.org/)
	* [styletron - local style in JS](https://github.com/rtsao/styletron)
	* sass - global style in sass
	* [flexbox - view layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

* [redux - state management](https://redux.js.org/)

* [Koa.js - server](http://koajs.com/)

* [graphql apollo - api gateway](https://www.apollographql.com/)

* [MongoDB mongoose - database ODM](https://mongoosejs.com/)

* [MySQL sequalize - database ORM](http://docs.sequelizejs.com/)

Design Resources

* [Carbon Design System](http://carbondesignsystem.com/)
* [Font Awesome](http://fontawesome.io/)
* [flaticon - icons and graphics](https://www.flaticon.com/)

## Run on Windows

1. install [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Choose Ubuntu, for example.
2. On WSL Ubuntu, install node version manager and install the latest lts dubnium

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm ls
nvm install lts/Dubnium
nvm use lts/dubnium
```

3. clone repo to `C:/`

```bash
cd /mnt/c/
git clone https://github.com/puncsky/web-onefx-boilerplate.git
```

4. install [VS Code](https://code.visualstudio.com/) and open WSL terminal with ctrl + ` . Not sure about WSL terminal? Go to [this post](https://blogs.msdn.microsoft.com/commandline/2017/10/27/running-node-js-on-wsl-from-visual-studio-code/).
