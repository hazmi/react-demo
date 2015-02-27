var App = App || {};

App.ColorHeader = (function(){
    var self = React.createClass({
        render: function(){
            return (
                <div id="color-header">
                    <div className="title">
                        <h1>CSS Color Names</h1>
                        <p>Displaying {this.props.displayCount} of {this.props.total}</p>
                    </div>
                    <div id="action" className={this.props.order}>
                        <span className="label-sort">Sort by:</span>
                        <a className="btn btn-sort-date" href="#/date">Date</a>
                        <a className="btn btn-sort-name" href="#/name">Name</a>
                        <a className="btn btn-add" onClick={this.props.onAdd}>Add</a>
                    </div>
                    <input className="txt-filter" placeholder="Filter.." onChange={this.props.onChange}  />
                </div>
            )
        }
    });
    return self;
})();