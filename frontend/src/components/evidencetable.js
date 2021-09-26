import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import Dropdown from '../components/Dropdown';
import styles from '../samerow.module.css';

const Table = ({ columns, data, numArticles }) => {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page, //instead of using rows, we'll use page,
    //which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
    
      sortTypes: {
                alphanumeric: (row1, row2, columnName) => {
                    const rowOneColumn = row1.values[columnName];
                    const rowTwoColumn = row2.values[columnName];
                    if (isNaN(rowOneColumn)) {
                        if (rowOneColumn === null)
                          return -1;
                        else if (rowTwoColumn === null) return 1;

                        else
                          return rowOneColumn.toUpperCase() >
                              rowTwoColumn.toUpperCase()
                              ? 1
                              : -1;
                    }
                    return Number(rowOneColumn) > Number(rowTwoColumn) ? 1 : -1;
                }
            },
      columns,
      data,
    
      //initially the first page is displayed, displaying 3 rows
      initialState: { pageIndex: 0, pageSize: 3 },
    },
    useSortBy,
    usePagination
  );
  
  console.log("pCount =" + numArticles + ", " + "pageSize" + pageSize);
  console.log()
  let pageRange =
    [...Array(pageCount + 1).keys()].slice(1).map((num) => <option key={num}>{num}</option>);
  
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        " 🔽"
                      ) : (
                        " 🔼"
                      )
                    ) : (
                      <span style={{ opacity: 0.3 }}> ⇅ </span>
                    )}
                  </span>
                </th>

              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <div className={styles.page_selection}>
          Go to page:
          <Dropdown
            title="Choose a page number"
            optionItems={pageRange}
            handleChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[3, 7, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
