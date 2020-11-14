import { Table, Space, Tag } from 'antd';

function CTable({ products }) {
    const { Column } = Table;

    return (
        <Table dataSource={products}>
            <Column
                title=""
                dataIndex="image"
                key="image"
                render={() => <img width="50" src="https://lh3.googleusercontent.com/proxy/k4Lev1Nll7dAxtXrMq6ORSF5xDZhaIW4gqhB-YJ2--yDacGOFkkRo5JPRMc5YCBJGRYwZLIVFhU2XOEmOwGkZ1ceqOh7wBvGQo62HxpV-Rh0DoWMpEm5qi549vjENRtkxP3SYOlNIaqHoYpfUvuJI3pU" />}
            />
            <Column title="Название" dataIndex="name" key="name" />
            <Column title="Цена" dataIndex="price" key="price" />
            <Column title="Производитель" dataIndex="brand" key="brand" />
            <Column
                title="Количество"
                dataIndex="stock"
                key="stock"
                render={stock => (
                    <>
                        <Tag color={stock > 10 ? 'cyan' : 'volcano'} key={stock}>
                            <b>{stock}</b>
                        </Tag>
                    </>
                )}
            />
            <Column
                title="Действия"
                key="action"
                render={() => (
                    <Space size="middle">
                        <a>Редактировать</a>
                        <a>Удалить</a>
                    </Space>
                )}
            />
        </Table>
    )
}

export default CTable;