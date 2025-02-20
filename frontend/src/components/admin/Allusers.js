import React, { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Box, Text, Spinner, Center, useBreakpointValue, Icon, VStack, HStack, Button, Tooltip, Avatar, Flex } from '@chakra-ui/react';
import { CheckCircleIcon, EditIcon, WarningIcon, SmallCloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://food-delivery-app-i5kf.onrender.com/api/user/getuser');
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const tableWidth = useBreakpointValue({ base: "100%", md: "100%", lg: "1200px" });
  const boxHeight = useBreakpointValue({ base: "calc(100vh - 60px)", md: "calc(100vh - 100px)", lg: "calc(100vh - 100px)" });

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <VStack p={5} alignItems="flex-start" height="90vh" overflowY="hidden">
      <Text fontSize="2xl" mb={5} textAlign="center" fontWeight="bold" color="teal.600">All Users</Text>
      <Box overflowY="auto" width="100%" height={boxHeight}>
        <Box overflowX="auto">
          <Table variant="striped" colorScheme="teal" width={tableWidth} shadow="md" borderRadius="md" bg="white">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Admin Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id} _hover={{ bg: 'gray.50' }} transition="background-color 0.2s">
                  <Td>
                    <HStack spacing={3}>
                      <Avatar name={user.name} src="https://bit.ly/broken-link" />
                      <Text>{user.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>
                    {user.isAdmin ? (
                      <HStack spacing={2} align="center">
                        <Text color="green.600">Admin</Text>
                        <Icon as={CheckCircleIcon} color="green.500" marginBottom="10px" />
                      </HStack>
                    ) : (
                      <HStack spacing={2} align="center">
                        <Text color="red.600">User</Text>
                        <Icon as={SmallCloseIcon } color="red.500" marginBottom="10px"/>
                      </HStack>
                    )}
                  </Td>
                  <Td>
                    <HStack spacing={4}>
                      <Tooltip label="Edit User" aria-label="Edit User">
                        <Button size="sm" colorScheme="blue" leftIcon={<EditIcon />} variant="outline" _hover={{ bg: 'blue.50' }}>
                          Edit
                        </Button>
                      </Tooltip>
                      <Tooltip label="Delete User" aria-label="Delete User">
                        <Button size="sm" colorScheme="red" leftIcon={<WarningIcon  />} variant="outline" _hover={{ bg: 'red.50' }}>
                          Delete
                        </Button>
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </VStack>
  );
};

export default AllUsers;
