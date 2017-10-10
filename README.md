# ifs-test-react


# Specs

With ReactJS, create a select control with autocomplete **from scratch** (no extra libraries)

* Get data in the file by using an XHR request http://localhost:5000/category
* Pass the data to the component and build the select with it
* When the user type some text, the component is able to filter the result by displaying only the items that include the typing term
* We can select an item from the select by clicking on it.
* Please try to respect the mockup below, the CSS is also an important part ^^

## Expected Design
<img src="https://raw.githubusercontent.com/devaublanc/ifs-test-react/master/select.png" alt="select">

## Expected Result
<img src="https://raw.githubusercontent.com/devaublanc/ifs-test-react/master/result.gif" alt="result">

## Expected props

Prop | Description | Type | Default
---- | ----------- | ------- | -------
`filters` | Filters that contains the tree nodes | `array` | `null`
`onChange` | This function is executed when a filter is clicked. It return the current filter in the callback method | `func` | `() => {}`
`rootStyle` | Additional className to customize the style of the component | `string` | `null`


# Getting Started


## 1) Installation

```
$ git clone https://github.com/devaublanc/ifs-test-react.git
$ npm i
$ npm start
```

then open http://localhost:3005/

Also launch the API

```
$ npm run server
```

Now the api is running on http://localhost:5000 you can request your categories with this endpoint http://localhost:5000/category


## 2) Code the feature

We already create the configuration Webpack for you ;)
You have an empty component at `src/components/SelectFilter/index.js`, complete the code inside this file.

```javascript
export default class SelectFilter extends Component {

    static propTypes = {
        filters: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            children: PropTypes.array,
        })).isRequired,
        onChange: PropTypes.func,
        rootStyle: PropTypes.string
    }

    render() {
        const {
            rootStyle
        } = this.props;

        return (
            <div className={ classNames(styles.selectfilter, rootStyle)}>
                Code your Component here
            </div>
        )
    }
}
```

The component is initialize in `src/containers/Home/index.js`

```javascript
import React, { Component } from 'react'
import request from 'superagent'

// import components
import SelectFilter from 'components/SelectFilter'

import styles from './index.css'


export default class Home extends Component {

    componentDidMount() {
        // do your xhr request here (http://localhost:5000/category)
        request
            .get('http://localhost:5000/category')
            .end((err, res) => {
                if (res) {
                    console.log('res', res.body) // eslint-disable-line
                }
            });
    }

    render() {

        return (
            <div className={ styles.home }>
                <h1>ifs test react</h1>
                <SelectFilter
                    filters={[]}
                    onChange={(currentFilter) => {
                        console.log('currentFilter', currentFilter)
                    }}
                    rootStyle={ styles.filter }
                />
            </div>
        )
    }
}
```

## 3) Submit the feature

When you have finish, commit the feature on your fork and send us the link :) Thanks !

<img src="http://ljdchost.com/ODSWaAt.gif" alt="lol" width="250">
