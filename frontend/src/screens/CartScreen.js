import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  Button,
  Heading,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Divider,
  ScaleFade,
} from "@chakra-ui/react";
import { useCart } from "../context/cart";
import { FaTrashAlt } from "react-icons/fa";
import Checkout from "../components/Checkout";

const CartScreen = () => {
  const [cartItems, setCartItems] = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleremove = (pid) => {
    let item = [...cartItems];
    let index = item.findIndex((i) => i._id === pid);
    item.splice(index, 1);
    setCartItems(item);
    localStorage.setItem("cart", JSON.stringify(item));
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Container maxW="container.xl" py={5}>
      <Heading as="h3" mb={5}>Your Cart</Heading>
      <ScaleFade initialScale={0.9} in={isLoaded}>
        {cartItems.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <Table variant="striped" colorScheme="gray" size="lg" mb={5}>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Variant</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Td>
                  <Td>{item.name}</Td>
                  <Td>{item.category}</Td>
                  <Td>{item.variant}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>Rs.{item.price}</Td>
                  <Td>
                    <Button
                      leftIcon={<FaTrashAlt />}
                      colorScheme="red"
                      variant="solid"
                      onClick={() => handleremove(item._id)}
                      transition="all 0.2s"
                      _hover={{ transform: "scale(1.05)" }}
                    >
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </ScaleFade>
      <Card boxShadow="lg" borderRadius="md">
        <CardHeader>
          <Heading as="h4" size="md">Order Summary</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <VStack align="start" spacing={3}>
            <Text><strong>Total Items:</strong> {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Text>
            <Text><strong>Total Price:</strong> Rs.{totalPrice}</Text>
            <Checkout totalPrice={totalPrice} />
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CartScreen;
