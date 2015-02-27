var colors = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua','orange','aliceblue','antiquewhite','aquamarine','azure','beige','bisque','blanchedalmond','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','gainsboro','ghostwhite','gold','goldenrod','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','limegreen','linen','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','oldlace','olivedrab','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','thistle','tomato','turquoise','violet','wheat','whitesmoke','yellowgreen','rebeccapurple'];

var config = {
    maxRow     : 4,     // max app row
    widthItem  : 95,    // item width
    heightItem : 95,    // item height
    firstLoad  : 10     // num of item to display at the initial load
};

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Page = React.createClass({
    getID: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomColor: function(){
        var key = this.getRandomInt(0, this.props.colors.length - 1);
        return this.props.colors[key];
    },
    addRandomData: function(){
        var data = this.state.data;
        data.push({
            id        : this.getID(),
            timestamp : Date.now(),
            name      : this.getRandomColor(),
            order     : 0
        });
        data = this.sortData(data);
        this.setState({data: data});
    },
    sortData: function(data, sortBy){
        sortBy     = (sortBy) ? sortBy : this.state.order;
        var mappedData = data.map(function(item, index) {
            return {
                index     : index,
                timestamp : item.timestamp,
                name      : item.name
            };
        });
        switch(sortBy){
            case 'date':
                mappedData.sort(function(a, b){
                    return a.timestamp - b.timestamp;
                });
                break;
            case 'name':
                mappedData.sort(function(a, b){
                    if(a.name < b.name){
                        return -1;
                    }else if(a.name > b.name){
                        return 1;
                    }
                    return 0;
                });
                break;
        }
        mappedData.map(function(item, index){
            data[item.index].order = index;
        });
        return data;
    },
    handleSort: function(orderBy){
        var data = this.state.data;
        this.setState({
            data  : this.sortData(data, orderBy),
            order : orderBy
        });
    },
    handleSortByName: function(){
        var orderBy = (this.state.order !== 'name') ? 'name' : 'date';
        this.handleSort(orderBy);
    },
    handleSortByDate: function(){
        var orderBy = (this.state.order !== 'date') ? 'date' : 'name';
        this.handleSort(orderBy);
    },
    handleAdd: function(){
        this.addRandomData();
    },
    handleRemove: function(index){
        var data = this.state.data;
        data.splice(index, 1);
        data = this.sortData(data);
        this.setState({data: data});
    },
    getInitialState: function() {
        return {
            data: [],
            order: 'date'
        };
    },
    componentDidMount: function() {
        for(var i=0; i<this.props.data.firstLoad; i++){
            this.addRandomData();
        }
        var setState = this.setState;
        var router = Router({
            '/date': setState.bind(this, {order: 'date'}),
            '/name': setState.bind(this, {order: 'name'})
        });
        router.init('/date');
    },
    render: function() {
        var numColumn = Math.ceil(this.state.data.length / this.props.data.maxRow);
        var wrapperHeight = this.props.data.heightItem * numColumn;
        var colorListStyle = {
            height: wrapperHeight
        };
        var items = this.state.data.map(function(color, index) {
            var curColumn = Math.ceil((color.order + 1) / this.props.data.maxRow);
            var curRow = color.order % 4;
            var colorStyle = {
                backgroundColor: color.name
            };
            var positionStyle = {
                top: this.props.data.heightItem * (curColumn - 1),
                left: this.props.data.widthItem * curRow
            };
            return (
                <span key={color.id} className="content-item" style={positionStyle}>
                    <span style={colorStyle} className="color-preview">
                        <button className="btn btn-remove" onClick={this.handleRemove.bind(this,index)}>X</button>
                        <span className="color-name">{color.name}</span>
                    </span>
                </span>
            );
        }.bind(this));
        return (
            <div>
                <div id="color-header">
                    <div className="title">
                        <h1>CSS Color Names</h1>
                        <p>{this.state.data.length} random colors added</p>
                    </div>
                    <div id="action" className={this.state.order}>
                        <span className="label-sort">Sort by:</span>
                        <button className="btn btn-sort-date" onClick={this.handleSortByDate}>Date</button>
                        <button className="btn btn-sort-name" onClick={this.handleSortByName}>Name</button>
                        <button className="btn btn-add" onClick={this.handleAdd}>Add</button>
                    </div>
                </div>
                <div id="color-list" style={colorListStyle}>
                    <ReactCSSTransitionGroup transitionName="items">
                        {items}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
});

React.render(<Page data={config} colors={colors}  />, document.getElementById('color-app'));