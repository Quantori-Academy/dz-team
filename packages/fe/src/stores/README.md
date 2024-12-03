# Store: The Origin of (almost) Everything

Stores are objects which provide the state of the application. These objects are accessible with help of the hooks and special helpers. The only way to change the state inside a store is to dispatch an event or effect on it.

We chose **effector** - it's a comprehensive state management library designed to facilitate efficient and predictable state management in TypeScript applications.
The main advantage of **effector** is that it allows us to separate business logic and interaction with UI elements. This is very important for applications that perform significant data processing and transformation. When code working with data spreads across multiple files, it becomes quite difficult to keep track of it and maintain its integrity.

Here’s a summary of its core concepts and the state management flow, along with key functions from both `effector` and `effector-react`.

## Core Concepts

-   **Store**: The fundamental concept in Effector, a store represents a state container that holds the application's state. You can create a store with `createStore()` and it will keep the state, which can be updated by effects or events.

```ts
import { createStore } from "effector";
const $counter = createStore<number>(0);
```

-   **Event**: Events in Effector are used to trigger state changes. They don't hold any state themselves but can be used to update the stores.

```ts
import { createEvent } from "effector";
const increment = createEvent();
```

-   **Effect**: Effects are used for handling side effects in Effector. An effect is a function that can be called like any event, but it can also handle asynchronous operations such as API calls.

```ts
import { createEffect } from "effector";
const fetchUserData = createEffect(async (userId) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
});
```

-   **Domain**: Domains provide a method to group and manage multiple stores, events, and effects under a single unit. This is particularly useful for code organization and modularization.

```ts
import { createDomain } from "effector";
const appDomain = createDomain();
```

-   **Combine**: This function allows you to create a new store based on other stores. It recalculates its value whenever any of the dependent stores change.

```ts
import { combine } from "effector";
const $total = combine($counter, $anotherStore, (counter, another) => counter + another);
```

-   **Sample**: This function allows you to bind stores to events or effects, control the flow of data, and reduce the frequency of updates, which is helpful for optimization of rendering or reducing computational load.

```ts
import { sample } from "effector";
sample({
    clock: increment,
    source: $counter,
    fn: (count) => count + 1,
    target: $counter,
});
```

### Functions/helpers in `effector-react`

-   `useUnit()`: React hook to subscribe to store changes.
-   `createGate()`: Creates a component or hook that can trigger events on component mount and unmount, useful for initializing and cleaning up resources.
-   `useGate()`: Hook for passing data to Gate.

## Basic principles

-   Application stores should be as light as possible - the idea of adding a store for specific needs should not be frightening or damaging to the developer;
-   Application stores should be freely combined - data that the application needs can be statically distributed, showing how it will be converted in runtime;
-   Autonomy from controversial concepts - no decorators, no need to use classes or proxies - this is not required to control the state of the application and therefore the api library uses only functions and plain JS objects.

The main principle of working with **effector** is that here the store is not a single structure that contains all the elements necessary for the application to work, but is a set of small stores, each of which is responsible for a single process or displayed element. This allows us to simplify effects and events when updating some data. And helps avoid unnecessary re-renders during updates.

That is, always create a store containing the minimum required set of data for a specific task. Don’t try to stuff everything useful and necessary only sometimes. You can always create a new store by combining several existing stores into one using `combine()`.

&#x2757; Pay special attention to the [naming conventions](https://effector.dev/en/conventions/naming/) used for the **`effector`**.

## Example

The `example.ts` file contains code that is almost "working".
There is a `$dirty` store that stores the update status of data on the page.
There is a `$materials` store that stores a list of materials that are loaded from the server via effect when the application starts.
There is also a `$selected` store, which stores the currently selected material and is loaded either from the server (when the user comes to the page directly) or taken from the `$materials` store when the user clicks on a row in the list of materials on the page.

You will see many `sample` functions - this is the basis of working with the effector.
Each `sample` is a reaction to some event or change.
It is recommended to write a comment over each `sample` explaining the reason for creating this business flow element.

## Resources

-   [Welcome 🚀 effector](https://effector.dev/)
-   [Effector's beginner guide](https://dev.to/effector/effector-s-beginner-guide-3jl4)
-   [The best part of Effector](https://dev.to/effector/the-best-part-of-effector-4c27)
-   [Effector — DEV Community Profile](https://dev.to/effector)
-   [Effector on Best of JS](https://bestofjs.org/projects/effector)
