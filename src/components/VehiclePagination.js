import { useState } from 'react';
import VehicleService from '../shared/services/VehicleService';

const VehiclePagination = ({ search, setSearch, onClickSearch }) => {
  const { currentPage, recordPerPage, totalElements, totalPages } = search;

  const [isLoading, setIsLoading] = useState(false);

  const getBooksByPagination = async (currentPage) => {
    currentPage = currentPage - 1;
    try {
      setIsLoading(true);
      console.log('Hello:', search);
      const data = await VehicleService.get(search, currentPage);
      console.log('Hi:', data.content);
      setSearch((prevState) => {
        return {
          ...prevState,
          currentPage: data.number + 1,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
        };
      });
      onClickSearch(data.content || []);
    } catch (err) {
      // TODO: handle error here
    } finally {
      setIsLoading(false);
    }
  };

  const showNextPage = () => {
    if (currentPage < Math.ceil(totalElements / recordPerPage)) {
      getBooksByPagination(currentPage + 1);
    }
  };

  const showLastPage = () => {
    if (currentPage < Math.ceil(totalElements / recordPerPage)) {
      getBooksByPagination(Math.ceil(totalElements / recordPerPage));
    }
  };

  const showFirstPage = () => {
    let firstPage = 1;
    if (currentPage > firstPage) {
      getBooksByPagination(firstPage);
    }
  };

  const showPrevPage = () => {
    let prevPage = 1;
    if (currentPage > prevPage) {
      getBooksByPagination(currentPage - prevPage);
    }
  };

  return (
    <table className="table">
      <div style={{ float: 'left', fontFamily: 'monospace', color: '#0275d8' }}>
        Page {currentPage} of {totalPages}
      </div>
      <div style={{ float: 'right' }}>
        <div class="clearfix"></div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a
                type="button"
                class="page-link"
                disabled={currentPage === 1 ? true : false}
                onClick={showFirstPage}
              >
                First
              </a>
            </li>
            <li class="page-item">
              <a
                type="button"
                class="page-link"
                disabled={currentPage === 1 ? true : false}
                onClick={showPrevPage}
              >
                Previous
              </a>
            </li>
            <li class="page-item">
              <a
                type="button"
                class="page-link"
                disabled={currentPage === totalPages ? true : false}
                onClick={showNextPage}
              >
                Next
              </a>
            </li>
            <li class="page-item">
              <a
                type="button"
                class="page-link"
                disabled={currentPage === totalPages ? true : false}
                onClick={showLastPage}
              >
                Last
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </table>
  );
};

export default VehiclePagination;
