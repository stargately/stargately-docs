---
id: doc3
title: Style Guide
---


## Avoid Bad Practices

### Avoid missing error-handling

❌ Bad

```js
try {
  const resp = await submitForm(values);
} catch (err) {
}
```

✅ Good

```js
try {
  const resp = await submitForm(values);
} catch (err) {
  notification.error({message: `failed to submitForm: ${err}`});
}
```

### Avoid callback hell (= spaghetti code + unpredictable error handling)

❌ Bad

```js
function submitForm(values, cb) {
  validateForm(values, (err) => {
    if (err) {
      return cb(err, null);
    }

    makeRequest(values, (err, resp) => {
      if (err) {
        return cb(err, null);
      }

      makeAnotherRequest(resp, (err, anotherResp) => {
        if (err) {
          return cb(err, null);
        }

        return cb(null, wrapResult(anotherResp));
      })
    })
  })
}

```

✅ Good

```js
const validateFormPromise = promisify(validateForm);
const makeRequestPromise = promisify(makeRequest);
const makeAnotherRequestPromise = promisify(makeAnotherRequest);

async function submitForm(values) {
  try {
    await validateFormPromise(values);
    const resp = await makeRequestPromise(values);
    const anotherResp = await makeAnotherRequestPromise(resp);
    return wrapResult(anotherResp);
  } catch (e) {
    throw e;
  }
}
```

### Always check responsiveness

Make sure it works on both mobile and desktop devices.

### Prefer early exit over indentations

❌ Bad

```jsx harmony
function someFunction(someCondition) {
  if (someCondition) {
      // Do Something
  }
}
```

✅ Good: Use early return

```jsx harmony
function someFunction(someCondition) {
  if (!someCondition) {
      return;
  }
  // Do Something
}
```

### Avoid super-long (>3) inheritance chain

### Avoid circular dependency



### Avoid complicated code

#### Avoid complicated tertiary operation

❌ Bad

```jsx harmony
const sampleComponent = () => {
  return isTrue ? <p>True!</p> : null
};
```

✅ Good: Use short-circuit evaluation

```jsx harmony
const sampleComponent = () => {
  return isTrue && <p>True!</p>
};
```

❌ Bad

```jsx harmony
// Y soo many ternary??? :-/
const sampleComponent = () => {
  return (
    <div>
      {flag && flag2 && !flag3
        ? flag4
        ? <p>Blah</p>
        : flag5
        ? <p>Meh</p>
        : <p>Herp</p>
        : <p>Derp</p>
      }
    </div>
  )
};
```

✅ Good: Move logic to sub-components

```jsx harmony
const sampleComponent = () => {
  return (
    <div>
      {
        (() => {
          if (flag && flag2 && !flag3) {
            if (flag4) {
              return <p>Blah</p>
            } else if (flag5) {
              return <p>Meh</p>
            } else {
              return <p>Herp</p>
            }
          } else {
            return <p>Derp</p>
          }
        })()
      }
    </div>
  )
};
```

#### Avoid commenting out unused code

### Avoid missing i18n

❌ Bad

```jsx harmony
<h1>My Awesome Project</h1>
<p>Create like a god. Command like a king. Work like a slave.</p>
```

✅ Good
```jsx harmony
<h1>{t('home.my_awesome_project')}</h1>
<p>{t('home.my_awesome_project_desc')}</p>
```

### avoid missing i18n RTL issues

❌ Bad

```jsx harmony
function Greeting({username}) {
  return (
    <h1>{t('home.hello')}, {username}!</h1>
  );
}

// home.hello: Hello
// home.hello: 你好
// home.hello: שלום
```

✅ Good
```jsx harmony
function Greeting({username}) {
  return (
    <h1>{t('hello')}, {username}</h1>
  );
}

// home.hello: Hello, ${username}!
// home.hello: 你好, ${username}!
// home.hello: !${username}, שלום
```

### Prefer CSS-IN-JS over global CSS styles unless they are truly global.

Local JS styles have better "deleteability".

❌ Bad

```scss
.header-col {
  text-align: right !important;
  word-break: normal !important;
  color: #73fbe0 !important;
  width: 20%;
}
```

✅ Good

```jsx harmony
import { styled } from "onefx/lib/styletron-react";
const Td = styled("div", {
  "textAlign":"right !important",
  "wordBreak":"normal !important",
  "color":"#73fbe0 !important",
  "width":"20%"
})
```

### DRY: don't repeat yourself

### Avoid simple copy-and-paste. Prefer using libraries directly understanding the code and remove unused places.
### Avoid unreasonable comments. Update or remove confusing comments.

## Use Consistent Project Structure

### 1. Use `index.js` for exporting the main component.

The `index.js` should always export the main component. This file should also be the `main` entry in the `package.json`.

### 2. Use lowercase kebab-case filenames

❌ Bad

```txt
MyAwesomeComponent.js
My-Awesome-Component.js
my_awesome_component.js
```

✅ Good

```txt
my-awesome-component.js
```

### 3. Prefer named exports over default exports

❌ Bad

`export default function() {}`

✅ Good

```jsx
// exports a function declared earlier
export { myFunction };
// exports a constant
export const foo = "bar";
```

## Effective refactoring

### adopt semantic version

### never introduce breaking change to non-major versions

two-legged change

## Avoid Bikeshedding

Let styles be consistent. Let linters lint.

### Prefer `px` over `pt`, `rem`.

Use `px`.

- Avoid using `pt`.
- Avoid using `rem`. In most cases, users want to see more contents instead of larger fonts with larger screens.



# UX Design Principles

* Empathy / Perspective-taking is the most important.
* Keep elements consistent.
* Insist on the Highest Standards.
* Detail-oriented
    * Check i18n.
    * Check accessibility.


