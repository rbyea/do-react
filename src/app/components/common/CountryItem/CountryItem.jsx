import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  countryItem,
  getCountriesList,
  getLoadingCounties,
} from "../../store/countriesSlice";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./countryItem.scss";

const CountryItem = () => {
  const dispatch = useDispatch();
  const currentData = useSelector(getCountriesList());
  const isLoading = useSelector(getLoadingCounties());
  const { name } = useParams();

  React.useEffect(() => {
    dispatch(countryItem(name));
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <Link to="/" className="arrow-circle">
        <ArrowLeftOutlined />
      </Link>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          {currentData && (
            <Card
              hoverable
              cover={<img alt="example" src={currentData[0]?.flags.svg} />}
            >
              <Meta
                title={`${currentData[0]?.name.common}, ${currentData[0]?.capital[0]}`}
                description={currentData[0]?.name.official}
              />
            </Card>
          )}
        </Col>

        <Col span={8}></Col>
      </Row>
    </>
  );
};

export default CountryItem;
