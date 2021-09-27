import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import Dropdown from '../components/Dropdown';
import styles from '../samerow.module.css';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

let startsWithNum = (str) =>{
  return /^\d/.test(str);
}
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
    allColumns,
    getToggleHideAllColumnsProps,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      sortTypes: {
        alphanumeric: (row1, row2, columnName) => {
          console.log("sorting");
        
          const rowOneColumn = row1.values[columnName];
          const rowTwoColumn = row2.values[columnName];
          if (rowOneColumn === null){
            if (rowTwoColumn === null){
              return -1;
            } else{
              return -1;
            }
          } else if (rowTwoColumn === null){
            
            return 1;
          }
          if (startsWithNum(rowOneColumn) && startsWithNum(rowTwoColumn)) {
            
            const startingNum1 = Number(rowOneColumn.match(/\d+/)[0]);
            const startingNum2 = Number(rowTwoColumn.match(/\d+/)[0]);
            return startingNum1 > startingNum2 ? 1 : -1;//(startingNum1 === startingNum2 ? 0 : -1);
          } else if (isNaN(rowOneColumn)) {
           
            return rowOneColumn.toLowerCase() > rowTwoColumn.toLowerCase()
              ? 1
              : -1;
          }
        },
      },
      columns,
      data,

      //initially the first page is displayed, displaying 3 rows
      initialState: { pageIndex: 0, pageSize: 3 },
    },
    useSortBy,
    usePagination
  );
  
 
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
      
      <h3>
          Column Hiding Options
      </h3>
      
      <div style={{flex:2,flexDirection:"row",justifyContent:'space-between',padding:'1700'}}>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
    </>
  );
};

export default Table;
