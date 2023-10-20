import React from "react";

interface ITable {
  columnNames: string[];
  children?: React.ReactNode;
}

const Table: React.FC<ITable> = ({ columnNames, children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table mb-32">
        <thead>
          <tr>
            {columnNames.map((colName) => (
              <th key={colName}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>

      {!React.Children.count(children) && <div className="text-center">There is no data in this table.</div>}
    </div>
  );
};

export default Table;
