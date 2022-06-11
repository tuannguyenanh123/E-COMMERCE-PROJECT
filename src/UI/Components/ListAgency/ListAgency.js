import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

import "./ListAgency.scss";
import { listAgency } from "./index";
import Loading from "./../Loading/Loading";

const ListAgency = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="content-main">
      <div className="section-point-info">
        <div className="heading-title">Cửa hàng</div>
        <div className="section-content">
          <table>
            <tbody>
              {listAgency &&
                listAgency.map((item, index) => (
                  <tr key={index}>
                    <td className="image-thumbnail">
                      <img src={item.image} alt={item.title} />
                    </td>
                    <td>
                      <div className="description">
                        <h2>{item.title}</h2>
                        <p>Liên hệ: {item.contactPhone}</p>
                        <p>{item.Address}</p>
                      </div>
                    </td>
                    <td className="eye">
                      <FaEye />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListAgency;
