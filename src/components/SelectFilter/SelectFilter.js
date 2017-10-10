import React, {PropTypes } from 'react'
import styles from './index.css'
import Items from './Items.js'
const SelectFilter = React.createClass({
    propTypes: {
        onSelectCategorie: PropTypes.func,
    },
    getInitialState:function() {
        return {
            filters:null,
            inputValue:null,
            listItem:null,
            itemNameSelect:null,
        }
    },
    handleChange : function (e){
        this.setState({inputValue:e.target.value});
        this.buildItem(e.target.value,this.state.filters,null,this.state.itemNameSelect)   
    },
    handleSelectCategorie : function (categorie){
        this.props.onSelectCategorie(categorie);
        this.setState({itemNameSelect:categorie});
        this.buildItem(this.state.inputValue,this.state.filters,null,categorie);   
    },
    buildItem : function (inputValue,filters,mode,categorie){
        if(inputValue == '') {
            inputValue = null;    
        }
        if(inputValue == null && filters != null) {
            this.setState({listItem:
                <div>
                    {filters.map( (row,index) => (
                        <div>
                            <label className={styles.labelListItem}>{filters[index].name}</label>
                            {filters[index].children.map( (rowB,indexB) => (
                                <Items key={indexB} itemNameSelect={categorie} onSelectItem={this.handleSelectCategorie.bind(this,rowB.name)} name={rowB.name}/>
                            ))}
                        </div>
                    ))}
                </div>
            })
            if(mode == 'build') {
                this.props.onSelectCategorie(null);
            }
        }
        if(inputValue != null && filters != null) {
            let result = this.getDataByInputValue(inputValue,filters);
            let listeByGenre = null;
            let listeByName = null;
            if(result.byGenre.length > 0){
                listeByGenre = 
                <div>
                <label className={styles.labelListItem} >By genre</label>
                        {result.byGenre.map( (rowC,indexC) => (
                        <Items key={indexC} itemNameSelect={categorie} onSelectItem={this.handleSelectCategorie.bind(this,rowC)} name={rowC}/>
                        ))}
                </div>;    
            }
            if(result.byName.length > 0){
                listeByName = 
                <div>
                    <label className={styles.labelListItem}>By name</label>
                    {result.byName.map( (rowD,indexD) => (
                    <Items key={indexD} itemNameSelect={categorie} onSelectItem={this.handleSelectCategorie.bind(this,rowD)} name={rowD}/>
                    ))}
                </div>;    
            }
            if(result.byGenre.length == 0 && result.byName.length == 0) {
                this.setState({listItem: <label className={styles.labelListItem} >No result found</label>})   
            }else {
                this.setState({listItem:
                <div>
                   {listeByGenre}
                   {listeByName}
                </div>
                })
            }   
        }
    },
    getDataByInputValue : function (inputValue,filters){ 
        let dataByName;
        let dataByGenre;
        if(filters[0].name =='By genre'){
            dataByGenre = filters[0].children;
            dataByName = filters[1].children;  
        } else {
            dataByGenre = filters[1].children;
            dataByName = filters[0].children;
        }
        let allStringInArray = {byName:[],byGenre:[]};
        for (let i = 0; i < dataByName.length; i++) {
            allStringInArray.byName.push(dataByName[i])
        }
        for (let y = 0; y < dataByGenre.length; y++) {
            allStringInArray.byGenre.push(dataByGenre[y])
        }
        let nbCaractInput = inputValue.length;
        let resultByMatch = {byName:[],byGenre:[]};
        for (let x = 0; x < allStringInArray.byName.length; x++) {
            let strByNbCaract = allStringInArray.byName[x].name.substring(0, nbCaractInput).toLowerCase()
            if(strByNbCaract == inputValue.toLowerCase()) {
                resultByMatch.byName.push(allStringInArray.byName[x].name)  
            }
        }
        for (let z = 0; z < allStringInArray.byGenre.length; z++) {
            let strByNbCaractB = allStringInArray.byGenre[z].name.substring(0, nbCaractInput).toLowerCase()
            if(strByNbCaractB == inputValue.toLowerCase()) {
                resultByMatch.byGenre.push(allStringInArray.byGenre[z].name)  
            }
        }
        return resultByMatch
    },
    componentDidMount: function () {
    
    },
    componentWillReceiveProps: function (nextProps) {
        if(nextProps.filters != null && nextProps.filters != this.state.filters) {
            this.setState({filters:nextProps.filters});
            this.buildItem(this.state.inputValue,nextProps.filters,'build',null);    
        }
    },
    componentWillUnmount: function () {
    
    },
    render() {
        return (
            <div >
                <b className={styles.InputLabel}>Select a channel</b>
                <input className={styles.inputStyle} type='text' name='filter' onChange={this.handleChange}/>
                <div className={styles.ContainerListItem}>
                    {this.state.listItem}
                </div>
            </div>
        );
    }
})
export default SelectFilter;