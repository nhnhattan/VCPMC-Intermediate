import React from "react";

import { Link } from "react-router-dom";
import { Table, Pagination, Empty } from "antd";

import { GoPrimitiveDot } from "react-icons/go";

import "./TableCustom.css";

type ColumnProps = {
  title: string;
  dataIndex: string;
  key?: string;
};

type CustomizeTableProps = {
  columns: ColumnProps[];
  dataSource: any;
  pagination: boolean;
  // pageSize: number;
  rowSelection: any;
};

const TableCustom = (props: CustomizeTableProps) => {
  return (
    <div className="table-custom-wrapper">
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        pagination={false}
        loading={props.dataSource.length ? false : true}
        // pageSize={10}
        bordered={false}
        locale={{emptyText: "none"}}
        rowSelection={props.rowSelection}
      />
      {props.pagination ? (
        <div className="pagination-custom-wrapper">
          <div className="pagination-input-wrapper">
            <p>Hiển thị </p>
            <input type="number" defaultValue={13} />
            <p>hàng trong mỗi trang</p>
          </div>

          <Pagination total={props.dataSource?.length} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableCustom;
