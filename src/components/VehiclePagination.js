import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const VehiclePagination = ({ getBooksByPagination }) => {
  const query = useSelector((state) => state.vehicles.query);
  const { currentPage, totalPages } = useSelector((state) => state.vehicles.query);

  const showNextPage = useCallback(() => {
    const nextPage = currentPage + 1;
    if (totalPages >= nextPage) {
      getBooksByPagination({
        ...query,
        currentPage: nextPage,
      });
    }
  }, [currentPage, getBooksByPagination, query, totalPages]);

  const showLastPage = () => {
    getBooksByPagination({
      ...query,
      currentPage: totalPages,
    });
  };

  const showFirstPage = () => {
    getBooksByPagination({
      ...query,
      currentPage: 1,
    });
  };

  const showPrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      getBooksByPagination({
        ...query,
        currentPage: prevPage,
      });
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
                disabled={currentPage === 1}
                onClick={showFirstPage}
              >
                First
              </a>
            </li>
            <li class="page-item">
              <a
                type="button"
                class="page-link"
                disabled={currentPage === 1}
                onClick={showPrevPage}
              >
                Previous
              </a>
            </li>
            <li class="page-item">
              <a
                type="button"
                class="page-link"
                disabled={currentPage === totalPages}
                onClick={showNextPage}
              >
                Next
              </a>
            </li>
            <li class="page-item">
              <a
                type="button"
                class="page-link"
                disabled={currentPage === totalPages}
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
