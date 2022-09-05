# Avoidable
![test status](https://github.com/algotech/avoidable/actions/workflows/main.yml/badge.svg)

Avoidable is a custom package to handle Keyboard interaction with `TextInputs`

## Motivation

Getting a single input to show up above the keyboard can be tricky at times, but making a whole form visible at once is lot more difficult than it should be.

## Solution

This package aims to improve the way keyboards and inputs are being handled, giving you multiple ways to get the input into a visible spot.

![AlignToInput](https://user-images.githubusercontent.com/82050258/182376886-3a9c605a-99eb-4ee8-b9cb-7f8e7ac5dc8a.gif)

## Table of contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
  - [Avoidable](#avoidable-1)
    - [Props](#avoidable-props)
  - [Avoidable.Area](#avoidablearea)
- [Dependencies](#dependencies)
- [Example App](#example-app)
- [Usage](#usage)
  - [Align To Input](#align-to-input)
  - [Align To Input - Context Aware](#align-to-input---context-aware)
  - [Align To Bottom](#align-to-bottom)
  - [Align To Bottom - Context Aware](#align-to-bottom---context-aware) 

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

Wrap your screen with the Avoidable Component

```javascript
  <Avoidable>
    <TextInput placeholder="Email" />
    <TextInput placeholder="Password" />
    <Button title="Log In" />
  </Avoidable>
```

Note
>You have to wrap your entire screen with `<Avoidable>` component in order for it to work as expected.

And/or define an area within your Avoidable Component

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

This is the main component, built around a `ScrollView` component, that should wrap the entire screen it is used on. 

#### Avoidable Props
|Name|Type|Description|
|--|--|--|
|alignTo| `String` - `'input'` or `'bottom'` | Determines what gets aligned to the keyboard. If `input`, the focused input will be right above the keyboard. If `bottom`, the last component inside `<Avoidable>` (or inside `<Avoidable.Area>`) will be positioned right above the keyboard. Default: `input` |
|contextAware| `Boolean` | If `true`, input will only go above the keyboard if it normally would get covered by the keyboard when opened. Default `true` |
|containerStyle| [View Style](https://reactnative.dev/docs/view-style-props) | Container Styles passed to the `ScrollView` |
|keyboardHiddenContainerStyle| [View Style](https://reactnative.dev/docs/view-style-props) | Container Styles passed to the `ScrollView`. Applied only when the keyboard is hidden |
|scrollViewProps| `Object` - [ScrollView Props](https://reactnative.dev/docs/scrollview#props) | Props passed to the `ScrollView`|
|safeMarginContentHeight| `Number` | `safeMarginContentHeight` is the adjustment to the height of the elements that you want to align when determining if the content fits between the keyboard and the top of the screen. This is important when aligning to `bottom` but, the content does not fit, it will automatically align to `input`. Default `0` |
|safeMarginBottom| `Number` | `safeMarginBottom` is the distance between the keyboard and the desired element that it gets aligned to. If you want to leave some space between the keyboard and your input or form change this. Default `0` |

### `Avoidable.Area`

Only when `contextAware = true` and `alignTo = 'bottom'` an Area must be defined in order for the package to work properly. This component specifies the components/inputs that should avoid the keyboard.

## Dependencies

`react-native-safe-area-context`

Having `react-native-safe-area-context` as a dependency also means you will have to define a `SafeAreaProvider` in order for this to work. More details [here](https://github.com/th3rdwave/react-native-safe-area-context#safeareaprovider).

## Example App

The example app includes all the basic use cases of our component.
You can run the example app by cloning the repo and following these steps:

```shell
cd example
npm install
cd ios && pod install # only on iOS
cd .. && npx react-native run-ios
```

## Usage

### Align to Input 

```javascript
 <Avoidable
  alignTo="input"
  contextAware={false}
 />
```

![AlignToInput](https://user-images.githubusercontent.com/82050258/182376886-3a9c605a-99eb-4ee8-b9cb-7f8e7ac5dc8a.gif)

### Align to Input - Context Aware

```javascript
 <Avoidable
  alignTo="input"
  contextAware={true}
 />
```

![AlignToInputCA](https://user-images.githubusercontent.com/82050258/186087504-392d4ccd-35a2-4be5-b8f6-2d9b7ba77fbb.gif)


### Align to Bottom

```javascript
 <Avoidable
  alignTo="bottom"
  contextAware={false}
 />
```

![AlignToBottom](https://user-images.githubusercontent.com/82050258/186087525-263fcd12-14d4-47e6-bd76-437f573cc9ed.gif)


### Align to Bottom - Context Aware

```javascript
 <Avoidable
  alignTo="bottom"
  contextAware={true}
 />
```

![AlignToBottomCA](https://user-images.githubusercontent.com/82050258/186088066-c64e51d2-cea6-4303-8e1c-886d03e4d6f6.gif)
