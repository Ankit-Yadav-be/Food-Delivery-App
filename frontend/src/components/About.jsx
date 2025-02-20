import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  SimpleGrid,
  useBreakpointValue,
  useColorModeValue,
  Stack,
  Divider,
  Badge,
  Icon
} from '@chakra-ui/react';
import { FaPizzaSlice, FaPeopleCarry, FaStore, FaAward, FaHandsHelping, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Motion components for animations
const MotionBox = motion(Box);
const MotionImage = motion(Image);

// Tabular data for the unique design
const milestones = [
  { year: "2020", achievement: "Founded with a mission to deliver authentic pizza." },
  { year: "2021", achievement: "Expanded to multiple locations and introduced new recipes." },
  { year: "2022", achievement: "Received 'Best Pizza' award from local food critics." },
  { year: "2023", achievement: "Launched our online delivery service for more convenience." }
];

const About = () => {
  const containerMaxWidth = useBreakpointValue({ base: 'full', md: 'container.md' });
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Box p={8} bg={bgColor} minHeight="100vh">
      <Container maxW={containerMaxWidth} centerContent>
        {/* Title and Introduction */}
        <VStack spacing={8} align="center" mb={12}>
          <Heading as="h1" size="2xl" color={headingColor} textAlign="center" fontWeight="bold">
            About Us
          </Heading>
          <Text fontSize="lg" color={textColor} textAlign="center" maxW="3xl">
            At Pizza Paradise, we're dedicated to bringing you a unique pizza experience with premium ingredients and exceptional service. Our story is one of passion, innovation, and a commitment to quality.
          </Text>
        </VStack>

        {/* Milestones Section */}
        <Box mb={12}>
          <Heading as="h2" size="lg" color={headingColor} mb={6} textAlign="center">
            Our Milestones
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {milestones.map((milestone, index) => (
              <MotionBox
                p={6}
                shadow="lg"
                borderWidth="1px"
                borderRadius="lg"
                bg={cardBgColor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                textAlign="center"
                key={index}
              >
                <Heading size="md" color={headingColor} mb={4}>
                  {milestone.year}
                </Heading>
                <Text color={textColor}>{milestone.achievement}</Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>

        {/* Our Values Section */}
        <VStack spacing={8} align="center" mb={12}>
          <Heading as="h2" size="lg" color={headingColor} textAlign="center">
            Our Core Values
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <MotionBox
              p={6}
              shadow="lg"
              borderWidth="1px"
              borderRadius="lg"
              bg={cardBgColor}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              textAlign="center"
            >
              <Icon as={FaAward} w={12} h={12} color={headingColor} mb={4} />
              <Heading size="md" mb={2}>Quality</Heading>
              <Text color={textColor}>We use only the freshest ingredients to ensure every pizza is of the highest quality.</Text>
            </MotionBox>
            <MotionBox
              p={6}
              shadow="lg"
              borderWidth="1px"
              borderRadius="lg"
              bg={cardBgColor}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              textAlign="center"
            >
              <Icon as={FaHandsHelping} w={12} h={12} color={headingColor} mb={4} />
              <Heading size="md" mb={2}>Service</Heading>
              <Text color={textColor}>Our friendly team is dedicated to providing exceptional service and a memorable dining experience.</Text>
            </MotionBox>
            <MotionBox
              p={6}
              shadow="lg"
              borderWidth="1px"
              borderRadius="lg"
              bg={cardBgColor}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              textAlign="center"
            >
              <Icon as={FaStar} w={12} h={12} color={headingColor} mb={4} />
              <Heading size="md" mb={2}>Innovation</Heading>
              <Text color={textColor}>We continuously innovate to bring new and exciting flavors to our menu, keeping our offerings fresh and unique.</Text>
            </MotionBox>
          </SimpleGrid>
        </VStack>

        {/* Image Section */}
        <VStack spacing={4} align="center">
          <MotionImage
            src="path/to/your/image.jpg"
            alt="Our Pizza Shop"
            borderRadius="lg"
            boxSize="100%"
            objectFit="cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default About;
