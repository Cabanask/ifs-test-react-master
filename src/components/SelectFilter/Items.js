import React, {PropTypes } from 'react'
import styles from './index.css'
const Items = React.createClass({
    propTypes: {
        name: PropTypes.string,
        onSelectItem:PropTypes.func,
        itemNameSelect:PropTypes.string,
    },
    getInitialState:function() {
        let css = styles.itemNotSelect;
        if(this.props.itemNameSelect == this.props.name) {
            css = styles.itemIsSelect;
        }
        return {
            name:this.props.name,
            css: css,
        }
    },
    handleSelect : function (){
        this.props.onSelectItem(this.state.name)
    },
    componentDidMount: function () {
    
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({name:nextProps.name})
        this.setState({css:styles.itemNotSelect})
        if(nextProps.name == nextProps.itemNameSelect) {
            this.setState({css:styles.itemIsSelect})
        }

    },
    componentWillUnmount: function () {
    
    },
    render() {
        return (
            <div className={this.state.css} >
                <label onClick={this.handleSelect}>{this.state.name}</label>     
            </div>
        );
    }
})
export default Items;