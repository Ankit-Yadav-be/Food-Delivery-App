import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Divider,
  Spinner,
  Icon,
  Flex,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import {
  FaBox,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MotionTag = motion(Tag);

const Order = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrder = async (auth) => {
    if (!auth || !auth.user || !auth.user._id) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const userid = auth.user._id;

    try {
      const res = await axios.post(
        "https://food-delivery-app-i5kf.onrender.com/api/payment/getorder",
        { userid },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data) {
        setOrders(res.data);
      } else {
        console.log("Orders not found");
      }
    } catch (err) {
      setError(err.message || "Error fetching orders");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder(auth);
  }, []); // Empty dependency array to run effect only once on mount

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const boxBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Text color="red.500" textAlign="center">
        Error fetching orders: {error}
      </Text>
    );
  }

  return (
    <Box p={5} bg={bgColor} minHeight="100vh">
      <Flex alignItems="center" mb={5}>
        <Icon as={FaBox} w={8} h={8} mr={2} color="teal.500" />
        <Heading>Orders</Heading>
      </Flex>
      {orders.length > 0 ? (
        <VStack spacing={5} align="stretch">
          {orders.map((order) => (
            <Box
              key={order._id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              bg={boxBgColor}
              color={textColor}
            >
              <VStack align="start" spacing={3}>
                <HStack alignItems="center">
                  <Icon as={FaUser} w={5} h={5} mr={2} color="teal.500" />
                  <Heading fontSize="xl">{order.name}</Heading>
                </HStack>
                <HStack alignItems="center">
                  <Icon as={FaEnvelope} w={5} h={5} mr={2} color="teal.500" />
                  <Text>Email: {order.email}</Text>
                </HStack>
                <Text>Order ID: {order._id}</Text>
                <Text>Transaction ID: {order.transactionid}</Text>
                <Text>
                  Order Amount:
                  <Icon as={FaDollarSign} color="green.500" ml={1} />
                  ₹{order.orderAmount}
                </Text>
                <HStack alignItems="center">
                  <Text>
                    <strong>
                      Delivery Status:
                      {order.isDelivered ? (
                        <MotionTag
                          colorScheme="teal"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0, 1, 0, 1, 0, 1, 1],
                          }}
                          transition={{
                            duration: 3,
                            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                          }}
                        >
                          <TagLeftIcon boxSize="23px" as={FaCheckCircle} />
                          <TagLabel >Delivered</TagLabel>
                        </MotionTag>
                      ) : (
                        <Tag colorScheme="red">
                          <TagLeftIcon boxSize="12px" as={FaTimesCircle} />
                          <TagLabel>Not Delivered</TagLabel>
                        </Tag>
                      )}
                    </strong>
                  </Text>
                </HStack>
                <HStack alignItems="center">
                  <Icon as={FaMapMarkerAlt} w={5} h={5} mr={2} color="teal.500" />
                  <Text>
                    Address: {order.shippingAddress.street},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.country},{" "}
                    {order.shippingAddress.pincode}
                  </Text>
                </HStack>
              </VStack>
              <Divider my={3} />
              <Heading fontSize="lg" mb={3}>
                Items
              </Heading>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th>Category</Th>
                    <Th>Variant</Th>
                    <Th>Quantity</Th>
                    <Th>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.orderitems.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <Image
                          boxSize="50px"
                          src={item.image}
                          alt={item.name}
                          borderRadius="md"
                        />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>{item.category}</Td>
                      <Td>{item.variant}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>₹{item.price}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No orders found</Text>
      )}
    </Box>
  );
};

export default Order;
