import React from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Stack,
  Icon,
  VStack
} from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineMail, AiOutlineFileText } from 'react-icons/ai';
import { motion } from 'framer-motion';

// Motion components for animations
const MotionBox = motion(Box);

const Contact = () => {
  const containerMaxWidth = useBreakpointValue({ base: 'full', md: 'container.md' });
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Box p={8} bg={bgColor} minHeight="100vh">
      <Container maxW={containerMaxWidth} centerContent>
        <VStack spacing={8} align="center">
          {/* Title and Description */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <Heading as="h1" size="2xl" color={headingColor}>
              Contact Us
            </Heading>
            <Text fontSize="lg" color={textColor} mt={4}>
              We'd love to hear from you! Please fill out the form below to get in touch.
            </Text>
          </MotionBox>

          {/* Form */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            bg={cardBgColor}
            p={8}
            borderRadius="md"
            shadow="lg"
            width="full"
          >
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel color={textColor}><Icon as={AiOutlineUser} mr={2} /> Name</FormLabel>
                <Input placeholder="Enter your name" />
              </FormControl>
              <FormControl id="email">
                <FormLabel color={textColor}><Icon as={AiOutlineMail} mr={2} /> Email</FormLabel>
                <Input type="email" placeholder="Enter your email" />
              </FormControl>
              <FormControl id="subject">
                <FormLabel color={textColor}><Icon as={AiOutlineFileText} mr={2} /> Subject</FormLabel>
                <Input placeholder="Enter subject" />
              </FormControl>
              <FormControl id="message">
                <FormLabel color={textColor}>Message</FormLabel>
                <Textarea placeholder="Enter your message" rows={5} />
              </FormControl>
              <Button colorScheme="teal" variant="solid" size="lg" width="full">
                Submit
              </Button>
            </Stack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}

export default Contact;
