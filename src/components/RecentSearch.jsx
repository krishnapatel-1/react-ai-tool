function RecentSearch({ recentHistory, setRecentHistory, setSelectedHistory }) {
  const clearhistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };
  return (
    <>
      <div className="col-span-1 dark:bg-zinc-800 bg-blue-200  ">
        <h1 className="p-3 dark:text-white text-zinc-800 text-xl flex text-center justify-center  ">
          <span>Recent Search</span>

          <button onClick={clearhistory} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 -960 960 960"
              className="fill-black dark:fill-[#e3e3e3]"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left overflow-auto">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedHistory(item)}
                className="p-1 pl-4 truncate  dark:text-zinc-400 text-zinc-500 cursor-pointer dark:hover:bg-zinc-700 hover:bg-blue-300 dark:hover:text-white  hover:text-zinc-800  "
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
export default RecentSearch;
