import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Image,
  Text,
  Select,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Flex,
  VStack,
  Heading,
  useToast,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { FaPizzaSlice, FaCartPlus } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import Carouselmade from "../components/Carousel";
import Footer from "../components/Footer";

const Home = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useCart();
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [auth, setAuth] = useAuth();
  const [search, setSearch] = useState("");
  const toast = useToast();

  const getAllPizzas = async () => {
    const response = await axios.get("http://localhost:8000/api/pizza/getallpizza");
    setItems(response.data.data);
  };

  useEffect(() => {
    getAllPizzas();
  }, []);

  const handleAddToCart = (pizza) => {
    const variant = selectedVariants[pizza._id] || "small";
    const quantity = selectedQuantities[pizza._id] || 1;
    const price = pizza.prices[0][variant] * quantity;

    const cartItem = {
      name: pizza.name,
      category: pizza.category,
      image: pizza.image,
      variant,
      quantity,
      price,
    };

    if (auth.user) {
      setCart([...cart, cartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
      toast({
        title: "Item added to cart.",
        description: `${pizza.name} has been added to your cart.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login required.",
        description: "Please login to add items to the cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleVariantChange = (pizzaId, value) => {
    setSelectedVariants({ ...selectedVariants, [pizzaId]: value });
  };

  const handleQuantityChange = (pizzaId, value) => {
    setSelectedQuantities({ ...selectedQuantities, [pizzaId]: value });
  };

  const filteredItems = items.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  );

  // Carousel images
  const images = [
    {
      src: "https://img.freepik.com/free-psd/food-menu-delicious-pizza-web-banner-template_106176-418.jpg?size=626&ext=jpg&ga=GA1.1.832743032.1713065117&semt=ais_user",
      alt: "First slide",
      caption: "30% Discount",
      description: "Chilli Pizza.",
    },
    {
      src: "https://img.freepik.com/free-vector/flat-food-social-media-promo-template_23-2149175432.jpg?w=1060&t=st=1719119280~exp=1719119880~hmac=477a95545f6a482214a08977c5a5987e1492a246242c8c51ddba68b2d5801864",
      alt: "Second slide",
      caption: "20% Discount",
      description: "New Taste.",
    },
    {
      src: "https://img.freepik.com/free-psd/food-menu-delicious-pizza-web-banner-template_106176-419.jpg?w=996&t=st=1719119307~exp=1719119907~hmac=d01ab9c5b2a07cb92d1378333685dbe10345a53e13f34382902eac4fc44d5117",
      alt: "Third slide",
      caption: "10% Discount",
      description: "New Taste",
    },
  ];

  return (
    <>
      <Carouselmade images={images} />
      <Container maxW="container.xl" mt={5}>
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={5}>
          {filteredItems.map((pizza) => (
            <Card key={pizza._id} boxShadow="lg" borderRadius="md" overflow="hidden">
              <CardHeader>
                <Flex alignItems="center">
                  <FaPizzaSlice style={{ marginRight: "10px" }} />
                  <Heading as="h4" size="md">{pizza.name}</Heading>
                </Flex>
                <Text color="gray.500">{pizza.category}</Text>
              </CardHeader>
              <Image
                src={`http://localhost:8000/${pizza.image.replace(/\\/g, "/")}`}
                alt={pizza.name}
                objectFit="cover"
                height="10em"
                width="50em"
              />
              <CardBody>
                <Flex justify="space-between" mb={3}>
                  <VStack align="start">
                    <Text fontWeight="bold">Variants</Text>
                    <Select
                      value={selectedVariants[pizza._id] || "small"}
                      onChange={(e) => handleVariantChange(pizza._id, e.target.value)}
                    >
                      {pizza.varients.map((variant) => (
                        <option key={variant} value={variant}>
                          {variant}
                        </option>
                      ))}
                    </Select>
                  </VStack>
                  <VStack align="start">
                    <Text fontWeight="bold">Quantity</Text>
                    <Select
                      value={selectedQuantities[pizza._id] || 1}
                      onChange={(e) => handleQuantityChange(pizza._id, e.target.value)}
                    >
                      {[...Array(10).keys()].map((v, i) => (
                        <option value={i + 1} key={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Select>
                  </VStack>
                </Flex>
                <Text color="green.500" fontWeight="bold">
                  Price: ₹
                  {pizza.prices[0][selectedVariants[pizza._id] || "small"] *
                    (selectedQuantities[pizza._id] || 1)}
                </Text>
              </CardBody>
              <CardFooter>
                <Button
                  leftIcon={<FaCartPlus />}
                  colorScheme="teal"
                  onClick={() => handleAddToCart(pizza)}
                  w="full"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
