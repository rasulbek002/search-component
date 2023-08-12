import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import CustomSearch from "./component/customSearch/CustomSearch";
import Modal from "./component/ui/Modal";

export default function App() {
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            country: "kyrgyzstan",
          }
        );

        setCities(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function onSearch(data) {
    setShowModal(true);

    setFilters(data);
  }

  console.log(filters);

  return (
    <div className=" p-10">
      <CustomSearch cities={cities} onSearch={onSearch} />
      {showModal && <Modal setShowModal={setShowModal} data={filters} />}
    </div>
  );
}
