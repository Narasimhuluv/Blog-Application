import React from "react";
import { tagsUrl } from "../utls/ApiLinks";
class AllTags extends React.Component {
  constructor() {
    super();
    this.state = {
      allTags: [],
    };
  }
  componentDidMount() {
    this.FetchAllTags();
  }
  FetchAllTags = () => {
    fetch(tagsUrl)
      .then((res) => res.json())
      .then((alltags) => {
        this.setState({
          allTags: alltags.tags,
        });
      });
  };
  render() {
    var { tagName } = this.props;
    var tags = this.state.allTags;
    // filterTags
    var filterTags = tags.filter((elem, index) => {
      return tags.indexOf(elem) === index;
    });
    return (
      <div className="w-4/12 ">
        <h2 className="m-4  text-xl font-extrabold">Popular Tags</h2>
        <div className="p-1 h-2/6 py-2 rounded-lg overflow-y-scroll Tags">
          <div className=" flex justify-between flex-wrap ">
            {filterTags.map((each) =>
              // each === "" ? "" : <button key={each} className={tagName===each ? "border py-1 px-4 m-1 rounded-lg bg-yellow-400 text-white shadow-md text-sm" : "border py-1 px-4 m-1 rounded-lg shadow-md text-sm"}   onClick={(e) => this.props.handleTag(e)} data-value={each}>{(each)}</button>
              each === "" ? (
                ""
              ) : (
                <button
                  key={each}
                  className={
                    tagName === each
                      ? "border py-1 px-4 m-1 rounded-lg bg-yellow-400 text-white shadow-md text-sm"
                      : "border py-1 px-4 m-1 rounded-lg shadow-md text-sm"
                  }
                  onClick={() => this.props.handleTag(each)}
                  data-value={each}
                >
                  {each}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AllTags;
