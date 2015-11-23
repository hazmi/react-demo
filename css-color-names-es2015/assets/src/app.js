import React from "react";
import ReactDOM from "react-dom";

class Page extends React.Component {
  render() {
    return (
      <div className="page">
        Hello World
      </div>
    )
  }
}

ReactDOM.render(
  <Page />, document.getElementById('page')
)

