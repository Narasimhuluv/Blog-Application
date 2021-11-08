import React from "react";

function Pagination(props) {
  var { articlesPerPage, articleCount, activeIndexPage, updateCurrentIndex } =
    props;
  var numberOfPages = Math.ceil(articleCount / articlesPerPage);
  var pages = [];
  for (var i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }
  return (
    <div className="w-5/12 flex items-center justify-center m-auto mt-16 mb-20 pagination">
      <p
        onClick={() => updateCurrentIndex(activeIndexPage - 1)}
        className="cursor-pointer  py-2 mr-4 -mt-4 shadow-lg bg-black text-white px-3 rounded-full"
      >
        <i class="fas fa-arrow-left"></i>
      </p>
      <div className="flex justify-between overflow-scroll pagination">
        {pages.map((each) => (
          <button
            key={each}
            className={
              activeIndexPage === each
                ? "border p-2 px-3 mx-2 rounded-lg bg-yellow-400 text-white"
                : "border p-2 px-3 mx-2 rounded-lg"
            }
            onClick={() => updateCurrentIndex(each)}
          >
            {each}
          </button>
        ))}
      </div>
      {/* <p onClick={() => updateCurrentIndex(activeIndexPage + 1 > numberOfPages ? numberOfPages : activeIndexPage + 1)} className="cursor-pointer py-2 ml-4 -mt-4 shadow-lg bg-black text-white px-3 rounded-full"><i class="fas fa-arrow-right"></i></p> */}
      <p
        onClick={() =>
          updateCurrentIndex(
            activeIndexPage + 1 > numberOfPages
              ? numberOfPages
              : activeIndexPage + 1
          )
        }
        className="cursor-pointer py-2 ml-4 -mt-4 shadow-lg bg-black text-white px-3 rounded-full"
      >
        <i class="fas fa-arrow-right"></i>
      </p>
    </div>
  );
}

export default Pagination;
