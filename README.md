# Avoidable

Avoidable is a `ScrollView` component to handle Keyboard interaction with `TextInputs`

## Motivation

Focusing a single input above the keyboard can be tricky at times, but focusing a whole form is lot more difficult than it should be.

## Solution

Our package aims to improve the way keyboards and inputs are being handled, giving you multiple ways to get the input into a visible spot.

![FocusToInput](https://user-images.githubusercontent.com/82050258/182376886-3a9c605a-99eb-4ee8-b9cb-7f8e7ac5dc8a.gif)

## Table of contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
  - [Avoidable](#avoidable-1)
    - [Props](#avoidable-props)
  - [Avoidable.Area](#avoidablearea)
- [Examples](#examples)
  - [Example App](#example-app)
- [Usage](#usage)
  - [Focus To Input](#focus-to-input)
  - [Focus To Input - Context Aware](#focus-to-input---context-aware)
  - [Focus To Bottom](#focus-to-bottom)
  - [Focus To Bottom - Context Aware](#focus-to-bottom---context-aware) 

## Installation

Installation can be done through `npm`:

```shell
npm install avoidable
```
 or `yarn`:
```shell
yarn add avoidable
```

## Quick Start

Wrap your form with the Avoidable Component

```javascript
  <Avoidable>
    <TextInput placeholder="Email" />
    <TextInput placeholder="Password" />
    <Button title="Log In" />
  </Avoidable>
```

Or define an area within your Avoidable Component

```javascript
 <Avoidable>
    {/* Content above */}
    <Avoidable.Area>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <Button title="Log In" />
    </Avoidable.Area>
    {/* Content below */}
  </Avoidable>
```
## API

### `Avoidable`

This is the main Component. You have to wrap your entire screen with `<Avoidable>` component in order for it to work as expected.

#### Avoidable Props
|Name|Type|Description|
|--|--|--|
|focusTo| `String` - `'input'` or `'bottom'` | Determines where the focus goes. If `input`, the focused input will be right above the keyboard. If `bottom`, the last component inside `<Avoidable>` (or inside `<Avoidable.Area>`) will be focused right above the keyboard. Default: `input` |
|contextAware| `Boolean` | If `true`, input will only go above the keyboard if it normally would get covered by the keyboard when opened. Default `true` |
|containerStyle| `Style` | Container Styles passed to the `ScrollView` |
|keyboardHiddenContainerStyle| `Style` | Container Styles passed to the `ScrollView`. Applied only when the keyboard is hidden |
|scrollViewProps| `Object` | Props passed to the `ScrollView`|
|safeMarginContentHeight| `Number` | Safe Margin to determine if content fits between top of screen and keyboard. |
|safeMarginBottom| `Number` | Safe Margin between focused input and keyboard |


### `Avoidable.Area`

This is the component to specify where your form or selection of inputs would be. This is only used with `focusTo` set to `bottom` and is neccesary when `contextAware` is true.

## Examples

### Example App

Our example app includes all the basic use cases of our component.
You can run the example app by cloning our repo and following these steps:

```shell
cd example
npm install
cd ios && pod install # only on iOS
cd .. && npx react-native run-ios
```

## Usage

### Focus to Input 

```javascript
 <Avoidable
  focusTo="input"
  contextAware={false}
 />
```

*insert gif*

### Focus to Input - Context Aware

```javascript
 <Avoidable
  focusTo="input"
  contextAware={true}
 />
```

*insert gif*

### Focus to Bottom

```javascript
 <Avoidable
  focusTo="bottom"
  contextAware={false}
 />
```

*insert gif*

### Focus to Bottom - Context Aware

```javascript
 <Avoidable
  focusTo="bottom"
  contextAware={true}
 />
```

*insert gif*



