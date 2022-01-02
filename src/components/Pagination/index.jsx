import { useState } from 'react';
import './style.css';
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

export default function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
  const pages = Math.round(data.length / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      <div>
        <div className="job-card-wrapper">
          {getPaginatedData().map((d, idx) => (
            <RenderComponent key={idx} job={d} />
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            className={`prev-page ${currentPage === 1 ? 'disabled' : ''}`}
          >
            <AiFillCaretLeft />
          </button>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`page ${currentPage === item ? 'active' : null}`}
            >
              <span>{item}</span>
            </button>
          ))}
          <button
            onClick={goToNextPage}
            className={`next-page ${currentPage === pages || data.length < dataLimit ? 'disabled' : ''}`}
          >
            <AiFillCaretRight />
          </button>
        </div>
      </div>
    </>
  );
}