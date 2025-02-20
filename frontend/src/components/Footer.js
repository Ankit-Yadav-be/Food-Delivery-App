import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={10}
      px={5}
    >
      <Container as={Stack} maxW="6xl" spacing={4}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} justify="space-between">
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Pizza Delight
            </Text>
            <Text fontSize="sm">
              The best pizza in town delivered to your door. Fresh ingredients, delicious flavors.
            </Text>
          </Box>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Link href="#" fontSize="sm">Home</Link>
            <Link href="#" fontSize="sm">Menu</Link>
            <Link href="#" fontSize="sm">About Us</Link>
            <Link href="#" fontSize="sm">Contact Us</Link>
          </Stack>
        </Stack>
        <Divider my={4} />
        <Stack direction="row" spacing={6} justify="center">
          <IconButton
            as={Link}
            href="#"
            aria-label="Facebook"
            icon={<FaFacebook />}
            colorScheme="facebook"
            variant="outline"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.2)" }}
          />
          <IconButton
            as={Link}
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter />}
            colorScheme="twitter"
            variant="outline"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.2)" }}
          />
          <IconButton
            as={Link}
            href="#"
            aria-label="Instagram"
            icon={<FaInstagram />}
            colorScheme="red"
            variant="outline"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.2)" }}
          />
          <IconButton
            as={Link}
            href="#"
            aria-label="YouTube"
            icon={<FaYoutube />}
            colorScheme="red"
            variant="outline"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.2)" }}
          />
        </Stack>
        <Text pt={6} fontSize="sm" textAlign="center">
          © 2024 Pizza Delight. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
