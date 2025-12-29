import React, { useContext } from 'react';
import { Button, List, Badge, Image } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { CartContext } from '../context/CartContext';

export default function Cart() {
    const { cartItems, handleCart } = useContext(CartContext);

    return (
        <div className="p-4 mt-10 max-w-lg mx-auto shadow-lg rounded-lg bg-white">
            <h2 className="text-xl font-bold flex items-center">
                <ShoppingCartOutlined className="mr-2 text-blue-600" />
                Cart <Badge count={cartItems.length} offset={[10, 0]} />
            </h2>

            {cartItems.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={cartItems}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    danger
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleCart(item, 'remove')}
                                >
                                    Remove
                                </Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Image width={50} src={item.image || 'https://via.placeholder.com/50'} alt={item.name} />}
                                title={item.name}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <p className="text-gray-500 text-center mt-4">Your cart is empty</p>
            )}
        </div>
    );
}