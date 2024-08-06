import React from "react";
import { getCountriesAll, getCountriesList } from "../../store/countriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";

const CountriesList = () => {
  const dispatch = useDispatch();
  const currentData = useSelector(getCountriesList());

  React.useEffect(() => {
    dispatch(getCountriesAll());
  }, []);

  const formattedCountries = currentData?.map((country) => ({
    key: country.area,
    name: country.name.common,
    flag: country.flags.svg,
  }));

  const handleClick = (country) => {
    console.log(country);
  };

  const columns = [
    {
      title: "Country name",
      dataIndex: "name",
      key: "name",
      render: (country) => (
        <Link to={`/country/${country}`} onClick={() => handleClick(country)}>
          {country}
        </Link>
      ),
    },
    {
      title: "Country Flag",
      dataIndex: "flag",
      render: (theImageURL) => (
        <img width="50" alt={theImageURL} src={theImageURL} />
      ),
    },
  ];

  return <Table dataSource={formattedCountries} columns={columns} />;
};

export default CountriesList;
