# Will Pickard Submission
Hope I did everything to the requirements, didn't 100% understand how you wanted me to build the tree data structure from the Schema type. 

I know you said I didn't need to modify data.ts but I added an interface to represent entities with a displayName and systemName, this made reusing the types easier to work with. 

The search function could be improved. It's just your basic token search.

I would like to add the functionality to open the tree to a leaf when the search only matches that leaf and the leaf is not displayed. 


# Rewired Searchable Tree Take Home 

Assemble is a browser based application that has a number of complex user interactions. 

The goal of this test is to gauge your ability to design and implement non-trivial front-end components and 
see whether you make "good" decisions about component boundaries, composition, and prop types.
To us, a good component is one that easy to test, reason about, and re-use without added complexity.

## How to Take The Test

This test includes React Typescript scaffolding bootstrapped with `create-react-app`. The bottom of this README
is the original `create-react-app` README, so you can find development instructions there.

If you don't want to use Typescript, simply change the extension of `App.tsx` and `MyTree.tsx` to `.jsx`, and type-checking will
be disabled. 

We use React, but know that there are many other frameworks like Vue, Angular, Svelte, etc. that involve similar skills.
If you'd like to solve this take home using a different framework, that's totally fine, but we don't have scaffolding set up for those,
so you'll need to set up a lot more.

To submit, clone this repo, create a branch called `<your-first-name>-<your-last-name>` and commit your changes there. Next, push your branch to a repo 
on your personal Github Account, and share it with `ben-pr-p`. Send an email to hiring@politicsrewired.com
(replying in your thread is great) letting us know you've finished, and include any additional thoughts you have on your solution,
such as why you did what you did, other things you considered, and maybe how it could be refactoring depending on how the uses of the 
component evolved over time.

We're not 100% sure how long this will take, but please don't spend more than 3 hours on it. If you're about to run out of time, just submit what
you have, describe what you would have done if you had more time, and take a stab at answering the questions.

## Getting Started with Your Development Environment

To run this, you'll need NodeJS and Yarn installed locally. If you need to install those, 
we recommend [installing nvm](https://github.com/nvm-sh/nvm#installing-and-updating), installing Node LTS via nvm 
(`nvm install --lts && nvm use --lts`), and [installing yarn via npm](https://classic.yarnpkg.com/lang/en/docs/install/).

Next, you can run:
```
yarn install
yarn start
```
The development server might take a minute or so to boot up each time you start it.

to start developing, and:
```
yarn test
```
to run the tests.

If you run into any issues getting up and running, just email us!

## What To Do

Inside of App.tsx and after running `yarn start`, you'll see a basic page that has four collapseable
panels, each of which renders the `MyTree` component and some other controls. In a real application,
these would likely be on four separate screens, but we've put them all on one to keep things simple.

For this take home, you should only need to edit the contents of `src/MyTree.tsx` and additionally change 
what props get passed to the component in `src/App.tsx`. 

### Replacing Sample Data with Test Data

First, we want it to make so `MyTree` displays the data in `./src/data.ts` passed through as a prop, not
the sample data hardcoded inline. The structures here are a bit different, so they'll need to be converted.
Each schema should be a node, and each table a child of it. Each table should have 3 children: forms, views,
and columns, which each have the forms, views, and columns as children for that table node.

### Making Your Component Re-Usable

Second, we'll need to make each of these four panels work as desired. In each stage, we add another piece of required
functionality to the `MyTree` component. We recommend reading through and understanding the 4 additions you'll need to make ahead of time
before starting on the first.

#### Basic

For the first ("Basic"), we just want search to work. By "work", we mean that you can only see
objects (columns, forms, views, tables, etc.) whose display name or system name matches the user provided text.

We want to preserve full paths to leaf nodes though, so if the user types in some text that matches a column,
we'll want the schema and table for that column to be present.

#### Adding Another Filter Layer

For the second ("With Public Filter"), we're adding a checkbox. If checked, only objects where public is true 
should be shown. Just like with searching, we everything on the way to a leaf to be shown, so if a schema is not public
but a table in it is, it should be shown. If public is not checked, all objects should be shown. Columns have no public
attribute, and so they should be shown regardless of whether public is checked if they match the search.

#### Enhancing the Display with Type Icons

For the third ("With Type Icons"), we're adding custom icons. In the data structure that we pass to the Ant Design
tree component, we can include an `icon` prop which is a React Component. We've included some suggested icons inside
the `./src/MyTree.tsx` file, as well as shown with `sampleData` how to pass the `icon` component to the `Tree` in a
random manner. 

For this, we're not adding these icons to all of them - just the third.

#### Enhancing the Display with System Names

For the fourth, we want to add the system name in parenthesis next to the display name, so the sample table Volunteers
should display as `Volunteers (volunteers)`. Again, this should only be for the fourth panel, not all. 

If you need the Ant Design docs, [they are here](https://ant.design/components/), but you probably don't need them: 
you should be able to solve this problem without adding or changing the props passed to `Tree` or any 
other Ant Design components. 

# Full Create React App Generated Readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
