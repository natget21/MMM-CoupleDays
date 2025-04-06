# MMM-CoupleDays  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wiesty/MMM-CoupleDays/raw/master/LICENSE) <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"/>
MagicMirror² Module that displays the number of days, weeks, months, and years since a specified date, serving as a romantic reminder for couples.

![screenshot](docs/screenshot.jpg)

![screenshot](docs/screenshot2.png) ![screenshot](docs/screenshot3.png)
## Dependencies

- instance of MagicMirror²

## Installation

1. Clone this repository into your `modules` folder and install node dependencies:

   ```bash
   cd ~/MagicMirror/modules
   git clone https://github.com/wiesty/MMM-CoupleDays
   cd MMM-CoupleDays
   npm install
   ```

2. Modify the config template below
3. Add configuration to your config.js

## Example Config

```js
{
  module: "MMM-CoupleDays",
  position: "bottom_right",
  config: {
    name1: "Partner 1",
    name2: "Partner 2", 
    // If name2 is "", it only shows the first name (for birthday trackers for example)
    
    date: "2023-01-01",
    // year-month-day
    
    transitionDuration: 5000,
    // in ms
    
    language: "en", 
    // (filename without the .json from the translations folder)
    
    textColor: "white", 
    // any valid CSS color value For example, "red," or "#FFA500" (hex color),
    
    extraDates: [
        {label: "Since second event", date: "2023-01-02"}, 
        {label: "Since third event", date: "2023-01-03"}
    ], 
    // add list of additional dates and labels to be shown
    
    showExtraDates: false, 
    // extraDates are shown when this is true
    
    ExtraDatesViewMode: "loop", 
    // allowed values are one of these options : -> "loop" - "days" - "weeks" - "months" - "years" - "total"
    
    vectorImgUrl: "", 
        // add your image in assets and pass the relative url example /modules/MMM-CoupleDays/asset/image.png or pass vector url to be shown; if null or empty default image will be shown
    
    showVectorImg: false, 
        // vector image will only be shown if this is true
    
    landscapeMode: false, 
        // if true days will be rendered side by side to the vector image
  }
},
```

The module allows you to customize the names of the partners, the starting date, and the transition duration for smooth animations. It automatically calculates the elapsed time and updates the display every second.

The module supports different styles of displaying the time, which transition in a loop with a configurable duration. The styles include showing only the number of days, the number of weeks, the number of months, or a combination of years, months, weeks, and days.

## Contributions

Help with translating the module is always appreciated!

Credits:

- de - wiesty
- en - wiesty
- it - [IGOLz](https://github.com/IGOLz)
- fr - [torjc01](https://github.com/torjc01)
- pt - [torjc01](https://github.com/torjc01)
- zh-cn - [wedding0371](https://github.com/wedding0371)
- nl - [Koesie77](https://github.com/Koesie77)
- hr - [luaxv](https://github.com/ubeganov)
- ? - maybe you :) ?

## Developer commands

- `npm run lint:check` - Run linting and formatter checks.
- `npm run lint:fix` - Fix linting and formatter issues.

* To test changes locally comment the this.updateDom(); call on the MMM-CoupleDays.js file and open test/test.html on your browser after finish testing uncomment it back