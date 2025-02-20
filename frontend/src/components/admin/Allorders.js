import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Avatar,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  FaShippingFast,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaEnvelope,
  FaBoxOpen,
} from "react-icons/fa";

const Allorder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDeliver = async (orderid) => {
    try {
      await axios.post("https://food-delivery-app-i5kf.onrender.com/api/payment/deliver", {
        orderid,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderid ? { ...order, isDelivered: true } : order
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/payment/allorders"
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Flex>
    );
  }

  return (
    <Box p={4} overflowY="scroll" height="90vh">
      <Heading mb={6} textAlign="center" color="teal.500">
        All Orders
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Email</Th>
            <Th>Order ID</Th>
            <Th>User ID</Th>
            <Th>Order Amount</Th>
            <Th>Transaction ID</Th>
            <Th>Order Date</Th>
            <Th>Delivery Status</Th>
            <Th>Shipping Address</Th>
            <Th>Order Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order._id}>
              <Td>
                <HStack>
                  <Avatar name={order.name} src="" icon={<FaUser />} />
                  <VStack align="start" spacing={0}>
                    <Tag size="md" colorScheme="teal">
                      <TagLeftIcon boxSize="12px" as={FaUser} />
                      <TagLabel>{order.name}</TagLabel>
                    </Tag>
                  </VStack>
                </HStack>
              </Td>
              <Td>
                <Tag size="md" colorScheme="blue">
                  <TagLeftIcon boxSize="12px" as={FaEnvelope} />
                  <TagLabel>{order.email}</TagLabel>
                </Tag>
              </Td>
              <Td>{order._id}</Td>
              <Td>{order.userid}</Td>
              <Td>
                {order.orderAmount} <Icon as={FaDollarSign} color="green.500" />
              </Td>
              <Td>{order.transactionid}</Td>
              <Td>{order.createdAt.substring(0, 10)}</Td>
              <Td>
                <HStack>
                  <Text>
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </Text>
                  {order.isDelivered ? (
                    <Icon as={FaCheckCircle} color="green.500" />
                  ) : (
                    <Button size="sm" onClick={() => handleDeliver(order._id)}>
                      Deliver
                    </Button>
                  )}
                </HStack>
              </Td>
              <Td>
                <Box>
                  <Text>{order.shippingAddress?.street}</Text>
                  <Text>
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.country}{" "}
                    {order.shippingAddress?.pincode}
                  </Text>
                </Box>
              </Td>
              <Td>
                <VStack align="start" spacing={1}>
                  {order.orderitems.map((item, index) => (
                    <Box key={index}>
                      <HStack spacing={2}>
                        <Icon as={FaBoxOpen} color="teal.500" />
                        {/* <VStack align="start" spacing={0}>
                          <Text>
                            <strong>Name:</strong> {item.name}
                          </Text>
                          <Text>
                            <strong>Category:</strong> {item.category}
                          </Text>
                          <Text>
                            <strong>Variant:</strong> {item.variant}
                          </Text>
                          <Text>
                            <strong>Quantity:</strong> {item.quantity}
                          </Text>
                          <Text>
                            <strong>Price:</strong> {item.price}
                          </Text>
                        </VStack> */}
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Allorder;
