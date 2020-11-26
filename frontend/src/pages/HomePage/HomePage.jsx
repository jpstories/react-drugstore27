import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { homeAction } from "../../redux/actions/homeAction";

import { Spin, Select, Input, Tabs } from 'antd';

import { AudioOutlined } from '@ant-design/icons';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { Option, OptGroup } = Select;
const { Search } = Input;
const { TabPane } = Tabs;


const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

function HomeScreen() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productList);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        dispatch(homeAction());
    }, []);

    const sortHandler = (value) => {
        setSortOrder(value);
        dispatch(homeAction(searchKeyword, sortOrder));
    };

    const onSearch = (value) => {
        setSearchKeyword(value)
    }

    return (
        <React.Fragment>
            <div className="content-margined"></div>
            <Tabs defaultActiveKey="2">
                <TabPane
                    tab={
                        <span>
                            <AppleOutlined />
                            Антивирусное
                        </span>
                    }
                    key="1"
                >
                    Антивирусное
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined />
                            От кашля
                        </span>
                    }
                    key="2"
                >
                    От кашля
                </TabPane>
            </Tabs>
            <div className="filter">
                <div>
                    <Search
                        placeholder="Поиск..."
                        enterButton="Найти"
                        size="large"
                        suffix={suffix}
                        onSearch={onSearch}
                    />
                </div>

                <div>
                    <label htmlFor="sortOrder">Сортировать по: </label>
                    <Select name="sortOrder" defaultValue="Новинкам" style={{ width: 120 }} onChange={sortHandler}>
                        <OptGroup label="По цене">
                            <Option value="highest">Недорогим</Option>
                            <Option value="lowest">Дорогим</Option>
                        </OptGroup>
                        <OptGroup label="По поступлению">
                            <Option value="">Новинкам</Option>
                        </OptGroup>
                    </Select>
                </div>
            </div>

            {loading ? (
                <div className="loading">
                    <Spin size="large" />
                </div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                        <ul className="products">
                            {products.map((product) => (
                                <li key={product._id}>
                                    <div className="product">
                                        <Link to={`/product/${product._id}`}>
                                            <img
                                                className="product-image"
                                                src={product.image}
                                                alt="product"
                                            />
                                        </Link>
                                        <div className="product-name">
                                            <Link to="/product">{product.name}</Link>
                                        </div>
                                        <div className="product-brand">
                                            Производитель: {product.brand}
                                        </div>
                                        <div className="product-price">
                                            Цена: {product.price}руб.
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
        </React.Fragment>
    );
}
export default HomeScreen;
