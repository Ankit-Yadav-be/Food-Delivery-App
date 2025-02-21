import React, { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Image, Box, Text, Spinner, Center, VStack, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUpdate } from "../../context/update";

const Allpizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('https://food-delivery-app-i5kf.onrender.com/api/pizza/getallpizza');
        console.log(response.data.data); // Debug response data
        setPizzas(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);
    
  const [update, setUpdate] = useUpdate();
  
  const goforupdate = (pizza) => {
    setUpdate(pizza);
  }

  const gofordelete =async (pizza)=>{
    const res=   await axios.delete(`https://food-delivery-app-i5kf.onrender.com/api/pizza/deletepizza/${pizza._id}`);
    if(res)
    {
      console.log("pizza deleted");
      window.location.reload();
    }
  }



  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <VStack p={5} alignItems="flex-start" height="90vh" overflowY="hidden">
      <Text fontSize="2xl" mb={5} textAlign="center" fontWeight="bold">All Pizzas</Text>
      <Box overflowY="auto" width="100%" height="calc(100vh - 100px)">
        <Table variant="striped" colorScheme="teal" size="md" minWidth="900px">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Variants</Th>
              <Th>Prices</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pizzas.map((pizza) => {
              // Ensure the image URL is correctly formatted
              const imageUrl = pizza.image;
              console.log(imageUrl); // Debug image URL
              return (
                <Tr key={pizza._id}>
                  <Td>
                    <Image 
                      boxSize="100px" 
                      src={imageUrl} 
                      alt={pizza.name} 
                      objectFit="cover" 
                      fallbackSrc="https://via.placeholder.com/100" // Fallback image
                    />
                  </Td>
                  <Td>{pizza.name}</Td>
                  <Td>
                    {pizza.category === 'veg' ? (
                      <CheckCircleIcon color="green.500" />
                    ) : (
                      <CheckCircleIcon color="red.500" />
                    )}
                  </Td>
                  <Td>
                    {pizza.varients.join(", ")}
                  </Td>
                  <Td>
                    {pizza.prices.map((price, index) => (
                      <Box key={index} mb={2}>
                        <Text><strong>Small:</strong> {price.small}</Text>
                        <Text><strong>Medium:</strong> {price.medium}</Text>
                        <Text><strong>Large:</strong> {price.large}</Text>
                      </Box>
                    ))}
                  </Td>
                  <Td>{pizza.description}</Td>
                  <Td>
                    <Link to={`/admin/updatepizza/${pizza._id}`}>
                      <Button  mr="5px" mb='5px' onClick={() => goforupdate(pizza)} colorScheme="blue" size="sm">Update</Button>
                    </Link>
                    
                    <Link>
                      <Button mr="5px" padding="15px" onClick={() => gofordelete(pizza)} colorScheme="red" size="sm">Delete</Button>
                    </Link>
                    
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default Allpizza;
