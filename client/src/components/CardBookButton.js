export let CardBookButton = ({
  toggleBookStatus,
  selectedBook,
  favouriteState,
  bookmarkState,
  readState,
}) => {
  return (
    <div className="hamburger">
      <button className="parent">
        <span className="material-symbols-outlined parent">more_vert</span>
      </button>

      <div className="children">
        <button
          onClick={() => toggleBookStatus("favourites", selectedBook)}
          className={`child ${favouriteState}`}
        >
          <span className="material-symbols-outlined">grade</span>
        </button>

        <button
          onClick={() => toggleBookStatus("bookmarked", selectedBook)}
          className={`child ${bookmarkState}`}
        >
          <span className="material-symbols-outlined">bookmark</span>
        </button>
        <button
          className={`child ${readState}`}
          onClick={() => toggleBookStatus("read", selectedBook)}
        >
          <span className="material-symbols-outlined">library_add</span>
        </button>
      </div>
    </div>
  );
};
