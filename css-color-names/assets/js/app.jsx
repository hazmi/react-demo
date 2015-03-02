var App = App || {};

App.ColorApp = (function(){

    App.MAX_ROW        = 4;
    App.ITEM_WIDTH     = 95;
    App.ITEM_HEIGHT    = 95;
    App.NUM_INIT_ITEM  = 10;
    App.SORT_NAME      = 'name';
    App.SORT_DATE      = 'date';
    App.COLORS         = [];
    App.TARGET_HTML_ID = 'color-app';

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    var ColorHeader = App.ColorHeader;
    var ColorFooter = App.ColorFooter;
    var ColorItem = App.ColorItem;

    var ColorApp = React.createClass({
        refreshData: function(keyword, data){
            keyword = (keyword !== null) ? keyword : this.state.searchKeyword;
            data = (data !== null) ? data : this.state.data;
            filterInfo = App.Utils.filterDisplayInfo(data, keyword);
            this.setState({
                displayCount: filterInfo.count,
                data: App.Utils.setupSortOrder(filterInfo.data),
                searchKeyword: keyword
            });
        },
        handleChange: function(e){
            this.refreshData(e.target.value, null);
        },
        handleAdd: function(){
            var data = this.state.data;
            var newData = App.Utils.getColor();
            newData.order.date = this.state.data.length;
            data.push(newData);
            this.refreshData(this.state.searchKeyword, data);
        },
        handleRemove: function(index){
            var data = this.state.data;
            data.splice(index, 1);
            data = App.Utils.setupSortOrder(data);
            this.refreshData(this.state.searchKeyword, data);
        },
        getInitialState: function() {
            return {
                data: [],
                displayCount: 0,
                order: 'date',
                searchKeyword: ''
            };
        },
        componentDidMount: function() {
            var setState = this.setState;
            var router = Router({
                '/date': setState.bind(this, {order: 'date'}),
                '/name': setState.bind(this, {order: 'name'})
            });
            router.init('/date');
            this.setState({
                data: this.props.colors,
                displayCount: this.props.colors.length
            });
        },
        getColorListStyle: function(){
            var numColumn = Math.ceil(this.state.displayCount / App.MAX_ROW);
            var wrapperHeight = App.ITEM_HEIGHT * numColumn;
            return {
                height: wrapperHeight
            };
        },
        render: function(){
            var colorListStyle = this.getColorListStyle();

            var items = this.state.data.map(function(color, index) {
                var order = color.order[this.state.order];
                return (
                    <ColorItem
                        key={color.id}
                        order={order}
                        display={color.display}
                        colorName={color.name}
                        onRemove={this.handleRemove.bind(this, index)}
                        searchKeyword={this.state.searchKeyword}
                    />
                );
            }.bind(this));

            return (
                <div>
                    <ColorHeader
                        total={this.state.data.length}
                        displayCount={this.state.displayCount}
                        order={this.state.order}
                        onAdd={this.handleAdd}
                        onChange={this.handleChange}
                    />
                    <div id="color-list" style={colorListStyle}>
                        <ReactCSSTransitionGroup transitionName="items">
                            {items}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            );
        }
    });

    var self = {
        render: function( colors ){
            App.COLORS = colors;
            var intialColors = App.Utils.getInitialRandomColors( App.NUM_INIT_ITEM );

            React.render(
                <ColorApp
                    colors={intialColors}
                />,
                document.getElementById( App.TARGET_HTML_ID )
            );
        }
    };
    return self;
})();

var colors = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua','orange','aliceblue','antiquewhite','aquamarine','azure','beige','bisque','blanchedalmond','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','gainsboro','ghostwhite','gold','goldenrod','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','limegreen','linen','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','oldlace','olivedrab','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','thistle','tomato','turquoise','violet','wheat','whitesmoke','yellowgreen','rebeccapurple'];

App.ColorApp.render(colors);