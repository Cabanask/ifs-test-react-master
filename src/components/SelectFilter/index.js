import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import styles from './index.css'
import Filter from './SelectFilter.js'

export default class SelectFilter extends Component {
    
    static propTypes = {
        filters: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            children: PropTypes.array,
        })).isRequired,
        onChange: PropTypes.func,
        rootStyle: PropTypes.string,
    }
    handleSelectedCategorie = function (categorie){
        this.props.onChange(categorie)
    }
    
    render() {
        const {
            rootStyle
        } = this.props;
        return (
            <div className={ classNames(styles.selectfilter, rootStyle)}>
                <Filter {...this.props} onSelectCategorie={this.handleSelectedCategorie.bind(this)}/>
            </div>
        )
    }
}
