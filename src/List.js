import React from "react";

export default function List() {
  return (
    <div className="list-group">
      <div className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">John Doe</h5>
          <div>
            <button className="btn btn-sm btn-link">Edit</button>
            <button className="btn btn-sm btn-link">Del</button>
          </div>
        </div>
        <p className="mb-1">08815646413</p>
      </div>
      <div className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">Alex Pick</h5>
          <div>
            <button className="btn btn-sm btn-link">Edit</button>
            <button className="btn btn-sm btn-link">Del</button>
          </div>
        </div>
        <p className="mb-1">08815646413</p>
      </div>
    </div>
  );
}
