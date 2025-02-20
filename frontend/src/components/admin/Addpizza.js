import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  VStack,
  HStack,
  Heading,
  IconButton,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

const AddPizza = () => {
  const [name, setName] = useState("");
  const [prices, setPrices] = useState({ small: "", medium: "", large: "" });
  const [varients, setVarients] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast({
        title: "Image required.",
        description: "Please upload an image for the pizza.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("prices", JSON.stringify(prices));
    formData.append("varients", JSON.stringify(varients));
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);

    try {
      const response = await axios.post(
        "https://food-delivery-app-i5kf.onrender.com/api/pizza/addpizza",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Pizza Added.",
        description: "The pizza has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Reset form
      setName("");
      setPrices({ small: "", medium: "", large: "" });
      setVarients([]);
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setCategory("");
    } catch (error) {
      console.error("Error adding pizza:", error);
      toast({
        title: "Error.",
        description: "There was an error adding the pizza.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box p={5} maxWidth="200vh" mx="auto" height="90vh" overflowY="scroll">
      <Heading mb={5} textAlign="center">
        Add New Pizza
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch" overflowY="auto">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter pizza name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Prices</FormLabel>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Small</FormLabel>
                <Input
                  type="number"
                  value={prices.small}
                  onChange={(e) =>
                    setPrices({ ...prices, small: e.target.value })
                  }
                  placeholder="Small size price"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Medium</FormLabel>
                <Input
                  type="number"
                  value={prices.medium}
                  onChange={(e) =>
                    setPrices({ ...prices, medium: e.target.value })
                  }
                  placeholder="Medium size price"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Large</FormLabel>
                <Input
                  type="number"
                  value={prices.large}
                  onChange={(e) =>
                    setPrices({ ...prices, large: e.target.value })
                  }
                  placeholder="Large size price"
                />
              </FormControl>
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Variants</FormLabel>
            <Select
              placeholder="Select variant"
              onChange={(e) => {
                const value = e.target.value;
                if (value && !varients.includes(value)) {
                  setVarients([...varients, value]);
                }
              }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Select>
            {varients.length > 0 && (
              <HStack spacing={2} mt={2}>
                {varients.map((variant, index) => (
                  <HStack key={index} spacing={1}>
                    <span>{variant}</span>
                    <IconButton
                      icon={<CloseIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() =>
                        setVarients(varients.filter((v) => v !== variant))
                      }
                    />
                  </HStack>
                ))}
              </HStack>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter pizza description"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <Box mt={2} textAlign="center">
                <Image
                  src={imagePreview}
                  alt="Image Preview"
                  boxSize="150px"
                  objectFit="cover"
                />
              </Box>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Select category"
            >
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </Select>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={loading}
            loadingText="Adding..."
            width="full"
          >
            Add Pizza
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddPizza;
