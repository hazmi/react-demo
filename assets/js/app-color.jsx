var App = App || {};

App.ColorItem = (function(){
    var self = React.createClass({
        getInitialState: function(){
            return {
                display: this.props.display,
                order: this.props.order
            }
        },
        componentWillReceiveProps: function(nextProps){
            this.setState({
                display: nextProps.display,
                order: nextProps.order
            });
        },
        shouldComponentUpdate: function(nextProps, nextState){
            return (this.state.display === nextProps.display && this.state.order === nextProps.order) ? false : true;
        },
        render: function(){
            var curColumn = Math.ceil((this.props.order + 1) / App.MAX_ROW);
            var curRow = this.props.order % 4;
            var colorStyle = {
                backgroundColor: this.props.colorName
            };
            var positionStyle = {
                top  : App.ITEM_HEIGHT * (curColumn - 1),
                left : App.ITEM_WIDTH * curRow
            };
            var cx = React.addons.classSet;
            var classes = cx({
                'content-item': true,
                'content-item-hide': !this.props.display
            });
            return (
                <span key={this.props.key} className={classes} style={positionStyle}>
                    <span style={colorStyle} className="color-preview">
                        <button className="btn btn-remove" onClick={this.props.onRemove}>X</button>
                        <span className="color-name">{this.props.colorName}</span>
                    </span>
                </span>
            )
        }
    });
    return self;
})();